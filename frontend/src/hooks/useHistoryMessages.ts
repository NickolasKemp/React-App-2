import { useEffect, useState } from 'react';

export function useHistoryMessages(dependencyArray?:any[]) {
  const [historyMessages, setHistoryMessages] = useState<any>([])


    useEffect(() => {

      const unparsedMessages =  window.localStorage.getItem('historyMessages')
      const messages = unparsedMessages ? JSON.parse(unparsedMessages) : []
      setHistoryMessages(messages)

      // clear local storage
      // window.localStorage.removeItem('historyMessages')
    }, dependencyArray || []);




  return {historyMessages}
}