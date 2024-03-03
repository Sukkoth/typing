import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { RxReload } from "react-icons/rx";
import { alphabets } from "../../data";
import { STATUS } from "../../App";

type WORDS_PROPS = {
  onRestart: () => void;
  errors: number;
  onError: Dispatch<SetStateAction<number>>;
  status: STATUS;
  setStatus: Dispatch<SetStateAction<STATUS>>;
};

function Words({ onRestart, onError, status, setStatus }: WORDS_PROPS) {
  const [index, setIndex] = useState<number>(0);

  function isAlphabet(key: string) {
    return /^[a-zA-Z ]$/.test(key);
  }

  useEffect(() => {
    const listener = (e: KeyboardEvent): void => {
      if (isAlphabet(e.key)) {
        const alpha = document.getElementById(`${index}`);
        if (alpha) {
          if (e.key.toUpperCase() === alphabets[index].toUpperCase()) {
            alpha.style.color = "#1cad7a";
          } else {
            alpha.style.color = "red";
            onError((prev) => prev + 1);
          }
          setIndex((prev) => prev + 1);
        }
      } else if (e.key === "Backspace") {
        if (index <= 0) return;
        setIndex((prev) => prev - 1);
        const alpha = document.getElementById(`${index - 1}`);
        if (alpha) {
          alpha.style.color = "#616c6a";
        }
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [index, onError, status, setStatus]);

  return (
    <>
      <div className=' text-[#616c6a] text-xl tracking-wider leading-10 px-5'>
        <Alphabet current={index} />
      </div>

      {status === "playing" && (
        <div className='w-full flex justify-center mt-10'>
          <h1
            className='flex items-center gap-3 hover:opacity-80 cursor-pointer'
            onClick={onRestart}
          >
            <span className='text-[#d5c959]'>
              <RxReload />
            </span>
            Start Over
          </h1>
        </div>
      )}
    </>
  );
}

function Alphabet({ current }: { current: number }) {
  return alphabets.split("").map((alpha, index) => (
    <span
      id={`${index}`}
      key={index}
      className={`${current === index ? "current" : ""}`}
    >
      {alpha}
    </span>
  ));
}

export default Words;
