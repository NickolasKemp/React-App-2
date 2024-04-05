import React, { Dispatch, SetStateAction, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { priorities } from '../types/task.types';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import CalendarModal from './ui/CalendarModal';
import PriorityList from './ui/PriorityList';
import { EnumTaskPriority, ITaskResponse, TypeTaskFormState } from '../types/task.types';
import { useTaskDebounce } from '../hooks/task/useTaskDebounce';
import { useUpdateTask } from '../hooks/task/useUpdateTask';
import { useCreateHistoryMessage } from '../hooks/useCreateHistoryMessage';
import { useHistoryMessages } from '../hooks/useHistoryMessages';
import { IListResponse } from '../types/list.types';

interface TaskModalProps {
  item: ITaskResponse
  list : IListResponse
  taskModalRef: any
  setIsShow: Dispatch<SetStateAction<boolean>>
}
const TaskModal = ( {list, item, taskModalRef, setIsShow}: TaskModalProps) => {
  const { register, watch } = useForm<TypeTaskFormState>({
    defaultValues: {
      name: item.name,
      createdAt: item.createdAt,
      priority: item.priority,
      description: item.description,
      status: item.status,
      dueDate: item.dueDate
    }
  })

  useTaskDebounce({ watch, itemId: item.id })
  const [selected, setSelected] = useState<Date>();
  const formattedSelected = selected ? format(selected, 'PP') : item.dueDate ;
  const [prevTaskName, setPrevTaskName] = useState(item.name)
  const [prevTaskDescription, setPrevTaskDescription] = useState(item.description)
  const { createHistoryMessage } = useCreateHistoryMessage()
  const { updateTask } = useUpdateTask()
  const { historyMessages } = useHistoryMessages([watch])

  function updateTaskDueData() {
    const updatedTask = {...item, dueDate: formattedSelected}
    updateTask({id: item.id, data: updatedTask})

    createHistoryMessage(`You changed due data for task <span>${item.name}</span> 
    from ${item.dueDate} to ${formattedSelected}`, item.id )
  }

  function changePriority(priority: EnumTaskPriority) {
    const changedPriorityTask = {
      createdAt: item.createdAt,
      name: item.name,
      description: item.description,
      priority: priority || undefined,
      dueDate: item.dueDate,
      status: item.status }
    updateTask({id: item.id, data: changedPriorityTask})
    createHistoryMessage(`You changed the priority of task <span>${item.name}</span>
     from <span style="color: #565353;" >${item.priority}</span> to <span style="color: #545252;" >${priority}</span> `, item.id )
  }

  function closeTaskModal() {
    setIsShow(false)
    if(prevTaskName !== watch('name')) {
      createHistoryMessage(`You renamed task from <span>${prevTaskName}</span> to <span>${watch('name')}</span>`, item.id )
    }
    if(prevTaskDescription !== watch('description')) {
      createHistoryMessage(`You renamed task description from <span>${prevTaskDescription}</span> to <span>${watch('description')}</span>`, item.id )
    }
  }

  return (
      <div ref={taskModalRef}  className='task-modal display-block'>
      <section className="modal-main ">
        <div className='modal-task'>
          <button className="modal_main__close-btn" onClick={closeTaskModal}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                 stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
          <h3 className="modal-task__name">
            <input className="modal-task__transparent-input" autoComplete="off" placeholder="Untitled"
                   type="text" {...register('name')} />
          </h3>
          <div className="modal-task__columns">
            <div className="modal-task__column">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M16.712 4.33a9.027 9.027 0 0 1 1.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 0 0-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 0 1 0 9.424m-4.138-5.976a3.736 3.736 0 0 0-.88-1.388 3.737 3.737 0 0 0-1.388-.88m2.268 2.268a3.765 3.765 0 0 1 0 2.528m-2.268-4.796a3.765 3.765 0 0 0-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 0 1-1.388.88m2.268-2.268 4.138 3.448m0 0a9.027 9.027 0 0 1-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0-3.448-4.138m3.448 4.138a9.014 9.014 0 0 1-9.424 0m5.976-4.138a3.765 3.765 0 0 1-2.528 0m0 0a3.736 3.736 0 0 1-1.388-.88 3.737 3.737 0 0 1-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 0 1-1.652-1.306 9.027 9.027 0 0 1-1.306-1.652m0 0 4.138-3.448M4.33 16.712a9.014 9.014 0 0 1 0-9.424m4.138 5.976a3.765 3.765 0 0 1 0-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 0 1 1.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 0 0-1.652 1.306A9.025 9.025 0 0 0 4.33 7.288" />
                </svg>
                <span>Status</span>
              </div>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                     stroke="currentColor"
                     className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
                <span>Due date</span>
              </div>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                     stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                </svg>
                <span>Priority</span>
              </div>
            </div>
            <div className="modal-task__column">
              <div>
                {list.label}
              </div>
              <div>
                <CalendarModal
                  updateTaskDueData={updateTaskDueData}
                  tempTaskDueDate={formattedSelected}
                  dueDate={item.dueDate}
                >
                  <DayPicker
                    mode="single"
                    selected={selected}
                    onSelect={setSelected}
                    showOutsideDays
                  />
                </CalendarModal>
              </div>
              <PriorityList
                className={item.priority === 'low' ? 'yellow' : item.priority === 'medium' ? 'orange' : "red"}
                currentPriority={item.priority ? item.priority : "click for select"}>
                {[...priorities].filter(priority => priority !== item.priority)
                  .map(priority => <button onClick={() => changePriority(EnumTaskPriority[priority])}
                                           key={priority}>{priority}</button>)}
              </PriorityList>
            </div>
          </div>
          <div className="modal-task__description">
            <h3>Description</h3>
              <textarea className='modal-task__textarea' rows={4} cols={50} autoComplete="off"
                        placeholder="Empty" {...register('description')} ></textarea>
          </div>
        </div>
        <div className='task-activity'>
          <h2>Activity</h2>
          {
            historyMessages.filter((message: { taskId: any }) => message?.taskId === item.id)
              .map((message:any, index:any) =>
                <div className='task-activity__container' key={index}>
                  <p className='task-activity__message' dangerouslySetInnerHTML={{ __html: message.message }}></p>
                  <div className='task-activity__date'>{message.date}</div>
              </div>)
          }
        </div>
      </section>
      </div>
  )
}

export default TaskModal;