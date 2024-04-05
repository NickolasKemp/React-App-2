import { useGetDate as getDate } from './useGetDate';


export function useCreateHistoryMessage() {

  const {formattedDay, formattedMonth, formattedHour, formattedMinute}:any = getDate()

  function createHistoryMessage(message: string, taskId: string) {
    const historyMessage =
      {
        message: message,
        date: `${formattedDay}.${formattedMonth} at ${formattedHour}.${formattedMinute}`,
        taskId: taskId
      }
    const unparsedHistoryMessages = window.localStorage.getItem("historyMessages")
    const historyMessages = unparsedHistoryMessages ? JSON.parse(unparsedHistoryMessages) : []
    if(historyMessage) {
      window.localStorage.setItem('historyMessages', JSON.stringify([...historyMessages, historyMessage]))
    }
  }

  return { createHistoryMessage }
}