import { useCallback, useRef, useState } from "react";
import Nav from "./components/UI/Nav";
import Timer from "./components/UI/Timer";
import Words from "./components/UI/Words";
import useRestart from "./hooks/useRestart.js";
import Stats from "./components/UI/Stats.js";
import Menu from "./components/UI/Menu.js";

type STATUS_TYPE = "idle" | "playing" | "ended";

function App() {
  const [timer, setTimer] = useState<number>(15);
  const [status, setStatus] = useState<STATUS_TYPE>("idle");
  const mainRef = useRef<HTMLDivElement | null>(null);
  const statRef = useRef({
    charactersTyped: 0,
    errors: 0,
    numberOfBackspaces: 0,
    totalWords: 0,
  });

  const testHolder = useRef([]);

  console.log("🚀 ~ useEffect ~ current:", statRef.current);

  const { restart, restartKey } = useRestart();

  const startGame = useCallback(() => {
    setStatus("playing");
  }, []);

  const finishGame = useCallback(() => {
    setStatus("ended");
  }, []);

  const restartGame = useCallback(() => {
    setStatus("idle");
  }, []);

  function handleTimeChange(num: number) {
    setTimer(() => num);
  }

  return (
    <main
      className='bg-[#121716] min-h-[100dvh] text-white xl:w-[70%] mx-auto'
      ref={mainRef}
    >
      <Nav />
      <section
        className='w-full flex flex-col justify-center items-center mt-16'
        key={restartKey}
      >
        {status !== "playing" && (
          <Menu time={timer} handleTimeChange={handleTimeChange} />
        )}
        <Timer timer={timer} status={status} finishGame={finishGame} />
        <div className='mt-24'>
          {status !== "ended" && (
            <Words
              onRestart={restart}
              startGame={startGame}
              summary={statRef.current}
              testHolder={testHolder.current}
            />
          )}
          {status === "ended" && (
            <Stats
              summary={statRef.current}
              restartGame={restartGame}
              time={timer}
              testHolder={testHolder.current}
            />
          )}
        </div>
      </section>
    </main>
  );
}
export default App;

///FOCUSING ON THE DIV////

// const [focused, setFocused] = useState<boolean>(true);

// useEffect(() => {
//   const focusRef = mainRef.current;
//   const focusInListener = () => {
//     console.log("focused IN");
//     setFocused(true);
//   };
//   if (focusRef) focusRef.addEventListener("focusin", focusInListener);

//   return () => {
//     if (focusRef) focusRef.removeEventListener("focusin", focusInListener);
//   };
// }, []);

// useEffect(() => {
//   const focusRef = mainRef.current;

//   const focusOutListener = () => {
//     console.log("focused OUT");
//     setFocused(false);
//   };
//   if (focusRef) focusRef.addEventListener("focusout", focusOutListener);

//   return () => {
//     if (focusRef) focusRef.removeEventListener("focusin", focusOutListener);
//   };
// }, []);
