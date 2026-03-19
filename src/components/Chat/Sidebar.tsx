import React from 'react'
import { X, UserPlus, Trash2 } from 'lucide-react'
import type { SidebarProps } from './types'

const AGENT_COLORS = [
  'from-purple-500 to-blue-500',
  'from-green-400 to-teal-500',
  'from-orange-400 to-red-500',
  'from-pink-500 to-rose-500',
  'from-yellow-400 to-orange-500',
  'from-indigo-500 to-purple-600',
]

export function Sidebar({ isOpen, onClose, members, onAddMember, onRemoveMember }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-30" onClick={onClose} />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-80 bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 pt-12">
          <h2 className="text-lg font-semibold text-gray-900">Participants</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Add Member */}
        <div className="p-4 border-b border-gray-100">
          <button
            onClick={onAddMember}
            className="w-full flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
          >
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <UserPlus size={18} className="text-white" />
            </div>
            <span className="text-blue-600 font-medium text-sm">Add AI Agent</span>
          </button>
        </div>

        {/* Member List */}
        <div className="flex-1 overflow-y-auto">
          {members.length === 0 && (
            <div className="text-center text-gray-400 text-sm py-12 px-6">
              <p className="font-medium mb-1">No agents yet</p>
              <p>Add agents above to start your roundtable</p>
            </div>
          )}
          {members.map((member, i) => (
            <div key={member.id} className="flex items-start gap-3 p-4 hover:bg-gray-50 group border-b border-gray-50">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${AGENT_COLORS[i % AGENT_COLORS.length]} flex items-center justify-center text-white text-sm font-semibold flex-shrink-0`}>
                {member.name.charAt(0).toUpperCase()}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm">{member.name}</p>
                <p className="text-xs text-blue-500 font-medium mb-1">{member.role}</p>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">{member.background}</p>
              </div>

              <button
                onClick={() => onRemoveMember(member.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 text-gray-300 hover:text-red-400 flex-shrink-0 mt-0.5"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
