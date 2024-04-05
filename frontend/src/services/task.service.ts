import type { ITaskResponse, TypeTaskFormState } from '../types/task.types';

import { axiosInstance } from '../api/interceptors';

class TaskService  {
  private BASE_URL = '/task'

  async getTasks() {
    const response = await axiosInstance.get<ITaskResponse[]>(this.BASE_URL)
    return response
  }

  async createTask(data: TypeTaskFormState) {
    const response = await axiosInstance.post(this.BASE_URL, data)
    return response
  }

  async updateTask(id: string, data: TypeTaskFormState) {
    const response = await axiosInstance.put(`${ this.BASE_URL }/${id}`, data)
    return response
  }

  async deleteTask(id: string) {
    const response = await axiosInstance.delete(`${ this.BASE_URL }/${id}`)
    return response
  }
}

export const taskService = new TaskService()