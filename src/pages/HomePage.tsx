import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Edit3, Trash2, MessageCircle } from 'lucide-react'
import type { Chat } from '../components/Chat/types'

const AGENT_COLORS = [
  'from-purple-500 to-blue-500',
  'from-green-400 to-teal-500',
  'from-orange-400 to-red-500',
  'from-pink-500 to-rose-500',
  'from-yellow-400 to-orange-500',
  'from-indigo-500 to-purple-600',
]

function formatTime(isoString: string) {
  const date = new Date(isoString)
  const now = new Date()
  const isToday = date.toDateString() === now.toDateString()
  if (isToday) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
}

function ChatAvatar({ chat }: { chat: Chat }) {
  if (chat.members.length === 0) {
    return (
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center flex-shrink-0">
        <MessageCircle size={24} className="text-white" />
      </div>
    )
  }
  if (chat.members.length === 1) {
    const color = AGENT_COLORS[0]
    return (
      <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white font-semibold text-lg flex-shrink-0`}>
        {chat.members[0].name.charAt(0).toUpperCase()}
      </div>
    )
  }
  // Multi-member: show 2x2 grid of mini avatars
  const shown = chat.members.slice(0, 4)
  return (
    <div className="w-14 h-14 rounded-full overflow-hidden grid grid-cols-2 flex-shrink-0">
      {shown.map((m, i) => (
        <div
          key={m.id}
          className={`bg-gradient-to-br ${AGENT_COLORS[i % AGENT_COLORS.length]} flex items-center justify-center text-white text-xs font-semibold`}
        >
          {m.name.charAt(0).toUpperCase()}
        </div>
      ))}
    </div>
  )
}

export default function HomePage() {
  const navigate = useNavigate()
  const [chats, setChats] = useState<Chat[]>([])
  const [showNewChat, setShowNewChat] = useState(false)
  const [newChatName, setNewChatName] = useState('')
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [createError, setCreateError] = useState('')

  useEffect(() => {
    fetch('/api/chats')
      .then(r => r.json())
      .then(data => {
        const sorted = [...data].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        setChats(sorted)
      })
      .finally(() => setLoading(false))
  }, [])

  async function createChat() {
    if (creating) return
    setCreating(true)
    try {
      const name = newChatName.trim() || 'New Roundtable'
      const res = await fetch('/api/chats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      })
      const chat = await res.json()
      setShowNewChat(false)
      setNewChatName('')
      navigate(`/chat/${chat.id}`)
    } catch (err) {
      console.error('Failed to create chat:', err)
      setCreateError('Could not connect to server. Is the backend running?')
    } finally {
      setCreating(false)
    }
  }

  async function deleteChat(e: React.MouseEvent, chatId: string) {
    e.stopPropagation()
    await fetch(`/api/chats/${chatId}`, { method: 'DELETE' })
    setChats(prev => prev.filter(c => c.id !== chatId))
  }

  return (
    <div className="h-screen bg-white flex flex-col max-w-md mx-auto">
      {/* iOS-style Header */}
      <div className="pt-12 pb-2 px-4 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-blue-500 font-medium opacity-0">Back</span>
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <button
            onClick={() => setShowNewChat(true)}
            className="p-1 text-blue-500 hover:text-blue-600 transition-colors"
          >
            <Edit3 size={22} />
          </button>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {loading && (
          <div className="flex items-center justify-center h-40 text-gray-400">
            Loading...
          </div>
        )}

        {!loading && chats.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400 gap-3">
            <MessageCircle size={48} className="text-gray-300" />
            <p className="text-base font-medium">No Roundtables Yet</p>
            <p className="text-sm text-center px-8">Tap the compose icon above to start a new roundtable discussion</p>
          </div>
        )}

        {chats.map((chat, idx) => {
          const lastMsg = chat.lastMessage
          const isLastFromAgent = lastMsg && lastMsg.sender !== 'You'
          return (
            <div
              key={chat.id}
              onClick={() => navigate(`/chat/${chat.id}`)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer border-b border-gray-100 group"
            >
              <ChatAvatar chat={chat} />

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-semibold text-gray-900 text-base truncate">{chat.name}</span>
                  {lastMsg && (
                    <span className="text-xs text-gray-400 ml-2 flex-shrink-0">
                      {formatTime(lastMsg.timestamp)}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500 truncate pr-2">
                    {lastMsg
                      ? `${isLastFromAgent ? lastMsg.sender + ': ' : ''}${lastMsg.content}`
                      : `${chat.members.length} participant${chat.members.length !== 1 ? 's' : ''} · Tap to start`}
                  </p>
                  <button
                    onClick={e => deleteChat(e, chat.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-gray-300 hover:text-red-400 flex-shrink-0"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* New Chat Modal */}
      {showNewChat && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-end z-50" onClick={() => { setShowNewChat(false); setCreateError('') }}>
          <div
            className="bg-white w-full rounded-t-2xl p-6 pb-10"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-5" />
            <h2 className="text-xl font-bold text-gray-900 mb-4">New Roundtable</h2>
            <input
              autoFocus
              type="text"
              placeholder="Roundtable name..."
              value={newChatName}
              onChange={e => setNewChatName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') createChat() }}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 mb-4"
            />
            {createError && (
              <p className="text-red-500 text-sm mb-3">{createError}</p>
            )}
            <button
              type="button"
              onClick={createChat}
              disabled={creating}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors text-base"
            >
              {creating ? 'Creating...' : 'Create'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
