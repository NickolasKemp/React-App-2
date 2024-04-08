import React from 'react';
import SingleBoardPageHeader from '../SingleBoardPageHeader';
import Lists from '../Lists';
import { useParams } from 'react-router-dom';
import { useBoard } from '../../hooks/board/useBoard';

const SingleBoardPage = () => {
  const {id} = useParams()
  const {board} = useBoard(id || "")

  return (
    <>
    {
      (id && board) &&
        <div>
          <SingleBoardPageHeader board={board} id={id} />
          <Lists board={board} id={id} />
        </div>
    }
    </>

  );
};

export default SingleBoardPage;