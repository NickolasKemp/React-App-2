import { boardService } from '../../services/board.service';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { IBoardResponse } from '../../types/board.types';


export function useBoards() {
  const {data} =  useQuery(
    {
      queryKey: ['boards'],
      queryFn: () => boardService.getBoards()
    }
  )

  const [boards, setBoards] = useState<IBoardResponse[] | undefined>(data?.data)


  useEffect(() => {
    setBoards(data?.data)
  }, [data?.data]);


  return {boards, setBoards}
}