import React from 'react';
import { Send } from "lucide-react"
import type { ChatInputProps } from "./types"

export function ChatInput({ value, onChange, onSend, disabled = false }: ChatInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-20">
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex items-end gap-3 bg-gray-50 rounded-full px-4 py-3 border border-gray-200">
          <div className="flex-1">
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full bg-transparent border-none outline-none resize-none text-sm placeholder-gray-500 max-h-32"
              rows={1}
              disabled={disabled}
              style={{
                minHeight: "20px",
                height: "auto",
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement
                target.style.height = "auto"
                target.style.height = target.scrollHeight + "px"
              }}
            />
          </div>
          <button
            onClick={onSend}
            disabled={!value.trim() || disabled}
            className="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors duration-200 flex-shrink-0"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
