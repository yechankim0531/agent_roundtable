import React, { useState } from 'react'
import { X } from 'lucide-react'

interface AddMemberModalProps {
  onClose: () => void
  onAdd: (name: string, role: string, background: string) => Promise<void>
}

export function AddMemberModal({ onClose, onAdd }: AddMemberModalProps) {
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [background, setBackground] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !role.trim() || !background.trim()) return
    setLoading(true)
    await onAdd(name.trim(), role.trim(), background.trim())
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50" onClick={onClose}>
      <div
        className="bg-white w-full rounded-t-2xl p-6 pb-10 max-h-[85vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-900">Add AI Agent</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">Name</label>
            <input
              autoFocus
              type="text"
              placeholder="e.g. Dr. Sarah Chen"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">Role / Title</label>
            <input
              type="text"
              placeholder="e.g. Senior Economist at the IMF"
              value={role}
              onChange={e => setRole(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">Background & Persona</label>
            <textarea
              placeholder="Describe their background, expertise, viewpoint, and how they engage in discussions. The more detail, the more authentic their perspective will be..."
              value={background}
              onChange={e => setBackground(e.target.value)}
              rows={5}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !name.trim() || !role.trim() || !background.trim()}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-200 text-white font-semibold py-3 rounded-xl transition-colors text-base mt-1"
          >
            {loading ? 'Adding...' : 'Add to Roundtable'}
          </button>
        </form>
      </div>
    </div>
  )
}
