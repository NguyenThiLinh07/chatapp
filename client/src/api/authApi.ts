import { axiosClient } from '@/api/axiosClient';
import { TUser } from '@/types/user';

export const authApi = {
  checkUser: (email: string) => {
    const url = `/auth/check-user`;
    return axiosClient.post(url, { email });
  },
  onBoarUser: (data: TUser) => {
    const url = `/auth/onBoard-user`;
    return axiosClient.post(url, data);
  },
};
