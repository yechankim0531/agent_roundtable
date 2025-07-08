export function handleChatSubmit(inputEl, chatWindow) {
  const userMessage = inputEl.value.trim();
  if (!userMessage) return;

  // Display user message in chat
  const userBubble = document.createElement('div');
  userBubble.className = 'bg-blue-100 text-blue-800 p-3 rounded-xl self-end max-w-xs';
  userBubble.textContent = userMessage;
  chatWindow.appendChild(userBubble);

  // Clear input field
  inputEl.value = '';

  // Print to console for now
  console.log('[User said]:', userMessage);

  // Simulate hardcoded agent response
  setTimeout(() => {
    const agentBubble = document.createElement('div');
    agentBubble.className = 'bg-gray-200 text-gray-900 p-3 rounded-xl self-start max-w-xs';
    agentBubble.textContent = 'As an AI agent, I think that\'s an interesting point!';
    agentBubble.style.alignSelf = 'flex-start';
    chatWindow.appendChild(agentBubble);

    // Scroll to bottom
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, 500);
}
