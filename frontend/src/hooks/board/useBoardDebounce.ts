import { TypeBoardFormState } from '../../types/board.types';
import { useCallback, useEffect } from 'react';
import { useUpdateBoard } from './useUpdateBoard';
import { UseFormWatch } from 'react-hook-form'
import debounce from 'lodash.debounce'


interface IUseBoardDebounce {
  watch: UseFormWatch<TypeBoardFormState>
  boardId: string
}
export function useBoardDebounce({watch, boardId}: IUseBoardDebounce) {

  const { updateBoard } = useUpdateBoard()


  const debouncedUpdateBoard = useCallback(
    debounce((formData: TypeBoardFormState) => {
      updateBoard({ id: boardId, data: formData })
    }, 400),
    []
)

  useEffect(() => {
    const { unsubscribe } = watch(formData => {
      if(boardId !== '') {
        console.log('debounced with boardId', boardId)
        //@ts-ignore
        debouncedUpdateBoard( {...formData})
      }
    })

    return () => {
      unsubscribe()
    }
  }, [watch(), debouncedUpdateBoard]);

}