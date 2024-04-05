
import { IBase } from './root.types';
export enum EnumTaskPriority {
  low = 'low',
  medium = 'medium',
  high = 'high'
}

export const priorities = [EnumTaskPriority.low, EnumTaskPriority.medium, EnumTaskPriority.high]


export interface ITaskResponse extends IBase {
  listId: string
  name: string
  priority?: EnumTaskPriority
  description: string
  status: string
  dueDate: string
}

export type TypeTaskFormState = Partial<Omit<ITaskResponse, 'id' | 'updatedAt' >>

export const defaultTask = {
  name: 'Untitled',
  dueDate: "",
  description: "",
  status: "",
  priority: undefined,
  listId: undefined
}