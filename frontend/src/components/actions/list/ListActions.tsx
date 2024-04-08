import React from 'react';
import '../../../UIComponentsStyle.css'
import { useOutside } from '../../../hooks/useOutside';
import EllipsisBtn from '../../ui/buttons/EllipsisBtn';
import ActionsBtn from '../../ui/buttons/ActionsBtn';
import { IListResponse } from '../../../types/list.types';
import { defaultTask, ITaskResponse } from 'src/types/task.types';
import { useCreateTask } from '../../../hooks/task/useCreateTask';
import { useCreateHistoryMessage } from '../../../hooks/message/useCreateHistoryMessage';
import { useDeleteList } from '../../../hooks/list/useDeleteList';

interface ListActionsProps {
  list: IListResponse
  currentListTasks?: ITaskResponse[]
  boardId: string
  inputParentRef: any
}

function ListActions({ list, currentListTasks, boardId, inputParentRef }: ListActionsProps) {
  const {ref, isShow, setIsShow} = useOutside(false)
  const {createTask} = useCreateTask()
  const { createHistoryMessage } = useCreateHistoryMessage()
  const {deleteList} = useDeleteList()

  const handleCreatingTask = () => {
    createTask({...defaultTask, status: list.label, listId: list.id})
      .then((data: any) => {
        createHistoryMessage({
          message:`You added a new task to "${list.label}"`,
          taskId: data.data.id,
          boardId: boardId
      })
      })
      .catch((error) => {
        console.error("Error creating task:", error)
      })
  }

  const handleDeletingList = () => {
    deleteList(list.id)
  }
  function handleEditingList() {
    const input = inputParentRef.current.querySelector('input')
    if (input) {
      input.focus();
      input.select();
    }
    setIsShow(false)
  }

  return (
    <div ref={ref} className={`options-modal`}>
        <EllipsisBtn color='black' onClick={() => setIsShow(!isShow)} />
      <div className={`options-modal__options-list ${isShow ? 'active' : ''}`}>
        <ActionsBtn onClick={handleEditingList} btnType='edit' >Edit</ActionsBtn>
        <ActionsBtn onClick={handleCreatingTask} btnType='create' >Add new card</ActionsBtn>
        <ActionsBtn onClick={handleDeletingList} btnType='delete'>Delete</ActionsBtn>
      </div>
    </div>
  )
}

export default ListActions;
