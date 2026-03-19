import React from 'react'
import { ArrowLeft, Users } from 'lucide-react'
import type { ChatHeaderProps } from './types'

export function ChatHeader({ groupName, memberCount, onBackClick, onMembersClick }: ChatHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 pt-10 pb-3 px-4 shadow-sm flex-shrink-0 relative z-20">
      <div className="flex items-center justify-between">
        <button onClick={onBackClick} className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center gap-1 text-blue-500">
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Back</span>
        </button>

        <div className="flex-1 text-center px-2">
          <h1 className="text-base font-semibold text-gray-900 truncate">{groupName}</h1>
          <p className="text-xs text-gray-500">{memberCount} participant{memberCount !== 1 ? 's' : ''}</p>
        </div>

        <button onClick={onMembersClick} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-blue-500">
          <Users size={20} />
        </button>
      </div>
    </div>
  )
}
