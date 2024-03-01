import { useState } from 'react';
import Nav from './components/UI/Nav';
import Timer from './components/UI/Timer';
import Words from './components/UI/Words';
import useRestart from './hooks/useRestart.js';

function App() {
  const [timer, setTimer] = useState<number>(10);

  const { restart, restartKey } = useRestart();

  return (
    <main className='bg-[#121716] min-h-[100dvh] text-white xl:w-[70%] mx-auto'>
      <Nav />
      <section
        className='w-full flex flex-col justify-center items-center mt-16'
        key={restartKey}
      >
        <Timer timer={timer} />
        <div className='mt-24'>
          <Words onRestart={restart} />
        </div>
      </section>
    </main>
  );
}
export default App;
