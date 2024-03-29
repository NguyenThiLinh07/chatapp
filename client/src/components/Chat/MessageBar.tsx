import React, { useState } from 'react';
import { BsEmojiSmile } from 'react-icons/bs';
import { ImAttachment } from 'react-icons/im';
import { MdSend } from 'react-icons/md';
import { FaMicrophone } from 'react-icons/fa';
import { useStateProvider } from '@/context/StateContext';
import messageApi from '@/api/messageApi';
import { reducerCases } from '@/context/constants';

function MessageBar() {
  // @ts-ignore
  const [{ userInfo, currentChatUser, messages }, dispatch] = useStateProvider();
  const [message, setMessage] = useState<string>('');
  const sendMessage = async () => {
    try {
      const { data } = await messageApi.addMessage({
        to: currentChatUser?.id,
        from: userInfo?.id,
        message,
      });
      setMessage('');
      dispatch({ type: reducerCases.SET_MESSAGES, messages: [...messages, data.message] });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-panel-header-background h-20 px-4 flex items-center gap-6 relative">
      <div className="flex gap-6">
        <BsEmojiSmile className="text-panel-header-icon cursor-pointer text-xl" title="Emoji" />
        <ImAttachment
          className="text-panel-header-icon cursor-pointer text-xl"
          title="Attach File"
        />
      </div>
      <div className="w-full rounded-lg h-10 flex items-center">
        <input
          type="text"
          placeholder="Type a message"
          className="bg-input-background text-sm focus:outline-none text-white h-10 rounded-lg px-5 py-4 w-full"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
      </div>
      <div className="flex w-10 items-center justify-center flex-row gap-2">
        <button>
          <MdSend
            className="text-panel-header-icon cursor-pointer text-xl"
            title="Send message"
            onClick={sendMessage}
          />
        </button>
        <button>
          <FaMicrophone className="text-panel-header-icon cursor-pointer text-xl" title="Record" />
        </button>
      </div>
    </div>
  );
}

export default MessageBar;
