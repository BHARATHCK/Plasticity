import React from 'react';
import Image from 'next/image';
import HeaderItem from './HeaderItem';
import {
  HomeIcon,
  TrendingUpIcon,
  PlayIcon,
  UserGroupIcon,
} from '@heroicons/react/outline';

function Header() {
  return (
    <header className="flex flex-col sm:flex-row justify-between">
      <div className="m-10">
        <Image
          className="ml-10 object-contain"
          width={100}
          height={50}
          src="https://res.cloudinary.com/dhmtg163x/image/upload/v1632664244/Plasticity_ck6iga.png"
          alt="Logo"
        />
      </div>
      <div>
        <button className="mt-10 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          Log In
        </button>

        <button className="mt-10 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          Register
        </button>
      </div>
      <div className="flex justify-evenly max-w-2xl mt-10 mr-10">
        <HeaderItem title="HOME" Icon={HomeIcon} />
        <HeaderItem title="TRENDING" Icon={TrendingUpIcon} />
        <HeaderItem title="EXPLORE" Icon={PlayIcon} />
        <HeaderItem title="COMMUNITY" Icon={UserGroupIcon} />
      </div>
    </header>
  );
}

export default Header;
