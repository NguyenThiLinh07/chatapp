import React from 'react';
import { useStateProvider } from '@/context/StateContext';
import { calculateTime } from '@/utils/CalculateTime';
import { TMessage } from '@/types/message';
import MessageStatus from '@/components/common/MessageStatus';

function ChatContainer() {
  // @ts-ignore
  const [{ messages, currentChatUser, userInfo }] = useStateProvider();

  console.log('messages111', messages);

  return (
    <div className="h-[80vh] w-full relative flex-grow overflow-auto custom-scrollbar">
      <div className="bg-chat-background bg-fixed w-full h-full opacity-5 absolute top-0 left-0 z-0"></div>
      <div className="mx-10 my-6 relative bottom-0 z-40 left-0">
        <div className="flex w-full">
          <div className="flex flex-col justify-end w-full gap-1 overflow-auto">
            {messages?.map((message: TMessage) => (
              <div
                key={message?.id}
                className={`flex ${message?.senderId === currentChatUser?.id ? 'justify-start' : 'justify-end'}`}
              >
                {message?.type === 'text' && (
                  <div
                    className={`text-white px-2 py-[5px] text-sm rounded-md flex gap-2 items-end max-w-[45%] ${message?.senderId === currentChatUser?.id ? 'bg-incoming-background' : 'bg-outgoing-background'}`}
                  >
                    <span className="break-all">{message?.message}</span>
                    <div className="flex gap-1 items-end">
                      <span className="text-bubble-meta text-[11px] pt-1 min-w-fit">
                        {calculateTime(message?.createdAt)}
                      </span>
                      <span>
                        {message?.senderId === userInfo?.id && (
                          <MessageStatus messageStatus={message?.messageStatus} />
                        )}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;
