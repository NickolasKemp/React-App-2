import { useMutation, useQueryClient } from '@tanstack/react-query';
import { boardService } from '../../services/board.service';
import { TypeBoardFormState } from '../../types/board.types';

export function useCreateBoard() {

  const queryClient = useQueryClient()

  const {mutate: createBoard} = useMutation({
    mutationKey: ['create board'],
    mutationFn: (data: TypeBoardFormState) => boardService.createBoard(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['boards']
      })
    }
  })

  return { createBoard }
}

