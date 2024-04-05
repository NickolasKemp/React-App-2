import React from 'react';
import List from './List';
import { IListResponse } from '../types/list.types';
import { useListsByBoardId } from '../hooks/list/useListsByBoardId';
import { useParams } from 'react-router-dom';

const Lists = () => {
  const params = useParams()
  const { lists} = useListsByBoardId(params?.id || "")

  return (
    <div className="lists-container">
      {
        lists?.length ?
        lists.map((list: IListResponse) =>
         <List key={list.id} list={list} lists={lists} />
        )
          : <h3 className="_nodata-title" >There are not lists. Create one</h3>
      }
    </div>
  )
}

export default Lists;