import React from 'react';

interface HeaderBtnProps {
  primary?: boolean
  children: string
  onClick?: () => void
  icon?: any
}
const HeaderBtn = ({primary = true, children, onClick, icon}: HeaderBtnProps) => {
  return (
    <button onClick={onClick} className={`${primary ?  'hover:bg-[#eaebee] ' : ' hover:bg-[#6b7ba2] bg-[#4c597c] text-white' } 
    px-3 py-2 rounded-sm shadow border border-gray-300 inline-flex justify-center items-center gap-1.5 cursor-pointer`} >
      {
        icon && <span>{icon}</span>
      }
      <span>{children}</span>
    </button>
  );
};

export default HeaderBtn;