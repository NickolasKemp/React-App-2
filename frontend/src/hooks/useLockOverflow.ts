import { useEffect, useState } from 'react';

export const useLockOverflow = () => {
  const [isLocked, setIsLocked] = useState<boolean>(false)

  function lockOverflow() {
    setIsLocked(true)
  }

  function unLockOverflow() {
    setIsLocked(false)
  }

  useEffect(() => {
    if (isLocked) {
      document.body.classList.add('locked');
    } else {
      document.body.classList.remove('locked');
    }

    return () => {
      document.body.classList.remove('locked');
    };
  }, [isLocked])

  return { lockOverflow, unLockOverflow}
}