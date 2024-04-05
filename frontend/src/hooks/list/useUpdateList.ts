import { useMutation, useQueryClient } from '@tanstack/react-query';
import { listService } from '../../services/list.service';
import { TypeListFormState } from '../../types/list.types';

export function useUpdateList(key?: string) {

  const queryClient = useQueryClient()

  const {mutate: updateList} = useMutation({
    mutationKey: ['update list', key],
    mutationFn: ({id, data}: {id:string, data: TypeListFormState}) =>
      listService.updateList(id, data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['list']
      })
    }
  })

  return {updateList}
}