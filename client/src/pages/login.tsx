import React from 'react';
import Image from 'next/image';
import loginImage from '../../public/login.jpg';
function login() {
  return (
    <div className="bg-white h-screen w-screen text-base flex flex-row">
      <div className="flex m-auto mt-[100px]">
        <div className="bg-white p-6 rounded-lg w-[800px] relative shadow-shadow8">
          <div className="w-full absolute h-[150px]">
            <Image
              src={loginImage}
              alt="imgLogin"
              className="w-[150px] h-[150px] rounded-full object-cover border-[6px]"
            />
          </div>
          <h2 className="uppercase text-center font-bold text-2xl text-primary drop-shadow-lg">
            login
          </h2>
        </div>
      </div>
    </div>
  );
}

export default login;
