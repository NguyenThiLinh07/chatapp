import React, { useState } from 'react';
import { useStateProvider } from '@/context/StateContext';
import Input from '@/components/common/Input';
import Avatar from '@/components/common/Avatar';

function onboarding() {
  // @ts-ignore
  const [{ userInfo }] = useStateProvider();
  const [name, setName] = useState(userInfo?.name ?? '');
  const [about, setAbout] = useState('');
  const [image, setImage] = useState('/default_avatar.png');

  const onboardUserHandler = async () => {
    if (validateDetails()) {
      const email = userInfo.email;
      try {
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
      <div className="flex items-center justify-center gap-2 mb-20">
        {/*<Image src="/login.gif" alt="img" height={300} width={300} className="rounded-lg" />*/}
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
