import React from 'react';
import type { ChatBubbleProps } from "./types"

export function ChatBubble({ message }: ChatBubbleProps) {
  return (
    <div className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex ${message.sender === "user" ? "flex-row-reverse" : "flex-row"} items-end gap-3 max-w-[80%] md:max-w-[70%]`}
      >
        {/* Avatar for agents */}
        {message.sender === "agent" && (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
            {message.avatar}
          </div>
        )}

        {/* Message Content */}
        <div className={`flex flex-col ${message.sender === "user" ? "items-end" : "items-start"}`}>
          {/* Agent Name Label */}
          {message.sender === "agent" && message.agentName && (
            <span className="text-xs font-medium text-gray-600 mb-1 px-1">{message.agentName}</span>
          )}

          {/* Message Bubble */}
          <div
            className={`
              px-4 py-3 rounded-2xl shadow-sm
              ${
                message.sender === "user"
                  ? "bg-blue-500 text-white rounded-br-md"
                  : "bg-white text-gray-800 rounded-bl-md border border-gray-100"
              }
            `}
          >
            <p className="text-sm leading-relaxed">{message.content}</p>
          </div>

          {/* Timestamp */}
          <span className="text-xs text-gray-500 mt-1 px-1">{message.timestamp}</span>
        </div>
      </div>
    </div>
  )
}
