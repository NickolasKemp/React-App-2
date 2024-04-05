import { useEffect, useState } from 'react';
import { ITaskResponse } from '../../types/task.types';
import { useTasks } from './useTasks';
import { IListResponse } from '../../types/list.types';


export function useCurrentListTasks( listId: IListResponse["id"] ) {
  const { items } = useTasks() || []
  const [currentListTasks, setCurrentListTasks] = useState<ITaskResponse[]>(items?.filter(item => item.listId === listId) || [])

  useEffect(() => {
    setCurrentListTasks(items?.filter(item => item.listId === listId) || [])
  }, [items, listId]);


  return { currentListTasks  }
}