import { boardService } from '../../services/board.service';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { IBoardResponse } from '../../types/board.types';


export function useBoard(id: string) {
  const {data} =  useQuery(
    {
      queryKey: ['board', id],
      queryFn: () => boardService.getBoardById(id)
    }
  )

  const [board, setBoard] = useState<IBoardResponse | undefined>(data?.data)

  useEffect(() => {
    setBoard(data?.data)
  }, [data?.data]);

  return {board, setBoard}
}