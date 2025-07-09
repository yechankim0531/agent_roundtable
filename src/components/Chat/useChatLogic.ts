import React from 'react';

import { useState, useCallback, useRef, useEffect } from "react"
import type { Message, Member } from "./types"

const initialMessages: Message[] = [
  
]

export const groupMembers: Member[] = [
  
]

export function useChatLogic() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const handleSendMessage = useCallback(() => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        content: inputValue,
        sender: "user",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, newMessage])
      setInputValue("")
    }
  }, [inputValue])

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev)
  }, [])

  const handleBackClick = useCallback(() => {
    // Handle back navigation
    console.log("Back button clicked")
  }, [])

  const handleAddMember = useCallback(() => {
    // Handle add member
    console.log("Add member clicked")
  }, [])

  return {
    messages,
    inputValue,
    setInputValue,
    isSidebarOpen,
    handleSendMessage,
    toggleSidebar,
    handleBackClick,
    handleAddMember,
    messagesEndRef,
  }
}
