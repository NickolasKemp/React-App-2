import { listService } from '../../services/list.service';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { IListResponse } from '../../types/list.types';


export function useLists() {
  const {data} =  useQuery(
    {
      queryKey: ['lists'],
      queryFn: () => listService.getLists()
    }
  )

  const [lists, setLists] = useState<IListResponse[] | undefined>(data?.data)


  useEffect(() => {
    setLists(data?.data)
  }, [data?.data]);


  return {lists, setLists}
}