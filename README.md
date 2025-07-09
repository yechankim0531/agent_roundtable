# AI Agent Roundtable

A modern React-based chat interface for AI agent conversations, built with TypeScript, Tailwind CSS, and Vite.

## �� Features

- **Real-time Chat Interface**: Clean, modern UI with message bubbles
- **Modular Architecture**: Separated into reusable React components
- **TypeScript Support**: Full type safety throughout the application
- **Responsive Design**: Works on desktop and mobile devices
- **Sidebar Navigation**: Group member management panel
- **Auto-scroll**: Automatically scrolls to latest messages
- **Keyboard Shortcuts**: Enter to send, Shift+Enter for new line

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **npm** (comes with Node.js)

## 🛠️ Installation

1. **Clone or copy the project** to your local machine

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

## 📁 Project Structure
src/
├── components/
│ └── Chat/
│ ├── GroupChat.tsx # Main orchestrator component
│ ├── ChatHeader.tsx # Header with navigation
│ ├── ChatMessages.tsx # Scrollable messages area
│ ├── ChatInput.tsx # Input bar with send button
│ ├── ChatBubble.tsx # Individual message bubble
│ ├── Sidebar.tsx # Slide-in member panel
│ ├── useChatLogic.ts # Custom hook for chat state
│ └── types.ts # TypeScript interfaces
├── index.html # Main HTML file
├── main.tsx # React entry point
└── style.css # Tailwind CSS imports


## 🎮 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 📦 Dependencies

### Production Dependencies
- `react` (^19.1.0) - React library
- `react-dom` (^19.1.0) - React DOM rendering
- `lucide-react` (^0.525.0) - Beautiful icon library

### Development Dependencies
- `@types/react` (^19.1.8) - TypeScript types for React
- `@types/react-dom` (^19.1.6) - TypeScript types for React DOM
- `@vitejs/plugin-react` (^4.6.0) - Vite plugin for React
- `typescript` (^5.8.3) - TypeScript compiler
- `vite` (^7.0.2) - Fast build tool and dev server
- `tailwindcss` (^4.1.11) - Utility-first CSS framework
- `postcss` (^8.5.6) - CSS processor
- `autoprefixer` (^10.4.21) - CSS vendor prefixing

## 🏗️ Technology Stack

- **Frontend Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Package Manager**: npm

## 🔧 Configuration Files

- `vite.config.js` - Vite configuration with React plugin
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `tsconfig.json` - TypeScript configuration

## 🚀 Quick Start for New Environments

```bash
# 1. Navigate to project directory
cd agent_roundtable

# 2. Install all dependencies
npm install

# 3. Start development server
npm run dev
```

## 📝 Development Notes

- The project uses a modular component architecture for maintainability
- All components are TypeScript-based for better type safety
- Tailwind CSS is used for styling with utility classes
- The chat interface supports both user and agent messages
- The sidebar can be toggled for group member management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🐛 Issues

If you encounter any issues, please report them on the [GitHub issues page](https://github.com/yechankim0531/agent_roundtable/issues).