import React, { Dispatch, SetStateAction } from 'react';
import '../../UIComponentsStyle.css'
import { useOutside } from '../../hooks/useOutside';
import EllipsisBtn from './buttons/EllipsisBtn';
import Button from './buttons/Button';
import {ITaskResponse } from 'src/types/task.types';
import { useDeleteTask } from '../../hooks/task/useDeleteTask';
import { useCreateHistoryMessage } from '../../hooks/useCreateHistoryMessage';
import { IListResponse } from '../../types/list.types';


interface TaskActionsProps {
  task: ITaskResponse
  list: IListResponse
  setIsShowActions: Dispatch<SetStateAction<boolean>>
}

function ListActions({ task, list, setIsShowActions}: TaskActionsProps) {
  const {ref, isShow, setIsShow} = useOutside(false)
  const {deleteTask, isDeletePending} = useDeleteTask()
  const { createHistoryMessage } = useCreateHistoryMessage()

  const handleDeletingTask = () => {
    deleteTask(task.id)
    createHistoryMessage(`You deleted task <span>${task.name}</span> from "${list.label}"`, task.id)
  }

  const handleEditingTask = () => {
    setIsShowActions(true)
  }

  return (
    <div ref={ref} className={`options-modal`}>
        <EllipsisBtn onClick={() => setIsShow(!isShow)} />
      <div className={`options-modal__options-list ${isShow ? 'active' : ''}`}>
        <Button btnType='edit' id={task?.id} onClick={handleEditingTask}>Edit</Button>
        <Button btnType='delete' id={task?.id} onClick={handleDeletingTask}>Delete</Button>
      </div>
    </div>
  )
}

export default ListActions;
