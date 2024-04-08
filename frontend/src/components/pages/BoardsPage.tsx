import React from 'react';
import BoardsPageHeader from '../BoardsPageHeader';
import { useBoards } from '../../hooks/board/useBoards';
import { IBoardResponse } from '../../types/board.types';
import Board from '../Board';


const BoardsPage = () => {
  const { boards} = useBoards()

  return (
    <div>
      <BoardsPageHeader />
      <div className="flex items-center gap-10 flex-wrap pt-8 ">
        {boards?.length ?
          boards.map((board: IBoardResponse) => <Board key={board.id} board={board} />)
          : <h2 className="_nodata-title">There are no boards. Create one</h2>
        }
      </div>

    </div>
  );
};

export default BoardsPage;