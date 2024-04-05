import { listService } from '../../services/list.service';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { IListResponse } from '../../types/list.types';


export function useListsByBoardId(boardId: string) {
  console.log(boardId)

  const {data} =  useQuery(
    {
      queryKey: ['lists', boardId],
      queryFn: () => listService.getListsByBoardId(boardId),
      enabled: !!boardId
  })

  const [lists, setLists] = useState<IListResponse[] | undefined>(data?.data)


  useEffect(() => {
    setLists(data?.data)
    console.log(data?.data)
  }, [data?.data]);


  return {lists, setLists}
}