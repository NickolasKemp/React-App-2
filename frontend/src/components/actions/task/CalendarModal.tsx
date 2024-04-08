import React, { useEffect, useState } from 'react';
import '../../../UIComponentsStyle.css'
import { useOutside } from '../../../hooks/useOutside';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { useCreateHistoryMessage } from '../../../hooks/message/useCreateHistoryMessage';
import { useUpdateTask } from '../../../hooks/task/useUpdateTask';
import { ITaskResponse } from 'src/types/task.types';
import XBtn from '../../ui/buttons/XBtn';

interface CalendarModalProps {
  item: ITaskResponse
  boardId: string
}

function CalendarModal({item, boardId}: CalendarModalProps) {
  const {ref, isShow, setIsShow} = useOutside(false)
  const [isNeedUpdate, setIsNeedUpdate] = useState(false)
  const [selected, setSelected] = useState<Date>();
  const formattedSelected = selected ? format(selected, 'PP') : item.dueDate ;
  const { createHistoryMessage } = useCreateHistoryMessage()
  const { updateTask } = useUpdateTask()
  function handleUpdatingDueData() {
    updateTask({
      id: item.id,
      data: { dueDate: formattedSelected, priority: item.priority || undefined }})
    createHistoryMessage({
      message:`You changed due data for task <span>${item.name}</span> 
    from ${item.dueDate} to ${formattedSelected}`,
      taskId: item.id || undefined,
      boardId: boardId
    })
  }
  function toggleModal() {
    setIsShow(!isShow)
    setIsNeedUpdate(true)
  }

  useEffect(() => {
    if(!isShow && isNeedUpdate) {
      handleUpdatingDueData()
    }
  }, [isShow]);

  return (
    <div ref={ref} className="calendar-modal">
      <button className="calendar-modal__toggle-button" onClick={toggleModal}>
        {formattedSelected ? formattedSelected : "not selected"}
      </button>
      <div className={`calendar-modal__options-list ${isShow ? 'active' : ''}`}>
        <div className="calendar-modal__close" >
          <XBtn color={'black'} onClick={toggleModal} />
        </div>
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={setSelected}
          showOutsideDays
        />
      </div>
    </div>
  );
}

export default CalendarModal;
