import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { STATUS } from "../../App";

type TimeProps = {
  time: number;
  onFinish: () => void;
  status: STATUS;
  setStatus: Dispatch<SetStateAction<STATUS>>;
};

function Time({ time, onFinish, status, setStatus }: TimeProps) {
  const [coutDown, setCountDown] = useState<number>(time);
  const timeRef = useRef<number | null>();

  useEffect(() => {
    if (status === "playing") {
      timeRef.current = setInterval(() => {
        setCountDown((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timeRef.current) {
        clearInterval(timeRef.current);
      }
    };
  }, [status]);

  useEffect(() => {
    if (coutDown <= 0) {
      if (timeRef.current) clearInterval(timeRef.current);
      onFinish();
    }
  }, [coutDown, onFinish]);

  useEffect(() => {
    setCountDown(time);
  }, [time, status]);

  useEffect(() => {
    const listener = () => {
      setStatus("playing");
    };
    document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("keydown", listener);
    };
  });

  return (
    <div className='text-center'>
      <h1 className='text-3xl font-bold text-[#878f8d]'>Time</h1>
      <h1 className='text-7xl font-medium text-[#44504c] mt-5'>{coutDown}</h1>
    </div>
  );
}

export default Time;
