import React from 'react';
import { ArrowLeft, Users } from "lucide-react"
import type { ChatHeaderProps } from "./types"

export function ChatHeader({ groupName, onlineCount, onBackClick, onMembersClick }: ChatHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 p-4 shadow-sm flex-shrink-0 relative z-20">
      <div className="flex items-center justify-between">
        {/* Left - Back Arrow */}
        <button onClick={onBackClick} className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>

        {/* Center - Group Info */}
        <div className="flex-1 text-center">
          <h1 className="text-lg font-semibold text-gray-800">{groupName}</h1>
          <p className="text-xs text-gray-500">{onlineCount} participants online</p>
        </div>

        {/* Right - Members Button */}
        <button onClick={onMembersClick} className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
          <Users size={20} className="text-gray-600" />
        </button>
      </div>
    </div>
  )
}
