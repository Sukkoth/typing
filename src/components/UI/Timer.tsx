import { useEffect, useRef, useState } from "react";

type TimerProps = {
  timer: number;
  status: "idle" | "playing" | "ended";
  finishGame: () => void;
};

function Timer({ timer, status, finishGame }: TimerProps) {
  const [coutDown, setCountDown] = useState<number>(timer);
  const timerRef = useRef<number | null>();

  useEffect(() => {
    timerRef.current =
      status === "playing"
        ? setInterval(() => {
            setCountDown((prev) => prev - 1);
          }, 1000)
        : null;

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [status]);

  useEffect(() => {
    setCountDown(timer);
  }, [timer]);

  useEffect(() => {
    if (coutDown <= 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      finishGame();
      setCountDown(timer);
    }
  }, [coutDown, finishGame, timer]);

  return (
    <div className='text-center'>
      <h1 className='text-3xl font-bold text-[#878f8d]'>Time</h1>
      <h1 className='text-7xl font-medium text-[#1cad7a] mt-5'>{coutDown}</h1>
    </div>
  );
}

export default Timer;
