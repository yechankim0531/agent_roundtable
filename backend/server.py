from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uuid
import json
import os
import re
import traceback
from datetime import datetime
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, SystemMessage, AIMessage

load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash")

DATA_FILE = os.path.join(os.path.dirname(__file__), "chats.json")

def load_chats():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r") as f:
            return json.load(f)
    return {}

def save_chats(chats):
    with open(DATA_FILE, "w") as f:
        json.dump(chats, f, indent=2)

chats = load_chats()


class CreateChatRequest(BaseModel):
    name: str

class AddMemberRequest(BaseModel):
    name: str
    role: str
    background: str

class SendMessageRequest(BaseModel):
    content: str


@app.get("/api/test-llm")
def test_llm():
    try:
        response = llm.invoke([HumanMessage(content="Say hello in one sentence.")])
        return {"ok": True, "response": response.content}
    except Exception as e:
        traceback.print_exc()
        return {"ok": False, "error": str(e)}


@app.get("/api/chats")
def get_chats():
    return list(chats.values())


@app.post("/api/chats")
def create_chat(req: CreateChatRequest):
    chat_id = str(uuid.uuid4())
    chat = {
        "id": chat_id,
        "name": req.name,
        "members": [],
        "messages": [],
        "createdAt": datetime.now().isoformat(),
        "lastMessage": None,
    }
    chats[chat_id] = chat
    save_chats(chats)
    return chat


@app.get("/api/chats/{chat_id}")
def get_chat(chat_id: str):
    if chat_id not in chats:
        raise HTTPException(status_code=404, detail="Chat not found")
    return chats[chat_id]


@app.delete("/api/chats/{chat_id}")
def delete_chat(chat_id: str):
    if chat_id not in chats:
        raise HTTPException(status_code=404, detail="Chat not found")
    del chats[chat_id]
    save_chats(chats)
    return {"success": True}


@app.post("/api/chats/{chat_id}/members")
def add_member(chat_id: str, req: AddMemberRequest):
    if chat_id not in chats:
        raise HTTPException(status_code=404, detail="Chat not found")
    member = {
        "id": str(uuid.uuid4()),
        "name": req.name,
        "role": req.role,
        "background": req.background,
        "isOnline": True,
    }
    chats[chat_id]["members"].append(member)
    save_chats(chats)
    return member


@app.delete("/api/chats/{chat_id}/members/{member_id}")
def remove_member(chat_id: str, member_id: str):
    if chat_id not in chats:
        raise HTTPException(status_code=404, detail="Chat not found")
    chats[chat_id]["members"] = [
        m for m in chats[chat_id]["members"] if m["id"] != member_id
    ]
    save_chats(chats)
    return {"success": True}


@app.post("/api/chats/{chat_id}/messages")
def send_message(chat_id: str, req: SendMessageRequest):
    if chat_id not in chats:
        raise HTTPException(status_code=404, detail="Chat not found")

    chat = chats[chat_id]

    user_msg = {
        "id": str(uuid.uuid4()),
        "content": req.content,
        "sender": "user",
        "timestamp": datetime.now().isoformat(),
    }
    chat["messages"].append(user_msg)
    chat["lastMessage"] = {
        "content": req.content,
        "sender": "You",
        "timestamp": user_msg["timestamp"],
    }

    agent_responses = []

    # Filter agents by @mentions — check each member's name directly
    mentioned = [
        m for m in chat["members"]
        if re.search(r'@' + re.escape(m["name"]), req.content, re.IGNORECASE)
    ]
    members_to_respond = mentioned if mentioned else chat["members"]

    for member in members_to_respond:
        system_prompt = (
            f"You are {member['name']}, {member['role']}.\n\n"
            f"Background: {member['background']}\n\n"
            "You are in a roundtable group chat with other AI personas and a human. "
            "Stay in character as your persona. Give your genuine perspective based on your role and background. "
            "Be direct, conversational, and add something valuable. "
            "Keep it to 2–4 sentences. You can react to or build on what others have said."
        )

        lc_messages = [SystemMessage(content=system_prompt)]

        for msg in chat["messages"]:
            if msg["sender"] == "user":
                lc_messages.append(HumanMessage(content=msg["content"]))
            elif msg.get("agentId") == member["id"]:
                lc_messages.append(AIMessage(content=msg["content"]))
            else:
                agent_name = msg.get("agentName", "Another participant")
                lc_messages.append(
                    HumanMessage(content=f"[{agent_name}]: {msg['content']}")
                )

        try:
            response = llm.invoke(lc_messages)
            agent_msg = {
                "id": str(uuid.uuid4()),
                "content": response.content,
                "sender": "agent",
                "agentId": member["id"],
                "agentName": member["name"],
                "agentRole": member["role"],
                "timestamp": datetime.now().isoformat(),
            }
            chat["messages"].append(agent_msg)
            chat["lastMessage"] = {
                "content": agent_msg["content"],
                "sender": member["name"],
                "timestamp": agent_msg["timestamp"],
            }
            agent_responses.append(agent_msg)
        except Exception as e:
            print(f"Error from {member['name']}: {e}")
            traceback.print_exc()

    save_chats(chats)
    return {"userMessage": user_msg, "agentResponses": agent_responses}
