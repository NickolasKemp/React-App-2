import { IListResponse } from './list.types';
import { IBase } from './root.types';

export interface IBoardResponse extends IBase {
  title: string
  lists: IListResponse[]
}

export type TypeBoardFormState = Partial<Omit<IBoardResponse, 'id' | 'updatedAt' >>;