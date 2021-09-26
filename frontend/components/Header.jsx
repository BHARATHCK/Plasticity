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
    <header className="flex flex-col sm:flex-row">
      <div className="flex flex-grow justify-evenly max-w-2xl mt-10">
        <HeaderItem title="HOME" Icon={HomeIcon} />
        <HeaderItem title="TRENDING" Icon={TrendingUpIcon} />
        <HeaderItem title="EXPLORE" Icon={PlayIcon} />
        <HeaderItem title="COMMUNITY" Icon={UserGroupIcon} />
      </div>
      <Image
        className="object-contain"
        width={100}
        height={50}
        src="https://res.cloudinary.com/dhmtg163x/image/upload/v1632664244/Plasticity_ck6iga.png"
        alt="Logo"
      />
    </header>
  );
}

export default Header;
