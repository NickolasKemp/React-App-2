import React from 'react';
import TaskModal from './modals/TaskModal';
import DropDownList from './ui/DropDownList';
import { useOutside } from '../hooks/useOutside';
import { useUpdateTask } from '../hooks/task/useUpdateTask';
import { useCreateHistoryMessage } from '../hooks/message/useCreateHistoryMessage';
import { IListResponse } from '../types/list.types';
import { ITaskResponse } from '../types/task.types';
import TaskActions from './actions/task/TaskActions';
import { IBoardResponse } from '../types/board.types';
import TaskCard from './ui/cards/TaskCard'
interface TaskProps {
  task: ITaskResponse
  list: IListResponse
  lists: IListResponse[]
  board: IBoardResponse
}

const Task = ({task, list, lists, board}: TaskProps) => {
  const { createHistoryMessage } = useCreateHistoryMessage()
  const { ref, isShow, setIsShow } = useOutside(false)
  const { updateTask} = useUpdateTask()

  function changeList(newListLabel: IListResponse['label'], newListId: IListResponse['id']) {
    if (task.listId !== newListId) {
      const updatedTask = {
        name: task.name,
        description: task.description,
        priority: task.priority || undefined,
        dueDate: task.dueDate,
        listId: newListId
      }

      updateTask({
        id: task.id,
        data: updatedTask,
      })
      createHistoryMessage(
        {
          message: `You moved task <span>${task.name}</span> from "${list.label}" to "${newListLabel}"`,
          taskId: task.id,
          boardId: board.id
    })
    }
  }

  return (
    <div>
      { isShow && <TaskModal board={board} list={list} item={task} taskModalRef={ref} setIsShow={setIsShow} />}
      <TaskCard
        name={task.name}
        description={task.description}
        dueDate={task.dueDate}
        priority={task.priority}
        taskActions={ <TaskActions boardId={board.id} task={task} list={list} setIsShowActions={setIsShow} />}
        taskMoveAction={
          <DropDownList>
            {lists?.map((list: IListResponse) =>
              <button id={task.id} key={list.id}
                      onClick={() => changeList(list?.label, list.id)}>
              {list.label}</button>)}
          </DropDownList>
        }
      />
    </div>
  )
}

export default Task;