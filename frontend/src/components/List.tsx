import React, { useEffect, useRef } from 'react';
import ListActions from './actions/list/ListActions';
import 'react-day-picker/dist/style.css';
import Tasks from './Tasks';
import { useCreateTask } from '../hooks/task/useCreateTask';
import { useCreateHistoryMessage } from '../hooks/message/useCreateHistoryMessage';
import { IListResponse, TypeListFormState } from 'src/types/list.types';
import { useCurrentListTasks } from '../hooks/task/useCurrentListTasks';
import { defaultTask } from '../types/task.types';
import { IBoardResponse } from '../types/board.types';
import { useForm } from 'react-hook-form';
import { useListDebounce } from 'src/hooks/list/useListDebounce';
import { TransparentField } from './ui/fields/TransparentField';
import Plus from './ui/icons/Plus';
interface ListProps {
  list: IListResponse
  lists: IListResponse[]
  board: IBoardResponse
}

const List  = ({list, lists, board}: ListProps) => {
  const { currentListTasks } = useCurrentListTasks(list.id)
  const {createTask} = useCreateTask()
  const { createHistoryMessage } = useCreateHistoryMessage()
  function handleCreatingTask() {
    createTask({...defaultTask, status: list.label, listId: list.id})
      .then((data: any) => {
        createHistoryMessage({
          message: `You added a new task to "${list.label}"`,
          taskId: data.data.id,
          boardId: board.id
      });
      })
      .catch((error) => {
        console.error("Error creating task:", error);
      })
  }

  const { register, watch, setValue } = useForm<TypeListFormState>({
    defaultValues: {
      label: list.label
    }})
  useListDebounce({ watch, listId: list.id })

  useEffect(() => {
    setValue('label', list.label)
  }, [list.label]);

  const inputParentRef = useRef(null);

  return (
<>
  {
    list &&
    <div className="list">
      <div className="list__title title-list">
        <h3 ref={inputParentRef}>
          <TransparentField className="text-base font-medium" placeholder="Untitled"
                            {...register('label')}  />
        </h3>
        <div className="title-list__actions">
          <span>{currentListTasks?.length}</span>
          <ListActions inputParentRef={inputParentRef} boardId={board.id} list={list}
                       currentListTasks={currentListTasks} />
        </div>
      </div>
      <button onClick={handleCreatingTask} className="list__button">
        <Plus/>
        Add new task
      </button>
      <Tasks board={board} list={list} lists={lists} items={currentListTasks} />
    </div>
  }
</>
)
};

export default List;