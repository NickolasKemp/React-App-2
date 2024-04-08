import React from 'react';
import List from './List';
import { IListResponse } from '../types/list.types';
import { useListsByBoardId } from '../hooks/list/useListsByBoardId';
import { IBoardResponse } from '../types/board.types';

interface ListsProps {
  board: IBoardResponse
  id: string
}

const Lists = ({ board, id }: ListsProps) => {
  const { lists} = useListsByBoardId(id) || []
  return (
    <div>
      <div className="lists-container">
        {
          lists?.length ?
            lists.map((list: IListResponse) =>
              <List key={list.id} list={list} lists={lists} board={board} />
            )
            : <h3 className="_nodata-title">There are not lists. Create one</h3>
        }
      </div>
    </div>

  )
}

export default Lists;