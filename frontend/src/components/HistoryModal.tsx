import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from './Context';
import { useOutside } from '../hooks/useOutside';
import { useHistoryMessages } from '../hooks/useHistoryMessages';

const HistoryModal = ( { children }: any) => {

  const {ref, isShow, setIsShow} = useOutside(false)

  function closeTaskModal() {
    setIsShow(false)
  }
  const show = isShow ? "display-block" : "display-none"

  const { historyMessages } = useHistoryMessages([isShow])

  return (
    <div>
      <button onClick={() => setIsShow(true)}>
        {children}
      </button>
        <div className={`history-modal ${show}`}>
        <section ref={ref}  className="history-modal__modal-main modal-task">
          <button className="history-modal__close-btn" onClick={closeTaskModal}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                 stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
          <h3 className='history-modal__label'>History</h3>
          <div className='history-modal__history-massage history-massage' >
            {
              historyMessages?.length ?
              historyMessages.map((message:any, index:any) => (
                <div className='history-massage__container' key={index}>
                  <p className='history-message__message' dangerouslySetInnerHTML={{ __html: message.message }}></p>
                  <div className='history-massage__date' >{message.date}</div>
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