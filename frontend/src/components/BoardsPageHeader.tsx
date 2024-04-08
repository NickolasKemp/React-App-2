import React, { useEffect, useState } from 'react';
import { useCreateBoard } from '../hooks/board/useCreateBoard';
import HeaderBtn from './ui/buttons/HeaderBtn';
import Plus from './ui/icons/Plus';

const BoardsPageHeader = () => {
  const {createBoard, response} = useCreateBoard()
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
   const  handleCreatingBoard = () => {
   createBoard({title: "Untitled"})
  }

  useEffect(() => {
    if(response) {
      setRedirectUrl(`board/${response?.data.id}`)
    }
  }, [response]);

  useEffect(() => {
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  }, [redirectUrl]);

  return (
    <div className="header">
      <h2 className="header__title text-2xl font-bold">Your boards</h2>
      <div className="header__actions actions-header">
        <HeaderBtn onClick={handleCreatingBoard} icon={<Plus/>} primary={false}>
          Create new board
        </HeaderBtn>
      </div>
    </div>
  );
};

export default BoardsPageHeader;