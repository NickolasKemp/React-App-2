import React from 'react';
import '../../UIComponentsStyle.css'
import { useOutside } from '../../hooks/useOutside';

function PriorityList({ children, currentPriority, className}: any) {
  const {ref, isShow, setIsShow} = useOutside(false)
  return (
    <div className="priority-list__container"
         >
      <button ref={ref} className="priority-list__toggle-button" onClick={() => setIsShow(!isShow)}>
        {currentPriority}
      </button>
      <div  className={`priority-list__options-list ${isShow ? 'active' : ''}`}>
        {children}
      </div>
    </div>
  );
}

export default PriorityList;
