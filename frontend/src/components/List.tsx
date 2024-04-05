import React from 'react';
import ListActions from './ui/ListActions';
import 'react-day-picker/dist/style.css';
import Tasks from './Tasks';
import EditListModal from './ui/EditListModal';
import { useCreateTask } from '../hooks/task/useCreateTask';
import { useCreateHistoryMessage } from '../hooks/useCreateHistoryMessage';
import { useDeleteList } from '../hooks/list/useDeleteList';
import { IListResponse } from 'src/types/list.types';
import { useCurrentListTasks } from '../hooks/task/useCurrentListTasks';
import { defaultTask } from '../types/task.types';
import { useParams } from 'react-router-dom';
import Button from './ui/buttons/Button';
interface ListProps {
  list: IListResponse
  lists: IListResponse[]
}

const List  = ({list, lists}: ListProps) => {
  const { currentListTasks } = useCurrentListTasks(list.id)
  const {createTask} = useCreateTask()
  const { createHistoryMessage } = useCreateHistoryMessage()
  function handleCreatingTask() {
    createTask({...defaultTask, status: list.label, listId: list.id})
      .then((data: any) => {
        createHistoryMessage(`You added a new task to "${list.label}"`, data.data.id);
      })
      .catch((error) => {
        console.error("Error creating task:", error);
      })
  }

  return (
      <div className="list">
        <div className="list__title title-list">
          <h3>{list.label}</h3>
          <div className="title-list__actions">
            <span>{currentListTasks?.length}</span>
            <ListActions list={list} currentListTasks={currentListTasks} />
          </div>
        </div>
        <button onClick={handleCreatingTask} className="list__button">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
               stroke="currentColor" className="w-3 h-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add new task
        </button>
        <Tasks list={list} lists={lists} items={currentListTasks} />
      </div>
  );
};

export default List;