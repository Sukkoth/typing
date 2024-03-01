import { useEffect, useRef, useState } from 'react';

type TimerProps = {
  timer: number;
};

function Timer({ timer }: TimerProps) {
  const [coutDown, setCountDown] = useState<number>(timer);
  const timerRef = useRef<number | null>();

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (coutDown <= 0) {
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [coutDown]);

  return (
    <div className='text-center'>
      <h1 className='text-3xl font-bold text-[#878f8d]'>Time</h1>
      <h1 className='text-7xl font-medium text-[#44504c] mt-5'>{coutDown}</h1>
    </div>
  );
}

export default Timer;
