import React, { useState } from 'react';
import Image from 'next/image';
import { useStateProvider } from '@/context/StateContext';
import Input from '@/components/common/Input';

function onboarding() {
  // @ts-ignore
  const [{ userInfo }] = useStateProvider();
  const [name, setName] = useState(userInfo?.name ?? '');
  const [about, setAbout] = useState('');
  const [image, setImage] = useState('/default_avatar.png');

  return (
    <div className="bg-panel-header-background h-screen w-screen text-white flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-2">
        <Image src="/login.gif" alt="img" height={300} width={300} className="rounded-lg" />
        <span className="text-7xl">Chat-app</span>
      </div>
      <h2 className="text-2xl">Create your profile</h2>
      <div className="flex gap-6 mt-6">
        <div className="flex flex-col items-center justify-center mt-5 gap-6">
          <Input name="Display name" state={name} setState={setName} label />
          <Input name="About" state={about} setState={setAbout} label />
        </div>
      </div>
    </div>
  );
}

export default onboarding;
