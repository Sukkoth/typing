import { Dispatch, SetStateAction } from "react";

type MENU_PROPS = {
  time: number;
  handleTimeChange: (num: number) => void;
};

function Menu({ time = 15, handleTimeChange }: MENU_PROPS) {
  return (
    <div className='flex gap-5'>
      <p
        onClick={() => handleTimeChange(15)}
        className={`cursor-pointer ${time === 15 ? "text-[#1cad7a]" : ""}`}
      >
        15
      </p>
      <p
        onClick={() => handleTimeChange(30)}
        className={`cursor-pointer ${time === 30 ? "text-[#1cad7a]" : ""}`}
      >
        30
      </p>
      <p
        onClick={() => handleTimeChange(60)}
        className={`cursor-pointer ${time === 60 ? "text-[#1cad7a]" : ""}`}
      >
        60
      </p>
      <p
        onClick={() => handleTimeChange(120)}
        className={`cursor-pointer ${time === 120 ? "text-[#1cad7a]" : ""}`}
      >
        120
      </p>
    </div>
  );
}

export default Menu;
