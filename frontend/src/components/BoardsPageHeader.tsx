import React from 'react';
import NewListModal from './ui/NewListModal';
import { useCreateBoard } from '../hooks/board/useCreateBoard';

const BoardsPageHeader = () => {
  const {createBoard} = useCreateBoard()
  const handleCreatingBoard = () => {
    createBoard({title: "Untitled"})
  }

  return (
    <div className="header">
      <h2 className="header__title text-2xl font-bold">Your boards</h2>
      <div className="header__actions actions-header">
        <NewListModal onClick={handleCreatingBoard} >
          <span className="actions-header__list header-action">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                 stroke="currentColor" className="w-3 h-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Create board
          </span>
        </NewListModal>
      </div>
    </div>
  );
};

export default BoardsPageHeader;