from langgraph.graph import StateGraph
from langchain_core.messages import HumanMessage, AIMessage, BaseMessage
from langchain_google_genai import ChatGoogleGenerativeAI
from typing import TypedDict, List
import os

os.environ["GOOGLE_API_KEY"] = "AIzaSyBDDHZvhT9kV6YvTR9_HKEduQovUj4uEHE"

# Init Gemini via LangChain wrapper
llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash")

# Shared state
class AgentState(TypedDict):
    messages: List[BaseMessage]

# Single agent function
def agent_node(state: AgentState) -> AgentState:
    response = llm.invoke(state["messages"])
    return { "messages": state["messages"] + [response] }

# LangGraph setup
graph = StateGraph(AgentState)
graph.add_node("agent", agent_node)
graph.set_entry_point("agent")
graph.set_finish_point("agent")
app = graph.compile()

# Run a test
if __name__ == "__main__":
    state = { "messages": [HumanMessage(content="How will AI impact the economy?")] }
    result = app.invoke(state)
    print("🤖 Agent:", result["messages"][-1].content)
