import React from 'react';
import ChatListHeader from '@/components/Chatlist/ChatListHeader';
import SearchBar from '@/components/Chatlist/SearchBar';
import List from '@/components/Chatlist/List';

function ChatList() {
  return (
    <div className="bg-panel-header-background flex flex-col max-h-screen">
      <ChatListHeader />
      <SearchBar />
      <List />
    </div>
  );
}

export default ChatList;
