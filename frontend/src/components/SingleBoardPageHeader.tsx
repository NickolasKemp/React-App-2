import React from 'react';
import HistoryModal from './modals/HistoryModal';
import { useForm } from 'react-hook-form';
import { IBoardResponse, TypeBoardFormState } from '../types/board.types';
import { useBoardDebounce } from '../hooks/board/useBoardDebounce';
import { useCreateList } from '../hooks/list/useCreateList';
import HeaderBtn from './ui/buttons/HeaderBtn';
import Plus from './ui/icons/Plus';
import { TransparentField } from './ui/fields/TransparentField';
import Back from './ui/icons/Back';
import { Link } from 'react-router-dom';

interface SingleBoardPageHeader {
  board: IBoardResponse
  id: string
}

const SingleBoardPageHeader = ({board, id} :SingleBoardPageHeader) => {
  const { register, watch, setValue } = useForm<TypeBoardFormState>({
    defaultValues: {
      title: board?.title
    }
  })

  useBoardDebounce({ watch, boardId: id })

  const { createList } = useCreateList()
  const handleCreatingList = () => {
      createList({label: "Untitled", boardId: id})
  }

  return (
    <div className="header relative">
      <Link to='/' className="absolute t-0 l-0 px-2 py-1 hover:bg-gray-100"><Back/></Link>
      <div className="pl-14">
        <TransparentField className="text-xl font-semibold" placeholder="Untitled"
                          {...register('title')} />
      </div>
      <div className="header__actions actions-header">
        <HistoryModal boardId={id}/>
        <HeaderBtn onClick={handleCreatingList} icon={<Plus />} primary={false}>
          Create new list
        </HeaderBtn>
      </div>
    </div>
  );
};

export default SingleBoardPageHeader;