import React, { useEffect, useState } from 'react';
import { useCreateBoard } from '../hooks/board/useCreateBoard';
import { redirect } from 'react-router-dom';

const BoardsPageHeader = () => {
  const {createBoard, response} = useCreateBoard()
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
   const  handleCreatingBoard =  () => {
   createBoard({title: "Untitled"})
    if(response) {
      console.log('you was redirected')
      // redirect(`board/${response?.data.id}`)

    }
  }

  // useEffect(() => {
  //   // redirect(`board/${response?.data.id}`)
  //   if(response) {
  //     setRedirectUrl(`board/${response?.data.id}`)
  //   }
  // }, [response]);
  //
  // useEffect(() => {
  //   if (redirectUrl) {
  //     window.location.href = redirectUrl;
  //   }
  // }, [redirectUrl]);

  return (
    <div className="header">
      <h2 className="header__title text-2xl font-bold">Your boards</h2>
      <div className="header__actions actions-header">
          <button onClick={handleCreatingBoard} className="actions-header__list header-action" >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                   stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            <span>Create board</span>
          </button>
      </div>
    </div>
  );
};

export default BoardsPageHeader;