import React from 'react';
import { ChatBubble } from "./ChatBubble"
import type { ChatMessagesProps } from "./types"

export const ChatMessages = React.forwardRef<HTMLDivElement, ChatMessagesProps>(({ messages }, ref) => {
  return (
    <div className="flex-1 overflow-y-auto pb-20">
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
        <div ref={ref} />
      </div>
    </div>
  )
})

ChatMessages.displayName = "ChatMessages"
