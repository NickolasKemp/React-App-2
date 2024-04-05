import React, { useContext, useEffect, useState } from 'react';
import '../../UIComponentsStyle.css'
import { SubmitHandler, useForm } from 'react-hook-form';
import { IListResponse } from '../../types/list.types';
import { useLists } from '../../hooks/list/useLists';
import { useOutside } from '../../hooks/useOutside';
import { useUpdateList } from '../../hooks/list/useUpdateList';
import { useCreateList } from '../../hooks/list/useCreateList';
import { useDeleteList } from '../../hooks/list/useDeleteList';
import { useUpdateTask } from '../../hooks/task/useUpdateTask';
interface MyForm {
  label: string
}

function EditListModal({children, id, currentListTasks}: any) {
  const { lists } = useLists()
  const {createList} = useCreateList()
  const {deleteList} = useDeleteList()
  const {updateList} = useUpdateList()
  const {updateTask} = useUpdateTask()
  const {register, handleSubmit, reset} =
    useForm<MyForm>({defaultValues: {label: lists?.find((list: IListResponse) => list.id === id)?.label}})
  const { ref, isShow, setIsShow} = useOutside(false)
  const submit: SubmitHandler<MyForm> = data => {
    const listWithSameName = lists?.find((list: IListResponse) => list.label === data.label)
    if(!listWithSameName) {
      // updateList({id: id, data: { label: data.label } })  :(
      deleteList(id)
      createList(data)
      for(let task of currentListTasks) {
        updateTask({id: task.id, data: { createdAt: task.createdAt, name: task.name,
            description: task.description, priority: task.priority || undefined, dueDate: task.dueDate,
            status: data.label } })
        console.log('label', data.label)
        console.log("task updated", task )
      }
      setIsShow(false);
    }

    console.log('list updated')

  }

  useEffect(() => {
    if (isShow) {
      const defaultLabel = lists?.find((list: IListResponse) => list.id === id)?.label;
      reset({ label: defaultLabel });
    }
  }, [isShow]);

  return (
    <div className={`edit-list ${isShow? 'active' : ''} `} >
      <span  onClick={() => setIsShow(!isShow)}>
        {children}
      </span>
      { isShow &&
        <div className={`edit-list-modal ${isShow? 'active' : ''} `}>
          <div  ref={ref}  className={`edit-list-modal__content`}>
            <form onSubmit={handleSubmit(submit)}>
              <label>New label:</label>
              <input autoComplete="off" placeholder="" type="text" {...register('label', { required: true })} />
              <button>Edit</button>
            </form>
          </div>
      </div>
      }

    </div>
  );
}

export default EditListModal;
