import React from 'react';

interface EllipsisBtnProps {
  onClick: any
}

const EllipsisBtn = ( {onClick}: EllipsisBtnProps ) => {
  return (
    <button onClick={onClick} className='px-1 py-0.5 options-modal__toggle-button'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5">
        <path
          d="M8 2a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM8 6.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM9.5 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z"></path>
      </svg>
    </button>
  );
};

export default EllipsisBtn;