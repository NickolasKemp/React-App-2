import { ITaskResponse } from '../../types/task.types';
import React from 'react';


export function useSortTasks(items: ITaskResponse[]) {
  function sortTasksByDate(tasks: ITaskResponse[]) {
    const tasksCopy = tasks.slice();

    tasksCopy.sort((a: any, b:any) => {
      const aCreated = (a.createdAt)
      const bCreated = (b.createdAt)
      const aUpdated = a.updatedAt
      const bUpdated = b.updatedAt

      const latestA = aCreated > aUpdated ? aCreated : aUpdated
      const latestB = bCreated < bUpdated ? bCreated : bUpdated

      if (latestA < latestB) return 1
      if (latestA > latestB) return -1

      return 0
    })

    return tasksCopy
  }

  const sortedTasks = React.useMemo(() => {
    return sortTasksByDate(items || [])
  }, [items])


  return { sortedTasks }
}