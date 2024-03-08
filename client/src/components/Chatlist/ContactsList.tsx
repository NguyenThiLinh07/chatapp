import React, { useEffect } from 'react';
import { useStateProvider } from '@/context/StateContext';
import { TUser } from '@/types/user';
import { authApi } from '@/api/authApi';
import { reducerCases } from '@/context/constants';
import { BiArrowBack, BiSearchAlt2 } from 'react-icons/bi';
import ChatLIstItem from '@/components/Chatlist/ChatLIstItem';

function ContactsList() {
  // @ts-ignore
  const [{ contacts }, dispatch] = useStateProvider();

  useEffect(() => {
    const getContacts = async () => {
      await authApi.getAllContacts().then((response) => {
        dispatch({ type: reducerCases.SET_CONTACTS, contacts: response.data.users });
      });
    };

    getContacts();
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="h-24 flex items-end px-3 py-4">
        <div className="flex items-center gap-12 text-white">
          <BiArrowBack
            className="cursor-pointer text-xl"
            onClick={() => dispatch({ type: reducerCases.SET_SHOW_CONTACTS_PAGE })}
          />
          <span>New Chat</span>
        </div>
      </div>
      <div className="bg-search-input-container-background h-full flex-auto overflow-auto custom-scrollbar">
        <div className="flex py-3 items-center gap-3 h-14">
          <div className="bg-panel-header-background flex items-center gap-5 px-3 py-1 rounded-lg flex-grow">
            <div>
              <BiSearchAlt2 className="text-panel-header-icon cursor-pointer text-l" />
            </div>
            <div className="w-full">
              <input
                type="text"
                placeholder="Search Contacts"
                className="bg-transparent text-sm focus:outline-none text-white w-full"
              />
            </div>
          </div>
        </div>
        {Object.entries(contacts).map(([initialLetter, userList]) => {
          return (
            <div key={Date.now() + initialLetter}>
              <div className="text-teal-light pl-10 py-5">{initialLetter}</div>
              {(userList as Array<TUser>).map((contact: TUser) => (
                <ChatLIstItem data={contact} isShowContactPage={true} key={contact?.id} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ContactsList;
