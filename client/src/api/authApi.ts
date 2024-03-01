import { axiosClient } from '@/api/axiosClient';

export const authApi = {
  checkUser: (email: string) => {
    const url = `/auth/check-user`;
    return axiosClient.post(url, { email });
  },
};
