import React from 'react';
import '../../UIComponentsStyle.css'
import { useOutside } from '../../hooks/useOutside';
import EllipsisBtn from './buttons/EllipsisBtn';
import EditListModal from './EditListModal';
import Button from './buttons/Button';
import { IListResponse } from '../../types/list.types';
import { defaultTask, ITaskResponse } from 'src/types/task.types';
import { useCreateTask } from '../../hooks/task/useCreateTask';
import { useCreateHistoryMessage } from '../../hooks/useCreateHistoryMessage';
import { useDeleteList } from '../../hooks/list/useDeleteList';

interface ListActionsProps {
  list: IListResponse
  currentListTasks?: ITaskResponse[]
}

function ListActions({ list, currentListTasks }: ListActionsProps) {
  const {ref, isShow, setIsShow} = useOutside(false)
  const {createTask} = useCreateTask()
  const { createHistoryMessage } = useCreateHistoryMessage()
  const {deleteList} = useDeleteList()

  const handleCreatingTask = () => {
    createTask({...defaultTask, status: list.label, listId: list.id})
      .then((data: any) => {
        createHistoryMessage(`You added a new task to "${list.label}"`, data.data.id);
      })
      .catch((error) => {
        console.error("Error creating task:", error);
      })
  }

  const handleDeletingList = () => {
    deleteList(list.id)
  }

  return (
    <div ref={ref} className={`options-modal`}>
        <EllipsisBtn onClick={() => setIsShow(!isShow)} />
      <div className={`options-modal__options-list ${isShow ? 'active' : ''}`}>
        <EditListModal id={list.id} currentListTasks={currentListTasks} >
          <Button btnType='edit' >Edit</Button>
        </EditListModal>
        <Button onClick={handleCreatingTask} btnType='create' >Add new card</Button>
        <Button onClick={handleDeletingList} btnType='delete'>Delete</Button>
      </div>
    </div>
  )
}

export default ListActions;
