import React from 'react';
import Avatar from '@/components/common/Avatar';
import { useStateProvider } from '@/context/StateContext';
import { BsFillChatLeftTextFill, BsThreeDotsVertical } from 'react-icons/bs';
import { reducerCases } from '@/context/constants';

function ChatListHeader() {
  // @ts-ignore
  const [{ userInfo }, dispatch] = useStateProvider();

  const handleShowAllContactsPage = () => {
    dispatch({ type: reducerCases.SET_SHOW_CONTACTS_PAGE });
  };

  return (
    <div className="h-16 px-4 py-3 flex justify-between items-center">
      <div className="cursor-pointer">
        <Avatar type="sm" image={userInfo?.profileImage} />
      </div>
      <div className="flex gap-6">
        <BsFillChatLeftTextFill
          className="text-panel-header-icon cursor-pointer text-xl"
          title="New Chat"
          onClick={handleShowAllContactsPage}
        />
        <BsThreeDotsVertical
          className="text-panel-header-icon cursor-pointer text-xl"
          title="Menu"
        />
      </div>
    </div>
  );
}

export default ChatListHeader;
