import React from 'react';
import "../../../index.css"

interface XBtnProps {
  onClick?: any
  color: "white" | "black"
}
const XBtn = ({onClick, color} :XBtnProps) => {
  return (
    <button >
      <svg onClick={onClick} className={`w-6 h-6 cursor-pointer ${color === 'black' ? 'hover:bg-[#efefef]' : 'hover:bg-[#8696bd]' }`}
           xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
           stroke={color}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    </button>
  );
};

export default XBtn;