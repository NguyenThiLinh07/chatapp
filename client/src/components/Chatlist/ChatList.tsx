import React, { useEffect, useState } from 'react';
import ChatListHeader from '@/components/Chatlist/ChatListHeader';
import SearchBar from '@/components/Chatlist/SearchBar';
import List from '@/components/Chatlist/List';
import { useStateProvider } from '@/context/StateContext';
import ContactsList from '@/components/Chatlist/ContactsList';

function ChatList() {
  // @ts-ignore
  const [{ showContactsPage }] = useStateProvider();
  const [pageType, setPageType] = useState<string>('default');

  useEffect(() => {
    if (showContactsPage) setPageType('all-contacts');
    else setPageType('default');
  }, [showContactsPage]);

  return (
    <div className="bg-panel-header-background flex flex-col max-h-screen">
      {pageType === 'default' ? (
        <>
          <ChatListHeader />
          <SearchBar />
          <List />
        </>
      ) : (
        <ContactsList />
      )}
    </div>
  );
}

export default ChatList;
