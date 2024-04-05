import React from 'react';
import { useOutside } from 'src/hooks/useOutside';
import EllipsisBtn from '../../ui/buttons/EllipsisBtn';
import Button from '../../ui/buttons/Button';
import { useDeleteBoard } from '../../../hooks/board/useDeleteBoard';

interface BoardActionsProps {
  boardId: string
  className?: string
}

function BoardActions( { boardId, className }: BoardActionsProps) {
  const {ref, isShow, setIsShow} = useOutside(false)
  const {deleteBoard} = useDeleteBoard()
  function handleDelete() {
    deleteBoard(boardId)
    setIsShow(false)
  }

  function handleToggle() {
    setIsShow(!isShow)
  }

  return (
    <div className={className} >
      <EllipsisBtn onClick={handleToggle} />
      <div ref={ref} className={`options-modal`}>
        <div className={`options-modal__options-list ${isShow ? 'active' : ''}`}>
          <Button onClick={handleDelete} btnType='delete'>Delete</Button>
        </div>
      </div>
    </div>
  )
}

export default BoardActions;
