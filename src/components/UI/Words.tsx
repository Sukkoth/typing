import { useEffect, useState } from 'react';
import { RxReload } from 'react-icons/rx';
import { alphabets } from '../../data';

function Words({ onRestart }: { onRestart: () => void }) {
  const [index, setIndex] = useState<number>(0);

  function isAlphabet(key: string) {
    return /^[a-zA-Z ]$/.test(key);
  }

  useEffect(() => {
    const listener = (e: KeyboardEvent): void => {
      if (isAlphabet(e.key)) {
        console.log(e.key, alphabets[index], index);
        const alpha = document.getElementById(`${index}`);
        if (alpha) {
          if (e.key.toUpperCase() === alphabets[index].toUpperCase()) {
            alpha.style.color = '#1cad7a';
          } else {
            alpha.style.color = 'red';
          }
        }

        //    if (event.keyCode === 8) {
        setIndex((prev) => prev + 1);
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [index]);

  return (
    <>
      <div className=' text-[#616c6a] text-xl tracking-wider leading-10'>
        <Alphabet current={index} />
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
  return alphabets.split('').map((alpha, index) => (
    <span
      id={`${index}`}
      key={index}
      className={`${current === index ? 'current' : ''}`}
    >
      {alpha}
    </span>
  ));
}

export default Words;
