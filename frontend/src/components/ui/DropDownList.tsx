import React from 'react';
import '../../UIComponentsStyle.css'
import { useOutside } from '../../hooks/useOutside';
import ArrowUp from './icons/ArrowUp';
import ArrowDown from './icons/ArrowDown';

function DropDownList({ children}:any) {
  const {ref, isShow, setIsShow} = useOutside(false)

  const toggleButtonOff = <div className='icon'>
    <span>move to</span>
    <ArrowUp/>
  </div>

  const toggleButtonOn = <div className="icon">
    <span>move to</span>
    <ArrowDown/>
  </div>
  return (
    <div className="options-container"
         >
      <button ref={ref} className="toggle-button" onClick={() => setIsShow(!isShow)}>
        {isShow ? toggleButtonOn : toggleButtonOff}
      </button>
      <div className={`options-list ${isShow ? 'active' : ''}`}>
        {children}
      </div>
    </div>
  );
}

export default DropDownList;
