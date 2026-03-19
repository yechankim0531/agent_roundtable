import React from 'react'
import type { ChatBubbleProps } from './types'

const AGENT_COLORS = [
  'from-purple-500 to-blue-500',
  'from-green-400 to-teal-500',
  'from-orange-400 to-red-500',
  'from-pink-500 to-rose-500',
  'from-yellow-400 to-orange-500',
  'from-indigo-500 to-purple-600',
]

function MessageWithMentions({ content, isUser }: { content: string; isUser: boolean }) {
  const parts = content.split(/(@\w+(?:\s+\w+)*)/g)
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('@') ? (
          <span
            key={i}
            className={`font-semibold ${isUser ? 'text-blue-100' : 'text-blue-500'}`}
          >
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  )
}

function formatTime(isoString: string) {
  try {
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  } catch {
    return isoString
  }
}

export function ChatBubble({ message, memberIndex }: ChatBubbleProps) {
  const isUser = message.sender === 'user'
  const color = AGENT_COLORS[memberIndex % AGENT_COLORS.length]
  const initial = message.agentName?.charAt(0).toUpperCase() ?? '?'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end gap-2 max-w-[80%]`}>
        {/* Agent avatar */}
        {!isUser && (
          <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white text-xs font-semibold flex-shrink-0`}>
            {initial}
          </div>
        )}

        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          {/* Agent name + role */}
          {!isUser && message.agentName && (
            <span className="text-xs font-medium text-gray-500 mb-1 px-1">
              {message.agentName}
              {message.agentRole && <span className="font-normal"> · {message.agentRole}</span>}
            </span>
          )}

          {/* Bubble */}
          <div
            className={`px-4 py-2.5 shadow-sm text-sm leading-relaxed ${
              isUser
                ? 'bg-blue-500 text-white rounded-[20px] rounded-br-[6px]'
                : 'bg-white text-gray-800 rounded-[20px] rounded-bl-[6px] border border-gray-100'
            }`}
          >
            <MessageWithMentions content={message.content} isUser={isUser} />
          </div>

          <span className="text-[11px] text-gray-400 mt-1 px-1">{formatTime(message.timestamp)}</span>
        </div>
      </div>
    </div>
  )
}
