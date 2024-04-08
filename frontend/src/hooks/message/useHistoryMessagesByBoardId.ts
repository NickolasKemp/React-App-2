import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { messageService } from 'src/services/message.service';
import { IMessageResponse } from '../../types/message.types';


export function useHistoryMessagesBoardId(boardId: string) {
  const {data} =  useQuery(
    {
      queryKey: ['messages', boardId],
      queryFn: () => messageService.getMessagesByBoardId(boardId),
      enabled: !!boardId
  })

  const [messages, setMessages] =
    useState<IMessageResponse[] | undefined>(data?.data)

  useEffect(() => {
    setMessages(data?.data)
  }, [data?.data]);

  return {messages, setMessages}
}