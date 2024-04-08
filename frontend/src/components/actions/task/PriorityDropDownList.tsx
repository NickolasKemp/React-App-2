import React from 'react';
import '../../../UIComponentsStyle.css'
import { useOutside } from '../../../hooks/useOutside';
import { EnumTaskPriority, ITaskResponse, priorities } from '../../../types/task.types';
import { useCreateHistoryMessage } from '../../../hooks/message/useCreateHistoryMessage';
import { useUpdateTask } from '../../../hooks/task/useUpdateTask';

interface PriorityDropDownListProps {
  item: ITaskResponse
  boardId: string
}

function PriorityDropDownList({ item, boardId}: PriorityDropDownListProps) {
  const {ref, isShow, setIsShow} = useOutside(false)
  const { createHistoryMessage } = useCreateHistoryMessage()
  const { updateTask } = useUpdateTask()

  function handleUpdatingPriority(priority: EnumTaskPriority) {
    updateTask({id: item.id, data: {priority: priority || undefined}})
    createHistoryMessage({
      message: `You changed the priority of task <span>${item.name}</span>
     from <span style="color: #565353;" >${item.priority}</span> to <span style="color: #545252;" >${priority}</span> `,
      taskId: item.id,
      boardId: boardId
    })
  }

  return (
    <div className="priority-list__container"
         >
      <button ref={ref} className="priority-list__toggle-button" onClick={() => setIsShow(!isShow)}>
        {item.priority ? item.priority : "click for select"}
      </button>
      <div  className={`priority-list__options-list ${isShow ? 'active' : ''}`}>
        {[...priorities].filter(priority => priority !== item.priority)
          .map(priority =>
            <button
              onClick={() => handleUpdatingPriority(EnumTaskPriority[priority])}
              key={priority}
            >
              {priority}</button>)}
      </div>
    </div>
  );
}

export default PriorityDropDownList;
