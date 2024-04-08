import type { IMessageResponse, TypeMessageFormState } from '../types/message.types';
import { axiosInstance } from '../api/interceptors';

class MessageService  {
  private BASE_URL = 'message'

  async getMessages() {
    const response = await axiosInstance.get<IMessageResponse[]>(this.BASE_URL)
    return response
  }

  async getMessagesByBoardId(boardId: string) {
    const response = await axiosInstance.get<IMessageResponse[]>(`${this.BASE_URL}/board/${boardId}`);
    return response;
  }

  async createMessage(data: TypeMessageFormState) {
    const response = await axiosInstance.post(this.BASE_URL, data)
    return response
  }

  async updateMessage(id: string, data: TypeMessageFormState) {
    const response = await axiosInstance.put(`${ this.BASE_URL }/${id}`, data)
    return response
  }

  async deleteMessage(id: string) {
    const response = await axiosInstance.delete(`${ this.BASE_URL }/${id}`)
    return response
  }
}

export const messageService = new MessageService()