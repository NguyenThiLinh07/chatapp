import { reducerCases } from '@/context/constants';
import { TUser } from '@/types/user';
import { TMessage } from '@/types/message';

type InitialState = {
  userInfo: TUser;
  newUser: boolean;
  showContactsPage: boolean;
  contacts: TUser[];
  currentChatUser: TUser;
  messages: TMessage[];
};

export const initialState: InitialState = {
  userInfo: undefined,
  newUser: false,
  showContactsPage: false,
  contacts: [],
  currentChatUser: undefined,
  messages: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_USER_INFO:
      return {
        ...state,
        userInfo: action.userInfo,
      };
    case reducerCases.SET_NEW_USER:
      return {
        ...state,
        newUser: action.newUser,
      };
    case reducerCases.SET_SHOW_CONTACTS_PAGE:
      return {
        ...state,
        showContactsPage: !state.showContactsPage,
      };
    case reducerCases.SET_CONTACTS: {
      return {
        ...state,
        contacts: action.contacts,
      };
    }
    case reducerCases.CHANGE_CURRENT_USER:
      return {
        ...state,
        currentChatUser: action.user,
      };
    case reducerCases.SET_MESSAGES:
      return {
        ...state,
        messages: action.messages,
      };
    default:
      return state;
  }
};

export default reducer;
