import { FaChevronRight } from "react-icons/fa6";
import { MdRestartAlt } from "react-icons/md";

type STAT_TYPE = {
  wpm: number;
  acc: number;
  time: number;
  language: string;
  raw: number;
};

const sample: STAT_TYPE = {
  wpm: 20,
  acc: 50,
  time: 30,
  language: "english",
  raw: 254,
};

type STATS_PROPS = {
  restart: () => void;
};

function Stats({ restart }: STATS_PROPS) {
  return (
    <>
      <div className='text-2xl grid grid-cols-3 gap-10'>
        <div className='text-start space-y-1'>
          <h1 className='text-[#616c6a]'>wmp</h1>
          <h1 className='text-[#1cad7a] text-7xl font-semibold'>
            {sample.wpm}
          </h1>
        </div>
        <div className='text-start space-y-1'>
          <h1 className='text-[#616c6a]'>acc</h1>
          <h1 className='text-[#1cad7a] text-7xl font-semibold'>
            {sample.acc}
          </h1>
        </div>
        <div className='text-start space-y-1'>
          <h1 className='text-[#616c6a]'>time</h1>
          <h1 className='text-[#1cad7a] text-7xl font-semibold'>
            {sample.time}
          </h1>
        </div>
        <div className='text-start space-y-1'>
          <h1 className='text-[#616c6a]'>language</h1>
          <h1 className='text-[#1cad7a] text-xl font-semibold'>
            {sample.language}
          </h1>
        </div>
        <div className='text-start space-y-1'>
          <h1 className='text-[#616c6a]'>raw</h1>
          <h1 className='text-[#1cad7a] text-xl font-semibold'>{sample.raw}</h1>
        </div>
      </div>

      <div className='flex gap-5 mt-10 text-2xl'>
        <div className='hover:bg-[#616c6a] rounded-full p-2 cursor-pointer'>
          <FaChevronRight />
        </div>
        <div
          className='hover:bg-[#616c6a] rounded-full p-2 cursor-pointer'
          onClick={restart}
        >
          <MdRestartAlt />
        </div>
      </div>
    </>
  );
}

export default Stats;
