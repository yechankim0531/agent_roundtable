import React from 'react'
import { useParams } from 'react-router-dom'
import GroupChat from '../components/Chat/GroupChat'

export default function ChatPage() {
  const { chatId } = useParams<{ chatId: string }>()
  return <GroupChat chatId={chatId!} />
}
