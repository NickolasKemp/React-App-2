import { IBase } from "./root.types"

export interface IMessageResponse extends IBase {
  message: string,
  taskId: string
  boardId: string
}

export type TypeMessageFormState = Partial<Omit<IMessageResponse, 'id' | 'updatedAt' >>;
