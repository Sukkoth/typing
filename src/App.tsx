import { useCallback, useEffect, useState } from "react";
import Nav from "./components/UI/Nav";
import Timer from "./components/UI/Timer";
import Words from "./components/UI/Words";
import useRestart from "./hooks/useRestart.js";
import Stats from "./components/UI/Stats.js";
import Menu from "./components/UI/Menu.js";

export type STATUS = "idle" | "playing" | "finished";

function App() {
  const [time, setTime] = useState<number>(15);
  const [status, setStatus] = useState<STATUS>("idle");
  const [errors, setErrors] = useState<number>(0);

  const { restart, restartKey } = useRestart(setStatus);

  const finishExam = useCallback(() => {
    setStatus("finished");
  }, []);

  function handleTimeChange(num: number) {
    setTime(() => num);
  }

  function handleRestart() {
    setStatus("idle");
  }

  return (
    <main className='bg-[#121716] min-h-[100dvh] text-white xl:w-[70%] mx-auto'>
      <Nav />
      <section className='w-full flex flex-col justify-center items-center mt-16'>
        {status}
        {status !== "playing" && (
          <Menu time={time} handleTimeChange={handleTimeChange} />
        )}
        <Timer
          time={time}
          onFinish={finishExam}
          status={status}
          setStatus={setStatus}
        />
        <div className='mt-24'>
          {status !== "finished" && (
            <Words
              onRestart={handleRestart}
              errors={errors}
              onError={setErrors}
              status={status}
              setStatus={setStatus}
              key={status}
            />
          )}
          {status === "finished" && <Stats restart={restart} />}
        </div>
      </section>
    </main>
  );
}
export default App;
