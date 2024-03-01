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

function Main() {
  const router = useRouter();
  // @ts-ignore
  const [{ userInfo }, dispatch] = useStateProvider();
  const [redirectLogin, setRedirectLogin] = useState<boolean>(false);

  useEffect(() => {
    if (redirectLogin) router.push('/login');
  }, [redirectLogin]);

  onAuthStateChanged(firebaseAuth, async (currentUser) => {
    if (!currentUser) setRedirectLogin(true);
    if (userInfo && currentUser?.email) {
      const response: IndexedObject = await authApi.checkUser(currentUser.email);
      if (!response.data.status) {
        router.push('/login');
      }
      const { id, name, email, profilePicture: image, status } = response.data.data;
      dispatch({
        type: reducerCases.SET_USER_INFO,
        userInfo: {
          id,
          name,
          email,
          image,
          status,
        },
      });
    }
  });

  return (
    <div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-y-auto">
      <ChatList />
      {/* <Empty /> */}
      <Chat />
    </div>
  );
}

export default Main;
