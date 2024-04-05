
import React, { useEffect, useState } from 'react';
import '../../UIComponentsStyle.css'
import { useOutside } from '../../hooks/useOutside';

function CalendarModal({ children, tempTaskDueDate, updateTaskDueData}: any) {
  const {ref, isShow, setIsShow} = useOutside(false)
  const [isNeedUpdate, setIsNeedUpdate] = useState(false)

  function toggleModal() {
    setIsShow(!isShow)
    setIsNeedUpdate(true)
  }

  useEffect(() => {
    if(!isShow && isNeedUpdate) {
      updateTaskDueData()
    }
  }, [isShow]);

  return (
    <div ref={ref} className="calendar-modal">
      <button className="calendar-modal__toggle-button" onClick={() => toggleModal()}>
        {tempTaskDueDate ? tempTaskDueDate : "not selected"}
      </button>
      <div className={`calendar-modal__options-list ${isShow ? 'active' : ''}`}>
        <div  onClick={() => toggleModal()}  className="calendar-modal__close" >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12">
          </path></svg></div>
        {children}
      </div>
    </div>
  );
}

export default CalendarModal;
