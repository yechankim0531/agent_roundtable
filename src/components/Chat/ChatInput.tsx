import React, { useRef, useState, useEffect } from 'react'
import { Send } from 'lucide-react'
import type { ChatInputProps, Member } from './types'

const AGENT_COLORS = [
  'from-purple-500 to-blue-500',
  'from-green-400 to-teal-500',
  'from-orange-400 to-red-500',
  'from-pink-500 to-rose-500',
  'from-yellow-400 to-orange-500',
  'from-indigo-500 to-purple-600',
]

export function ChatInput({ value, onChange, onSend, disabled = false, members }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [mentionQuery, setMentionQuery] = useState<string | null>(null)
  const [mentionStart, setMentionStart] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const filtered = mentionQuery !== null
    ? members.filter(m => m.name.toLowerCase().startsWith(mentionQuery.toLowerCase()))
    : []

  function handleChange(newValue: string) {
    onChange(newValue)

    const el = textareaRef.current
    const cursor = el?.selectionStart ?? newValue.length
    const textBefore = newValue.slice(0, cursor)
    const match = textBefore.match(/@(\w*)$/)

    if (match) {
      setMentionQuery(match[1])
      setMentionStart(cursor - match[0].length)
      setSelectedIndex(0)
    } else {
      setMentionQuery(null)
    }
  }

  function selectMention(member: Member) {
    const before = value.slice(0, mentionStart)
    const after = value.slice(textareaRef.current?.selectionStart ?? value.length)
    const inserted = `@${member.name} `
    onChange(before + inserted + after)
    setMentionQuery(null)

    // Restore focus and move cursor after the inserted mention
    setTimeout(() => {
      const el = textareaRef.current
      if (el) {
        const pos = before.length + inserted.length
        el.focus()
        el.setSelectionRange(pos, pos)
      }
    }, 0)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (mentionQuery !== null && filtered.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(i => (i + 1) % filtered.length)
        return
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(i => (i - 1 + filtered.length) % filtered.length)
        return
      }
      if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault()
        selectMention(filtered[selectedIndex])
        return
      }
      if (e.key === 'Escape') {
        setMentionQuery(null)
        return
      }
    }

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  // Close dropdown if clicked outside
  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (!(e.target as HTMLElement).closest('[data-mention-dropdown]')) {
        setMentionQuery(null)
      }
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [])

  return (
    <div className="bg-white border-t border-gray-100 shadow-sm flex-shrink-0 z-20 relative">
      {/* Mention dropdown */}
      {mentionQuery !== null && filtered.length > 0 && (
        <div
          data-mention-dropdown
          className="absolute bottom-full left-3 right-3 mb-1 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden z-30"
        >
          {filtered.map((member, i) => (
            <button
              key={member.id}
              onMouseDown={e => { e.preventDefault(); selectMention(member) }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                i === selectedIndex ? 'bg-blue-50' : 'hover:bg-gray-50'
              }`}
            >
              <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${AGENT_COLORS[members.indexOf(member) % AGENT_COLORS.length]} flex items-center justify-center text-white text-xs font-semibold flex-shrink-0`}>
                {member.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <span className="text-sm font-medium text-gray-900">{member.name}</span>
                <span className="text-xs text-gray-400 ml-2">{member.role}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      <div className="p-3">
        <div className="flex items-end gap-3 bg-gray-50 rounded-full px-4 py-3 border border-gray-200">
          <div className="flex-1">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={e => handleChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={members.length > 0 ? 'Message... (@ to mention)' : 'Type your message...'}
              className="w-full bg-transparent border-none outline-none resize-none text-sm placeholder-gray-500 max-h-32"
              rows={1}
              disabled={disabled}
              style={{ minHeight: '20px', height: 'auto' }}
              onInput={e => {
                const t = e.target as HTMLTextAreaElement
                t.style.height = 'auto'
                t.style.height = t.scrollHeight + 'px'
              }}
            />
          </div>
          <button
            onClick={onSend}
            disabled={!value.trim() || disabled}
            className="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors flex-shrink-0"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
