import { PiHouseBold } from "react-icons/pi";
import icon from "/keyboard.png";

function Nav() {
  return (
    <nav className='flex justify-between px-5 py-10 items-center font-bold'>
      <div className='flex items-center gap-3'>
        <h1 className='text-2xl'>Typy</h1>
        <img src={icon} alt='icon.png' className='w-10' />
      </div>
      <div className='flex gap-6 items-center'>
        <p className='text-[#44504c]'>Practice mode</p>
        <p className='text-[#1b9e70] bg-[#2c3534] flex items-center gap-2 px-4 py-1 rounded-2xl'>
          <PiHouseBold /> Home
        </p>
      </div>
    </nav>
  );
}

export default Nav;
