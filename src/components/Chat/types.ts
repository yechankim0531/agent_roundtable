export interface Message {
  id: string
  content: string
  sender: "user" | "agent"
  agentId?: string
  agentName?: string
  agentRole?: string
  timestamp: string
}

export interface Member {
  id: string
  name: string
  role: string
  background: string
  isOnline: boolean
}

export interface Chat {
  id: string
  name: string
  members: Member[]
  messages: Message[]
  createdAt: string
  lastMessage: {
    content: string
    sender: string
    timestamp: string
  } | null
}

export interface ChatHeaderProps {
  groupName: string
  memberCount: number
  onBackClick: () => void
  onMembersClick: () => void
}

export interface ChatBubbleProps {
  message: Message
  memberIndex: number
}

export interface ChatMessagesProps {
  messages: Message[]
  members: Member[]
}

export interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  disabled?: boolean
  members: Member[]
}

export interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  members: Member[]
  onAddMember: () => void
  onRemoveMember: (memberId: string) => void
}
