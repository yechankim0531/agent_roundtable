import React from 'react';
import ReactDOM from 'react-dom/client';
import GroupChat from './components/Chat/GroupChat';
import './style.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GroupChat />
  </React.StrictMode>
);