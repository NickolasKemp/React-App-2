import React, { Dispatch, SetStateAction } from 'react';
import '../../../UIComponentsStyle.css'
import { useOutside } from '../../../hooks/useOutside';
import EllipsisBtn from '../../ui/buttons/EllipsisBtn';
import ActionsBtn from '../../ui/buttons/ActionsBtn';
import {ITaskResponse } from 'src/types/task.types';
import { useDeleteTask } from '../../../hooks/task/useDeleteTask';
import { useCreateHistoryMessage } from '../../../hooks/message/useCreateHistoryMessage';
import { IListResponse } from '../../../types/list.types';
import { useLockOverflow } from '../../../hooks/useLockOverflow';

interface TaskActionsProps {
  task: ITaskResponse
  list: IListResponse
  setIsShowActions: Dispatch<SetStateAction<boolean>>,
  boardId: string
}

function ListActions({ task, list, setIsShowActions, boardId}: TaskActionsProps) {
  const {ref, isShow, setIsShow} = useOutside(false)
  const {deleteTask, isDeletePending} = useDeleteTask()
  const { createHistoryMessage } = useCreateHistoryMessage()
  const { lockOverflow, unLockOverflow } = useLockOverflow()


  const handleDeletingTask = () => {
    deleteTask(task.id)
    createHistoryMessage({
      message: `You deleted task <span>${task.name}</span> from "${list.label}"`,
      taskId: task.id,
      boardId: boardId
  })
  }

  const handleEditingTask = () => {
    setIsShowActions(true)
  }

  return (
    <div ref={ref} className={`options-modal`}>
        <EllipsisBtn color='black' onClick={() => setIsShow(!isShow)} />
      <div className={`options-modal__options-list ${isShow ? 'active' : ''}`}>
        <ActionsBtn btnType='edit' id={task?.id} onClick={handleEditingTask}>Edit</ActionsBtn>
        <ActionsBtn btnType='delete' id={task?.id} onClick={handleDeletingTask}>Delete</ActionsBtn>
      </div>
    </div>
  )
}

export default ListActions;
