import { TypeListFormState } from '../../types/list.types';
import { useCallback, useEffect } from 'react';
import { UseFormWatch } from 'react-hook-form'
import debounce from 'lodash.debounce'
import { useUpdateList } from './useUpdateList';


interface IUseListDebounce {
  watch: UseFormWatch<TypeListFormState>
  listId: string
}
export function useListDebounce({watch, listId}: IUseListDebounce) {

  const { updateList } = useUpdateList()


  const debouncedUpdateList = useCallback(
    debounce((formData: TypeListFormState) => {
      if(listId) {
        updateList({ id: listId, data: formData })
      }
    }, 400),
    []
)

  useEffect(() => {
    const { unsubscribe } = watch(formData => {
      if(listId) {
        //@ts-ignore
        debouncedUpdateList( {...formData})
      }
    })

    return () => {
      unsubscribe()
    }
  }, [watch(), debouncedUpdateList]);

}