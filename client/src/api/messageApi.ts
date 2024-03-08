import { axiosClient } from '@/api/axiosClient';
import { TCreateMessage } from '@/types/message';

const messageApi = {
  addMessage: (data: TCreateMessage) => {
    const url = `/messages/add-message`;
    return axiosClient.post(url, data);
  },
  getMessages: (params: { from: number; to: number }) => {
    const url = `/messages/get-messages/${params.from}/${params.to}`;
    return axiosClient.get(url);
  },
};

export default messageApi;
