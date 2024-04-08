import React from 'react';
import { IBoardResponse } from 'src/types/board.types';
import { Link } from "react-router-dom"
import BoardActions from './actions/board/BoardActions';
import BoardCard from './ui/cards/BoardCard';
import { useLists } from '../hooks/list/useLists';

interface BoardCardProps {
  board: IBoardResponse
}

const Board = ({board}: BoardCardProps) => {
  const {lists } = useLists()

  return (
    <div className='relative'>
      <BoardActions className='absolute right-1 top-1 z-10' boardId={board.id}/>
      <Link to={`board/${board.id}`}>
        <BoardCard
          title={board.title}
          id={board.id}
        />
      </Link>
    </div>

  )
}

export default Board;