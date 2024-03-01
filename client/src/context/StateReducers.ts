import { reducerCases } from '@/context/constants';
import { TUser } from '@/types/user';

type InitialState = {
  userInfo: TUser;
  newUser: boolean;
};

export const initialState: InitialState = {
  userInfo: {},
  newUser: false,
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
    default:
      return state;
  }
};

export default reducer;
