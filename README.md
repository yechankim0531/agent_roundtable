# Agent Roundtable

A group chat application where AI agents with custom personas debate, discuss, and challenge each other in real time. Create agents with distinct backgrounds and viewpoints, add them to a roundtable, and watch them engage in multi-perspective conversations.

> Built with React · TypeScript · Python · Tailwind CSS · Vite

---

## What It Does

Instead of a 1-on-1 chat with a single AI, Agent Roundtable lets you set up a room of AI agents — each with their own name, role, and detailed persona — and have them discuss any topic together.

**Key capabilities:**

- **Custom AI Personas** — Define each agent's name, role/title, and background. A behavioral economist will argue very differently than a Silicon Valley founder.
- **Multi-Agent Conversations** — Agents don't just reply to you. They respond to each other, debate, push back, and build on arguments.
- **@ Mentions** — Direct questions to specific agents mid-conversation to steer the discussion.
- **Roundtable Topics** — Create multiple roundtables around different topics, each with their own set of agents.
- **Real-Time Chat UI** — Clean, responsive chat interface with message bubbles, auto-scroll, and keyboard shortcuts.

---

## Example

Create a roundtable called "Future of AI" with two agents:

| Agent | Role | Perspective |
|-------|------|-------------|
| Dr. Econ | Behavioral Economist | Skeptical of techno-optimism, centers working-class impact, data-driven |
| Mr. Founder | Silicon Valley Entrepreneur | Believes technology always creates more than it destroys, pro-disruption |

Ask: *"Will AI create more jobs than it destroys over the next 20 years?"*

The agents debate each other — Dr. Econ argues that displacement will widen inequality without policy intervention, while Mr. Founder pushes back that markets adapt and create new opportunities. You can jump in with @ mentions to steer the conversation in any direction.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript, Tailwind CSS |
| Backend | Python |
| Build Tool | Vite |
| Icons | Lucide React |

---

## Getting Started

### Prerequisites

- Node.js v16+
- Python 3.8+
### Create env file
Create env file with gemini api key
### Installation

```bash
# Clone the repository
git clone https://github.com/yechankim0531/agent_roundtable.git
cd agent_roundtable


# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
pip install -r requirements.txt
cd ..
```

### Running the App

```bash
# Start both frontend and backend
# On Windows:
start.bat

# Or manually:
# Terminal 1 - Backend
cd backend
python main.py

# Terminal 2 - Frontend
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Project Structure

```
agent_roundtable/
├── src/
│   └── components/
│       └── Chat/
│           ├── GroupChat.tsx       # Main orchestrator
│           ├── ChatHeader.tsx      # Header with navigation
│           ├── ChatMessages.tsx    # Scrollable message area
│           ├── ChatInput.tsx       # Input with @ mention support
│           ├── ChatBubble.tsx      # Individual message bubble
│           ├── Sidebar.tsx         # Agent management panel
│           ├── useChatLogic.ts     # Chat state management hook
│           └── types.ts           # TypeScript interfaces
├── backend/
│   └── main.py                    # Python API server
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## Use Cases

- **Product development** — Add a PM, engineer, designer, and business analyst to get multi-angle feedback on features
- **Debate and research** — Set up opposing viewpoints on any topic to stress-test your thinking
- **Decision making** — Create agents representing different stakeholders to explore trade-offs
- **Learning** — Have experts from different fields discuss a topic to understand it from multiple angles
