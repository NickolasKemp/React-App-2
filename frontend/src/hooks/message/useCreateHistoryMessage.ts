import { useMutation, useQueryClient } from '@tanstack/react-query';
import { messageService } from 'src/services/message.service';
import { TypeMessageFormState } from 'src/types/message.types';

export function useCreateHistoryMessage() {

  const queryClient = useQueryClient()

  const {mutate: createHistoryMessage} = useMutation({
    mutationKey: ['create message'],
    mutationFn: (data: TypeMessageFormState) => messageService.createMessage(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['messages']
      })
    }
  })

  return { createHistoryMessage }
}

