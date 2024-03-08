import React from 'react';
import Avatar from '@/components/common/Avatar';
import { FaPhoneAlt, FaVideo } from 'react-icons/fa';
import { BiSearchAlt2 } from 'react-icons/bi';
import { MdMoreVert } from 'react-icons/md';
import { useStateProvider } from '@/context/StateContext';

function ChatHeader() {
  // @ts-ignore
  const [{ currentChatUser }] = useStateProvider();

  return (
    <div className="bg-panel-header-background h-16 px-4 py-3 flex justify-between items-center">
      <div className="flex flex-row gap-2">
        <Avatar type="sm" image={currentChatUser?.profilePicture ?? '/default_avatar.png'} />
        <div className="flex flex-col justify-between">
          <span className="font-medium text-primary-strong">{currentChatUser?.name ?? ''}</span>
          <span className="text-secondary text-sm">online/offline</span>
        </div>
      </div>
      <div className="flex flex-row gap-6">
        <FaPhoneAlt className="text-panel-header-icon cursor-pointer text-l" />
        <FaVideo className="text-panel-header-icon cursor-pointer text-l" />
        <BiSearchAlt2 className="text-panel-header-icon cursor-pointer text-l" />
        <MdMoreVert className="text-panel-header-icon cursor-pointer text-l" />
      </div>
    </div>
  );
}

export default ChatHeader;
