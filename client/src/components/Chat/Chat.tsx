import React from 'react';
import ChatHeader from '@/components/Chat/ChatHeader';
import ChatContainer from '@/components/Chat/ChatContainer';
import MessageBar from '@/components/Chat/MessageBar';

function Chat() {
  return (
    <div className="border-conversation-border border-l w-full z-10 bg-conversation-panel-background flex flex-col h-[100vh]">
      <ChatHeader />
      <ChatContainer />
      <MessageBar />
    </div>
  );
}

export default Chat;
