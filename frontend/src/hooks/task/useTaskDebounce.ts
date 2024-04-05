import { TypeTaskFormState } from '../../types/task.types';
import { useCallback, useEffect } from 'react';
import { useUpdateTask } from './useUpdateTask';
import { useCreateTask } from './useCreateTask';
import { UseFormWatch } from 'react-hook-form'
import debounce from 'lodash.debounce'


interface IUseTaskDebounce {
  watch: UseFormWatch<TypeTaskFormState>
  itemId: string
}
export function useTaskDebounce({watch, itemId}: IUseTaskDebounce) {
  const {createTask} = useCreateTask()
  const {updateTask} = useUpdateTask()

  const debouncedCreateTask = useCallback(
    debounce((formData: TypeTaskFormState) => {
      createTask(formData)
    }, 400),
    []
  )


  const debouncedUpdateTask = useCallback(
    debounce((formData: TypeTaskFormState) => {
      updateTask({ id: itemId, data: formData })
    }, 400),
    []

)

  useEffect(() => {
    const { unsubscribe } = watch(formData => {
      if(itemId) {
        debouncedUpdateTask({
          ...formData,
          priority: formData.priority || undefined
        })
      } else {
        debouncedCreateTask(formData)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [watch(), debouncedUpdateTask, debouncedCreateTask ]);

}