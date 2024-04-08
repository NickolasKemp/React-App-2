import React from 'react';
import { useOutside } from 'src/hooks/useOutside';
import EllipsisBtn from '../../ui/buttons/EllipsisBtn';
import ActionsBtn from '../../ui/buttons/ActionsBtn';
import { useDeleteBoard } from '../../../hooks/board/useDeleteBoard';

interface BoardActionsProps {
  boardId: string
  className?: string
}

function BoardActions( { boardId, className }: BoardActionsProps) {
  const {ref, isShow, setIsShow} = useOutside(false)
  const {deleteBoard} = useDeleteBoard()
  const handleDelete =() => {
    deleteBoard(boardId)
    window.location.reload()
  }

  function handleToggle() {
    setIsShow(!isShow)
  }

  return (
    <div className={className} >
      <EllipsisBtn color='black' onClick={handleToggle} />
      <div ref={ref} className={`options-modal`}>
        <div className={`options-modal__options-list ${isShow ? 'active' : ''}`}>
          <ActionsBtn onClick={handleDelete} btnType='delete'>Delete</ActionsBtn>
        </div>
      </div>
    </div>
  )
}

export default BoardActions;
