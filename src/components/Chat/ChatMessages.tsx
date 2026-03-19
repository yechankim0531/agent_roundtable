import React from 'react'
import { ChatBubble } from './ChatBubble'
import type { ChatMessagesProps } from './types'

export const ChatMessages = React.forwardRef<HTMLDivElement, ChatMessagesProps>(
  ({ messages, members }, ref) => {
    // Build a lookup: agentId -> index in members array (for color assignment)
    const memberIndexMap = new Map(members.map((m, i) => [m.id, i]))

    return (
      <div className="flex-1 overflow-y-auto bg-gray-100">
        <div className="px-4 py-4 space-y-3">
          {messages.length === 0 && (
            <div className="text-center text-gray-400 text-sm py-16">
              <p className="font-medium mb-1">No messages yet</p>
              <p>Add agents and start the conversation</p>
            </div>
          )}
          {messages.map(message => {
            const memberIndex = message.agentId !== undefined
              ? (memberIndexMap.get(message.agentId) ?? 0)
              : 0
            return (
              <ChatBubble key={message.id} message={message} memberIndex={memberIndex} />
            )
          })}
          <div ref={ref} />
        </div>
      </div>
    )
  }
)

ChatMessages.displayName = 'ChatMessages'
