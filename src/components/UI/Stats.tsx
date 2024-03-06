import { FaChevronRight } from "react-icons/fa6";
import { MdRestartAlt } from "react-icons/md";

export type STAT_TYPE = {
  charactersTyped: number;
  errors: number;
  numberOfBackspaces: number;
  totalWords: number;
};

type STATS_PROPS = {
  summary: STAT_TYPE;
  restartGame: () => void;
  time: number;
  testHolder: {
    index: number;
    status: "idle" | "correct" | "incorrect";
    revisited?: boolean;
  }[];
};

function Stats({ summary, restartGame, time, testHolder }: STATS_PROPS) {
  console.log("🚀 ~ Stats ~ testHolder:", testHolder);

  const charactersTyped = testHolder.reduce((acc, curr) => {
    if (curr.status !== "idle") {
      return acc + 1;
    }
    return acc;
  }, 0);

  const totalNetCharacters = testHolder.reduce((acc, curr) => {
    if (curr.status === "correct") {
      acc++;
    } else if (curr.status === "incorrect") {
      acc--;
    }
    return acc;
  }, 0);

  const correctCharacters = testHolder.filter(
    (item) => item.status === "correct"
  ).length;

  const accuracy = Math.floor((correctCharacters / charactersTyped) * 100);

  // const totalNetCharacters = correctCount - incorrectCount;

  // let totalNetCharacters =
  //   summary.charactersTyped - (summary.errors - summary.numberOfBackspaces);
  // if (totalNetCharacters < 0) totalNetCharacters = 0;
  const netWordsTyped =
    totalNetCharacters > 0 ? Math.floor(totalNetCharacters / 5) : 0;
  const wordsPerMinute =
    totalNetCharacters > 0
      ? Math.floor(totalNetCharacters / ((5 * time) / 60))
      : 0;

  return (
    <>
      <div className='text-2xl grid grid-cols-3 gap-10'>
        <div className='text-start space-y-1'>
          <h1 className='text-gray-primary'>wmp</h1>
          <h1 className='text-green-primary text-7xl font-semibold'>
            {wordsPerMinute}
          </h1>
        </div>
        <div className='text-start space-y-1'>
          <h1 className='text-gray-primary'>acw</h1>
          <h1 className='text-green-primary text-7xl font-semibold'>
            {totalNetCharacters}
          </h1>
        </div>
        <div className='text-start space-y-1'>
          <h1 className='text-gray-primary'>errors</h1>
          <h1 className='text-green-primary text-7xl font-semibold'>
            {summary.errors}
          </h1>
        </div>
        <div className='text-start space-y-1'>
          <h1 className='text-gray-primary'>accuracy</h1>
          <h1 className='text-green-primary text-7xl font-semibold'>
            {accuracy}%
          </h1>
        </div>
        <div className='text-start space-y-1'>
          <h1 className='text-gray-primary'>nwt</h1>
          <h1 className='text-green-primary text-7xl font-semibold'>
            {netWordsTyped}
          </h1>
        </div>
      </div>

      <div className='flex gap-5 mt-10 text-2xl'>
        <div className='hover:bg-graytext-gray-primary rounded-full p-2 cursor-pointer'>
          <FaChevronRight />
        </div>
        <div
          className='hover:bg-graytext-gray-primary rounded-full p-2 cursor-pointer'
          onClick={restartGame}
        >
          <MdRestartAlt />
        </div>
      </div>
    </>
  );
}

export default Stats;
