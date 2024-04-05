import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '../../services/task.service';
import { TypeTaskFormState } from '../../types/task.types';

// export function useCreateTask() {
//
//   const queryClient = useQueryClient()
//
//   const {mutate: createTask} = useMutation({
//     mutationKey: ['create task'],
//     mutationFn: (data: TypeTaskFormState) => taskService.createTask(data),
//     onSuccess() {
//       queryClient.invalidateQueries({
//         queryKey: ['tasks']
//       })
//     }
//   })
//
//   return {createTask}
// }

export function useCreateTask() {
  const queryClient = useQueryClient()

  const { mutate: createTask } = useMutation({
    mutationKey: ['create task'],
    mutationFn: (data: TypeTaskFormState) => taskService.createTask(data),
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ['tasks']
      })
      return data;
    }
  })

  const createTaskPromise = (data: TypeTaskFormState) => {
    return new Promise((resolve, reject) => {
      createTask(data, {
        onSuccess: (result) => resolve(result),
        onError: (error) => reject(error)
      });
    });
  };

  return { createTask: createTaskPromise };
}


//TODO: just return data from func createTask