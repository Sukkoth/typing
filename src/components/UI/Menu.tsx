type MENU_PROPS = {
  time: number;
  // eslint-disable-next-line no-unused-vars
  handleTimeChange: (num: number) => void;
};

function Menu({ time = 15, handleTimeChange }: MENU_PROPS) {
  const durationOptions = [15, 30, 60, 120];

  return (
    <div className='flex gap-5'>
      {durationOptions.map((duration) => (
        <p
          key={duration}
          onClick={() => handleTimeChange(duration)}
          className={`cursor-pointer ${
            time === duration ? "text-[#1cad7a]" : ""
          }`}
        >
          {duration}
        </p>
      ))}
    </div>
  );
}

export default Menu;
