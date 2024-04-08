import React from 'react';
import '../../../App.css'
import '../../../index.css'

interface BoardCardProps {
  title?: string
  id?: string
}

const BoardCard = ({title, id} : BoardCardProps) => {

  return (
      <div id={id} className='px-5 pt-7 pb-2 w-40 h-24 border rounded-xl border-slate-400 cursor-pointer hover:bg-gray-100' >
        <h2 className="text-xl font-semibold overflow-hidden whitespace-nowrap max-h-18 overflow-ellipsis" >{title}</h2>
      </div>
  );
};

export default BoardCard;