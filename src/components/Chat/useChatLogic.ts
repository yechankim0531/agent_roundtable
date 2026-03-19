import { useState, useCallback, useRef, useEffect } from 'react'
import type { Message, Member, Chat } from './types'

export function useChatLogic(chatId: string) {
  const [chat, setChat] = useState<Chat | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isShowingAddMember, setIsShowingAddMember] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [loadingChat, setLoadingChat] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [chat?.messages, scrollToBottom])

  useEffect(() => {
    fetch(`/api/chats/${chatId}`)
      .then(r => r.json())
      .then(data => setChat(data))
      .finally(() => setLoadingChat(false))
  }, [chatId])

  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim() || isSending || !chat) return
    const content = inputValue.trim()
    setInputValue('')
    setIsSending(true)

    // Optimistically add user message
    const tempUserMsg: Message = {
      id: `temp-${Date.now()}`,
      content,
      sender: 'user',
      timestamp: new Date().toISOString(),
    }
    setChat(prev => prev ? { ...prev, messages: [...prev.messages, tempUserMsg] } : prev)

    try {
      const res = await fetch(`/api/chats/${chatId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      })
      const data = await res.json()
      // Replace temp with real messages
      setChat(prev => {
        if (!prev) return prev
        const withoutTemp = prev.messages.filter(m => m.id !== tempUserMsg.id)
        return {
          ...prev,
          messages: [...withoutTemp, data.userMessage, ...data.agentResponses],
          lastMessage: prev.lastMessage,
        }
      })
    } catch (err) {
      console.error('Send failed', err)
      setChat(prev => prev ? {
        ...prev,
        messages: prev.messages.filter(m => m.id !== tempUserMsg.id),
      } : prev)
    } finally {
      setIsSending(false)
    }
  }, [inputValue, isSending, chat, chatId])

  const handleAddMember = useCallback(async (name: string, role: string, background: string) => {
    if (!chat) return
    const res = await fetch(`/api/chats/${chatId}/members`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, role, background }),
    })
    const member = await res.json()
    setChat(prev => prev ? { ...prev, members: [...prev.members, member] } : prev)
    setIsShowingAddMember(false)
  }, [chat, chatId])

  const handleRemoveMember = useCallback(async (memberId: string) => {
    await fetch(`/api/chats/${chatId}/members/${memberId}`, { method: 'DELETE' })
    setChat(prev => prev ? {
      ...prev,
      members: prev.members.filter(m => m.id !== memberId),
    } : prev)
  }, [chatId])

  const toggleSidebar = useCallback(() => setIsSidebarOpen(prev => !prev), [])

  return {
    chat,
    loadingChat,
    inputValue,
    setInputValue,
    isSidebarOpen,
    isShowingAddMember,
    setIsShowingAddMember,
    isSending,
    handleSendMessage,
    toggleSidebar,
    handleAddMember,
    handleRemoveMember,
    messagesEndRef,
  }
}
