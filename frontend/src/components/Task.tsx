import React from 'react';
import TaskModal from './TaskModal';
import ListActions from './ui/ListActions';
import DropDownList from './ui/DropDownList';
import { useDeleteTask } from '../hooks/task/useDeleteTask';
import { useOutside } from '../hooks/useOutside';
import { useUpdateTask } from '../hooks/task/useUpdateTask';
import { useCreateHistoryMessage } from '../hooks/useCreateHistoryMessage';
import { IListResponse } from '../types/list.types';
import { useLists } from '../hooks/list/useLists';
import { ITaskResponse } from '../types/task.types';
import Button from './ui/buttons/Button';

interface TaskProps {
  task: ITaskResponse
  list: IListResponse
  lists: IListResponse[]
}

const Task = ({task, list, lists}: TaskProps) => {
  const { createHistoryMessage } = useCreateHistoryMessage()
  const {deleteTask, isDeletePending} = useDeleteTask()
  const { ref, isShow, setIsShow } = useOutside(false)
  const { updateTask} = useUpdateTask()

  function editTask() {
    setIsShow(true)
  }

  function removeTask() {
    deleteTask(task.id)
    createHistoryMessage(`You deleted task <span>${task.name}</span> from "${list.label}"`, task.id)
  }

  function changeList(newListLabel: IListResponse['label'], newListId: IListResponse['id']) {
    if (task.listId !== newListId) {
      const updatedTask = {
        name: task.name,
        description: task.description,
        priority: task.priority || undefined,
        dueDate: task.dueDate,
        listId: newListId
      }

      // unsolved: how to execute createHistoryMessage only on success update
      updateTask({
        id: task.id,
        data: updatedTask,
      })
      createHistoryMessage(`You moved task <span>${task.name}</span> from "${list.label}" to "${newListLabel}"`, task.id)

    }
  }

  return (
    <div key={task.id} className="task">
      { isShow && <TaskModal list={list} item={task} taskModalRef={ref} setIsShow={setIsShow} />}
      <div className="task__name-container">
        <h4 className="task__name">{task.name}</h4>
        <ListActions>
          <Button btnType='edit' id={task.id} onClick={editTask}>Edit</Button>
          <Button btnType='delete' id={task.id} onClick={removeTask}>Delete</Button>
        </ListActions>
      </div>
      <p className='task__description'>
        {task.description}
      </p>
      <p className="task__date _calendar">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
             stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
        </svg>
        {task.dueDate ? task.dueDate : "not defined" }
      </p>
      <div>
        <div className="task__priority">{task.priority ? task.priority : 'not defined'}</div>
      </div>
      <DropDownList>
        {lists?.map((list: IListResponse) => <button id={task.id} key={list.id} onClick={() => changeList(list.label, list.id)}>{list.label}</button>)}
      </DropDownList>
    </div>
  )
}

export default Task;