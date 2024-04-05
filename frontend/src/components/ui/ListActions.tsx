import React from 'react';
import '../../UIComponentsStyle.css'
import { useOutside } from '../../hooks/useOutside';
import EllipsisBtn from './buttons/EllipsisBtn';
import EditListModal from './EditListModal';
import Button from './buttons/Button';
import { IListResponse } from '../../types/list.types';

interface ListActionsProps {
  listId: string
  currentListTasks: IListResponse[]
}

function ListActions({ listId, currentListTasks }: ListActionsProps) {
  const {ref, isShow, setIsShow} = useOutside(false)

  //add function from list createNewTask, removeList

  return (
    <div ref={ref} className={`options-modal`}>
        <EllipsisBtn onClick={() => setIsShow(!isShow)} />
      <div className={`options-modal__options-list ${isShow ? 'active' : ''}`}>
        <EditListModal id={listId} currentListTasks={currentListTasks} >
          <Button btnType='edit' >Edit</Button>
        </EditListModal>
        <Button onClick={createNewTask} btnType='create' >Add new card</Button>
        <Button onClick={removeList} btnType='delete'>Delete</Button>
      </div>
    </div>
  )
}

export default ListActions;
