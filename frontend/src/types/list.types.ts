import { IBase } from './root.types';
import { ITaskResponse } from './task.types';

export interface IListResponse extends IBase {
  boardId: string
  label: string
  tasks: ITaskResponse[]
}

export type TypeListFormState = Partial<Omit<IListResponse, 'id' | 'updatedAt' >>;