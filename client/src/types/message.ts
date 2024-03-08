export type TCreateMessage = {
  id?: number;
  from?: number;
  to?: number;
  message?: string;
};

export type TMessage = {
  id?: string;
  message?: string;
  messageStatus?: string;
  recieverId?: string;
  senderId?: string;
  type?: string;
  createdAt?: string;
};
