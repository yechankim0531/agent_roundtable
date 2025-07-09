import React from 'react';

import { X, UserPlus } from "lucide-react"
import type { SidebarProps } from "./types"

export function Sidebar({ isOpen, onClose, members, onAddMember }: SidebarProps) {
  return (
    <>
      {/* Backdrop Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300" onClick={onClose} />
      )}

      {/* Members Sidebar */}
      <div
        className={`
          fixed top-0 right-0 h-full w-full sm:w-1/3 bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Group Members</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Add Member Button */}
        <div className="p-4 border-b border-gray-100">
          <button
            onClick={onAddMember}
            className="w-full flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200"
          >
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <UserPlus size={20} className="text-white" />
            </div>
            <span className="text-blue-600 font-medium">Add Member</span>
          </button>
        </div>

        {/* Members List */}
        <div className="flex-1 overflow-y-auto">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors duration-200"
            >
              {/* Avatar */}
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm font-semibold">
                  {member.avatar}
                </div>
                {/* Online Status Indicator */}
                <div
                  className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                    member.isOnline ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
              </div>

              {/* Member Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-gray-800 truncate">{member.name}</h3>
                  {member.role === "Group Admin" && (
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">Admin</span>
                  )}
                </div>
                <p className="text-sm text-gray-500 truncate">{member.role}</p>
                {!member.isOnline && member.lastSeen && (
                  <p className="text-xs text-gray-400">Last seen {member.lastSeen}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
