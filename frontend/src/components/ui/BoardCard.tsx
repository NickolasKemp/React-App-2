import React from 'react';
import { IBoardResponse } from 'src/types/board.types';
import { Link, redirect } from "react-router-dom"
import BoardActions from '../actions/board/BoardActions';


interface BoardCardProps {
  board: IBoardResponse
}

const BoardCard = ({board}: BoardCardProps) => {
  return (
    <div className='relative'>
      <BoardActions className='absolute h-full right-1 top-1' boardId={board.id}/>
      <Link to={`board/${board.id}`}>
        <div id={board.id} className='p-10 border rounded-xl border-slate-400 cursor-pointer' >
          <h2 className="text-xl font-semibold" >{board.title}</h2>
        </div>
      </Link>
    </div >
  );
};

export default BoardCard;