import React from 'react';
import BoardsPageHeader from '../BoardsPageHeader';
import { useBoards } from '../../hooks/board/useBoards';
import BoardCard from '../ui/BoardCard';

const BoardsPage = () => {
  const {boards} = useBoards()

  return (
    <div>
      <BoardsPageHeader/>
      <div className="flex items-center gap-10">
        {boards?.map(board => <BoardCard board={board}/>)}
      </div>
      <div className='max-w-4'>
      </div>
    </div>
  );
};

export default BoardsPage;