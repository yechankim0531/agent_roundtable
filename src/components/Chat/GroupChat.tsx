import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ChatHeader } from './ChatHeader'
import { ChatMessages } from './ChatMessages'
import { ChatInput } from './ChatInput'
import { Sidebar } from './Sidebar'
import { AddMemberModal } from './AddMemberModal'
import { useChatLogic } from './useChatLogic'

interface GroupChatProps {
  chatId: string
}

export default function GroupChat({ chatId }: GroupChatProps) {
  const navigate = useNavigate()
  const {
    chat,
    loadingChat,
    inputValue,
    setInputValue,
    isSidebarOpen,
    isShowingAddMember,
    setIsShowingAddMember,
    isSending,
    handleSendMessage,
    toggleSidebar,
    handleAddMember,
    handleRemoveMember,
    messagesEndRef,
  } = useChatLogic(chatId)

  if (loadingChat || !chat) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-400">Loading...</div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-gray-100 flex flex-col relative max-w-md mx-auto">
      <ChatHeader
        groupName={chat.name}
        memberCount={chat.members.length}
        onBackClick={() => navigate('/')}
        onMembersClick={toggleSidebar}
      />

      <ChatMessages messages={chat.messages} members={chat.members} ref={messagesEndRef} />

      {isSending && (
        <div className="px-4 py-2 flex items-center gap-2">
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <span className="text-xs text-gray-400">Agents are thinking...</span>
        </div>
      )}

      <ChatInput
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSendMessage}
        disabled={isSending}
        members={chat.members}
      />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
        members={chat.members}
        onAddMember={() => {
          setIsShowingAddMember(true)
          toggleSidebar()
        }}
        onRemoveMember={handleRemoveMember}
      />

      {isShowingAddMember && (
        <AddMemberModal
          onClose={() => setIsShowingAddMember(false)}
          onAdd={handleAddMember}
        />
      )}
    </div>
  )
}
