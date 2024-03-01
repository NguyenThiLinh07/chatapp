import React, { useEffect, useState } from 'react';
import { useStateProvider } from '@/context/StateContext';
import Input from '@/components/common/Input';
import Avatar from '@/components/common/Avatar';
import { authApi } from '@/api/authApi';
import { IndexedObject } from '@/types/common';
import { useRouter } from 'next/navigation';
import { reducerCases } from '@/context/constants';
import Image from 'next/image';

function onboarding() {
  // @ts-ignore
  const [{ userInfo, newUser }, dispatch] = useStateProvider();
  const router = useRouter();
  const [name, setName] = useState(userInfo?.name ?? '');
  const [about, setAbout] = useState('');
  const [image, setImage] = useState<string>(userInfo?.image ?? '/default_avatar.png');

  useEffect(() => {
    if (!newUser && !userInfo?.email) return router.push('/login');
    else if (!newUser && userInfo?.email) return router.push('/');
  }, [userInfo, newUser, router]);

  const onboardUserHandler = async () => {
    if (validateDetails()) {
      const email = userInfo.email;
      try {
        const data = { name, email, about, image };
        const response: IndexedObject = await authApi.onBoarUser(data);
        if (response.data.status) {
          dispatch({
            type: reducerCases.SET_NEW_USER,
            newUser: false,
          });
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              ...userInfo,
              image,
              name,
              status: about,
              id: response.data.id,
            },
          });
          router.push('/');
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const validateDetails = () => {
    return name.length >= 3;
  };

  return (
    <div className="bg-panel-header-background h-screen w-screen text-white flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-2 mb-10 flex-col">
        <Image src="/app.webp" alt="img" height={200} width={200} className="rounded-lg" />
        <span className="text-7xl font-bold">Chat-app</span>
      </div>
      <h2 className="text-2xl">Create your profile</h2>
      <div className="flex gap-6 mt-6">
        <div className="flex flex-col items-center justify-center mt-5 gap-6">
          <Input name="Display name" state={name} setState={setName} label />
          <Input name="About" state={about} setState={setAbout} label />
          <div className="flex items-center justify-center" onClick={onboardUserHandler}>
            <button className="bg-gray-900 px-4 py-3 rounded-lg cursor-pointer">
              Create profile
            </button>
          </div>
        </div>
        <div>
          <Avatar type="xl" image={image} setImage={setImage} />
        </div>
      </div>
    </div>
  );
}

export default onboarding;
