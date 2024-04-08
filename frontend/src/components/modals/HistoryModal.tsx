import React, { useEffect } from 'react';
import { useOutside } from '../../hooks/useOutside';
import { IMessageResponse } from '../../types/message.types';
import { useHistoryMessagesBoardId } from '../../hooks/message/useHistoryMessagesByBoardId';
import XBtn from '../ui/buttons/XBtn';
import { useLockOverflow } from '../../hooks/useLockOverflow';
import HeaderBtn from '../ui/buttons/HeaderBtn';
import History from '../ui/icons/History';
import { format } from "date-fns";
interface HistoryModalProps {
  boardId: string
}

const HistoryModal = ( { boardId }: HistoryModalProps) => {
  const {ref, isShow, setIsShow} = useOutside(false)
  const { lockOverflow, unLockOverflow } = useLockOverflow()

  useEffect(() => {
    if(!isShow) {
      unLockOverflow()
    }
  }, [isShow])

  function handleClosing() {
    setIsShow(false)
    unLockOverflow()
  }

  function handleOpening() {
    setIsShow(true)
    lockOverflow()
  }

  const show = isShow ? "display-block" : "display-none"
  const { messages } = useHistoryMessagesBoardId(boardId)

  return (
    <div>
        <HeaderBtn onClick={handleOpening} icon={<History />}>
          History
        </HeaderBtn>
        <div className={`history-modal ${show}`}>
        <section ref={ref}  className="history-modal__modal-main modal-task">
          <div className='history-modal__close-btn'>
            <XBtn color={'white'} onClick={handleClosing}/>
          </div>
          <h3 className='history-modal__label'>History</h3>
          <div className='history-modal__history-massage history-massage' >
            {
              messages?.length ?
                messages.map((message:IMessageResponse, index:number) => (
                <div className='history-massage__container' key={index}>
                  <p className='history-message__message' dangerouslySetInnerHTML={{ __html: message.message }}></p>
                  <div className='history-massage__date' >{message?.createdAt && format(new Date(message.createdAt),'MM.dd HH:mm')}</div>
                </div>
              ))
                : <h4 className='_noevents-title'>There are not events.</h4>
            }
          </div>
        </section>
      </div>
    </div>
  )
}

export default HistoryModal;