import { useMutation, useQueryClient } from '@tanstack/react-query';
import { boardService } from '../../services/board.service';
import { TypeBoardFormState } from '../../types/board.types';

export function useUpdateBoard(key?: string) {

  const queryClient = useQueryClient()

  const {mutate: updateBoard} = useMutation({
    mutationKey: ['update board', key],
    mutationFn: ({id, data}: {id:string, data: TypeBoardFormState}) =>
      boardService.updateBoard(id, data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['board']
      })
    }
  })

  return { updateBoard }
}