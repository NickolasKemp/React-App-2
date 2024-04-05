import { useMutation, useQueryClient } from '@tanstack/react-query';
import { boardService } from '../../services/board.service';
import { TypeBoardFormState } from '../../types/board.types';
import { useState } from 'react';

export function useCreateBoard() {

  const queryClient = useQueryClient()

  const [ response, setResponse ] = useState<any>(undefined)

  const {mutate: createBoard} = useMutation({
    mutationKey: ['create board'],
    mutationFn:
      (data: TypeBoardFormState) =>
         boardService.createBoard(data),
    onSuccess(data) {
      setResponse(data)
      queryClient.invalidateQueries({
        queryKey: ['boards']
      })
      return 'boardService.createBoard(data).then(response)'
    }
  })

  return { createBoard, response }
}



