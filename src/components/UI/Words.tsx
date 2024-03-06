import { useEffect, useState } from "react";
import { RxReload } from "react-icons/rx";
import { LIBRARY } from "../../data";
import { STAT_TYPE } from "./Stats";

type WORDS_PROPS = {
  onRestart: () => void;
  startGame: () => void;
  summary: STAT_TYPE;
  testHolder: {
    alphabet: string;
    status: "idle" | "correct" | "incorrect";
    revisited?: boolean;
  }[];
};

const alphabets = LIBRARY[Math.floor(Math.random() * LIBRARY.length)];

function Words({ onRestart, startGame, summary, testHolder }: WORDS_PROPS) {
  const [index, setIndex] = useState<number>(0);

  function isAlphabet(key: string) {
    return /^[a-zA-Z ]$/.test(key);
  }

  useEffect(() => {
    const listener = (e: KeyboardEvent): void => {
      if (isAlphabet(e.key)) {
        startGame();
        const alpha = document.getElementById(`${index}`);
        if (alpha) {
          if (e.key.toLowerCase() === alphabets[index].toLowerCase()) {
            alpha.style.color = "#1cad7a";
            summary.charactersTyped++;
            testHolder[index] = {
              ...testHolder[index],
              alphabet: alphabets[index].toLowerCase(),
              status: "correct",
            };
          } else {
            alpha.style.color = "red";
            summary.errors++;
            testHolder[index] = {
              ...testHolder[index],
              alphabet: alphabets[index].toLowerCase(),
              status: "incorrect",
            };
          }
        }
        setIndex((prev) => prev + 1);
      } else if (e.key === "Backspace") {
        if (index <= 0) return;
        setIndex((prev) => prev - 1);
        const alpha = document.getElementById(`${index - 1}`);
        if (alpha) {
          alpha.style.color = "#616c6a";
          summary.charactersTyped--;
          summary.numberOfBackspaces++;
          testHolder[index] = {
            alphabet: alphabets[index].toLowerCase(),
            status: "idle",
            revisited: true,
          };
        }
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [index, startGame, summary]);

  return (
    <>
      <div
        className='text-gray-primary text-lg lg:text-md tracking-wider leading-10 px-5 text-justify relative focus:border-none focus:outline-none'
        tabIndex={1}
      >
        <Alphabet current={index} />
        {/* {!focused && (
          <div className='absolute inset-0 bg-white-50/15 backdrop-blur-[2px]'>
            <div className='h-full w-full flex items-center justify-center cursor-pointer'>
              <h1 className='text-3xl font-medium text-white '>
                Click here to focus
              </h1>
            </div>
          </div>
        )} */}
      </div>

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
