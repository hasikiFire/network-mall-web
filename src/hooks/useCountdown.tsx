import { useState, useEffect, useCallback } from 'react';

function useCountdown(initialTime: number) {
  const [countdown, setCountdown] = useState(0);
  const [isCounting, setIsCounting] = useState(false);

  const startCountdown = useCallback(() => {
    if (isCounting) return;
    setCountdown(initialTime);
    setIsCounting(true);
  }, [isCounting, initialTime]);

  const stopCountdown = useCallback(() => {
    setCountdown(0);
    setIsCounting(false);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isCounting && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsCounting(false);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdown, isCounting]);

  return { countdown, isCounting, startCountdown, stopCountdown };
}

export default useCountdown;
