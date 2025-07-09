export interface Message {
    id: string
    content: string
    sender: "user" | "agent"
    agentName?: string
    timestamp: string
    avatar?: string
  }
  
  export interface Member {
    id: string
    name: string
    role: string
    avatar: string
    isOnline: boolean
    lastSeen?: string
  }
  
  export interface ChatHeaderProps {
    groupName: string
    onlineCount: number
    onBackClick: () => void
    onMembersClick: () => void
  }
  
  export interface ChatBubbleProps {
    message: Message
  }
  
  export interface ChatMessagesProps {
    messages: Message[]
  }
  
  export interface ChatInputProps {
    value: string
    onChange: (value: string) => void
    onSend: () => void
    disabled?: boolean
  }
  
  export interface SidebarProps {
    isOpen: boolean
    onClose: () => void
    members: Member[]
    onAddMember: () => void
  }
  