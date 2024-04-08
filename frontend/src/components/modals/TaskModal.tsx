import React, { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import CalendarModal from '../actions/task/CalendarModal';
import PriorityDropDownList from '../actions/task/PriorityDropDownList';
import { ITaskResponse, TypeTaskFormState } from '../../types/task.types';
import { useTaskDebounce } from '../../hooks/task/useTaskDebounce';
import { useCreateHistoryMessage } from '../../hooks/message/useCreateHistoryMessage';
import { IListResponse } from '../../types/list.types';
import { IBoardResponse } from '../../types/board.types';
import { IMessageResponse } from '../../types/message.types';
import { useHistoryMessagesBoardId } from '../../hooks/message/useHistoryMessagesByBoardId';
import XBtn from '../ui/buttons/XBtn';
import Status from '../ui/icons/Status';
import Date from '../ui/icons/Date';
import Priority from '../ui/icons/Priority';
import { TransparentField } from '../ui/fields/TransparentField';
import { format } from 'date-fns';

interface TaskModalProps {
  item: ITaskResponse
  list : IListResponse
  taskModalRef: any
  setIsShow: Dispatch<SetStateAction<boolean>>
  board: IBoardResponse
}
const TaskModal = ( {list, item, taskModalRef, setIsShow, board}: TaskModalProps) => {
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
  const [prevTaskName, setPrevTaskName] = useState(item.name)
  const [prevTaskDescription, setPrevTaskDescription] = useState(item.description)
  const { createHistoryMessage } = useCreateHistoryMessage()
  const { messages } = useHistoryMessagesBoardId(board.id)

  function handleClosing() {
    setIsShow(false)
    if(prevTaskName !== watch('name')) {
      createHistoryMessage({
        message: `You renamed task from <span>${prevTaskName}</span> to <span>${watch('name')}</span>`,
        taskId: item.id,
        boardId: board.id
    })
    }
    if(prevTaskDescription !== watch('description')) {
      createHistoryMessage({
        message:`You renamed task description from <span>${prevTaskDescription}</span> to <span>${watch('description')}</span>`,
        taskId: item.id,
        boardId: board.id
    })
    }
  }

  return (
      <div ref={taskModalRef}  className='task-modal display-block'>
      <section className="modal-main ">
        <div className='modal-task'>
          <div className='modal_main__close-btn'>
            <XBtn color={'white'} onClick={handleClosing}/>
          </div>
          <h3 className="modal-task__name">
            <TransparentField className="text-2xl font-semibold" placeholder="Untitled"
                               {...register('name')}  />
          </h3>
          <div className="modal-task__columns">
            <div className="modal-task__column">
              <div>
                <Status className='w-6 h-6'/>
                <span>Status</span>
              </div>
              <div>
                <Date/>
                <span>Due date</span>
              </div>
              <div>
                <Priority/>
                <span>Priority</span>
              </div>
            </div>
            <div className="modal-task__column">
              <div>
                {list.label}
              </div>
              <div>
                <CalendarModal
                  item={item}
                  boardId={board.id}
                />
              </div>
              <PriorityDropDownList item={item} boardId={board.id} />
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
            messages?.filter((message: { taskId: string }) => message?.taskId === item.id)
              .map((message: IMessageResponse, index:number) =>
                <div className='task-activity__container' key={index}>
                  <p className='task-activity__message' dangerouslySetInnerHTML={{ __html: message.message }}></p>
                  <div className='task-activity__date'>{message?.createdAt && format(message.createdAt,'MM.dd HH:mm')}</div>
              </div>)
          }
        </div>
      </section>
      </div>
  )
}

export default TaskModal;