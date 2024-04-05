export function useGetDate() {
  const now: Date = new Date()

  const day: number = now.getDate()
  const month: number = now.getMonth() + 1

  const hour: number = now.getHours()
  const minute: number = now.getMinutes()

  const formattedDay: string = String(day).padStart(2, '0')
  const formattedMonth: string = String(month).padStart(2, '0')

  const formattedHour: string = String(hour).padStart(2, '0');
  const formattedMinute: string = String(minute).padStart(2, '0')

  return {formattedDay, formattedMonth, formattedHour, formattedMinute}
}