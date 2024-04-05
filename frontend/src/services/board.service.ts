import { axiosInstance } from '../api/interceptors';
import { IBoardResponse, TypeBoardFormState } from '../types/board.types';

class BoardService  {
  private BASE_URL = '/board'

  async getBoards() {
    const response = await axiosInstance.get<IBoardResponse[]>(this.BASE_URL)
    return response
  }

  async getBoardById(id: string) {
    const response = await axiosInstance.get<IBoardResponse>(`${this.BASE_URL}/${id}`);
    return response;
  }

  async createBoard(data: TypeBoardFormState) {
    const response = await axiosInstance.post(this.BASE_URL, data)
    return response
  }

  async updateBoard(id: string, data: TypeBoardFormState) {
    const response = await axiosInstance.put(`${ this.BASE_URL }/${id}`, data)
    return response
  }

  async deleteBoard(id: string) {
    const response = await axiosInstance.delete(`${ this.BASE_URL }/${id}`)
    return response
  }
}

export const boardService = new BoardService()