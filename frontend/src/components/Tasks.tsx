import React from 'react';
import { ITaskResponse } from '../types/task.types';
import {IListResponse } from '../types/list.types';
import Task from './Task';
import { useSortTasks } from '../hooks/task/useSortTasks';

interface TasksProps {
  list : IListResponse
  lists: IListResponse[]
  items: ITaskResponse[] | undefined
}

const Tasks = ({list, lists, items}: TasksProps) => {

  const { sortedTasks } = useSortTasks(items || [])

  return (
    <div className="tasks__container">
      {
        items &&
        sortedTasks.map((task: ITaskResponse) =>
          <Task key={task.id} task={task} list={list} lists={lists} />
        )
      }
    </div>
  );
};

export default Tasks;