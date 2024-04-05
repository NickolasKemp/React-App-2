import type { IListResponse, TypeListFormState } from '../types/list.types';
import { axiosInstance } from '../api/interceptors';

class ListService  {
  private BASE_URL = '/list'

  async getLists() {
    const response = await axiosInstance.get<IListResponse[]>(this.BASE_URL)
    return response
  }

  async getListsByBoardId(boardId: string) {
    const response = await axiosInstance.get<IListResponse[]>(`${this.BASE_URL}/board/${boardId}`);
    return response;
  }

  async createList(data: TypeListFormState) {
    const response = await axiosInstance.post(this.BASE_URL, data)
    return response
  }

  async updateList(id: string, data: TypeListFormState) {
    const response = await axiosInstance.put(`${ this.BASE_URL }/${id}`, data)
    return response
  }

  async deleteList(id: string) {
    const response = await axiosInstance.delete(`${ this.BASE_URL }/${id}`)
    return response
  }
}

export const listService = new ListService()