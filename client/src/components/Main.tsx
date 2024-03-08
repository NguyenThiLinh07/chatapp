import React, { useEffect, useState } from 'react';
import ChatList from '@/components/Chatlist/ChatList';
import Empty from '@/components/Empty';
import { useRouter } from 'next/navigation';
import { useStateProvider } from '@/context/StateContext';
import { onAuthStateChanged } from '@firebase/auth';
import { firebaseAuth } from '@/utils/FirebaseConfig';
import { authApi } from '@/api/authApi';
import { reducerCases } from '@/context/constants';
import { IndexedObject } from '@/types/common';
import Chat from '@/components/Chat/Chat';
import messageApi from '@/api/messageApi';

function Main() {
  const router = useRouter();
  // @ts-ignore
  const [{ userInfo, currentChatUser, messages }, dispatch] = useStateProvider();
  const [redirectLogin, setRedirectLogin] = useState<boolean>(false);

  useEffect(() => {
    if (redirectLogin) router.push('/login');
  }, [redirectLogin]);

  onAuthStateChanged(firebaseAuth, async (currentUser) => {
    if (!currentUser) setRedirectLogin(true);
    if (!userInfo && currentUser?.email) {
      const response: IndexedObject = await authApi.checkUser(currentUser.email);
      if (!response.data.status) {
        router.push('/login');
      }
      const { id, name, email, profilePicture: profileImage, status } = response.data.data;
      dispatch({
        type: reducerCases.SET_USER_INFO,
        userInfo: {
          id,
          name,
          email,
          profileImage,
          status,
        },
      });
    }
  });

  useEffect(() => {
    const getMessages = async () => {
      const { data } = await messageApi.getMessages({
        from: userInfo?.id,
        to: currentChatUser?.id,
      });
      dispatch({ type: reducerCases.SET_MESSAGES, messages: data.messages });
    };

    if (currentChatUser?.id) {
      getMessages();
    }
  }, [currentChatUser]);

  console.log('messages', messages);

  return (
    <div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-y-auto">
      <ChatList />
      {currentChatUser ? <Chat /> : <Empty />}
    </div>
  );
}

export default Main;
