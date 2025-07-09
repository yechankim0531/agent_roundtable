import React from 'react';

import { ChatHeader } from "./ChatHeader"
import { ChatMessages } from "./ChatMessages"
import { ChatInput } from "./ChatInput"
import { Sidebar } from "./Sidebar"
import { useChatLogic, groupMembers } from "./useChatLogic"

export default function GroupChat() {
  const {
    messages,
    inputValue,
    setInputValue,
    isSidebarOpen,
    handleSendMessage,
    toggleSidebar,
    handleBackClick,
    handleAddMember,
    messagesEndRef,
  } = useChatLogic()

  const onlineCount = groupMembers.filter((member) => member.isOnline).length

  return (
    <div className="h-screen bg-gray-50 flex flex-col relative">
      <ChatHeader
        groupName="Expert Discussion Group"
        onlineCount={onlineCount}
        onBackClick={handleBackClick}
        onMembersClick={toggleSidebar}
      />

      <ChatMessages messages={messages} ref={messagesEndRef} />

      <ChatInput value={inputValue} onChange={setInputValue} onSend={handleSendMessage} />

      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} members={groupMembers} onAddMember={handleAddMember} />
    </div>
  )
}
