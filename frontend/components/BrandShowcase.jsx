import {
  PresentationChartBarIcon,
  AcademicCapIcon,
  ClipboardCheckIcon,
} from '@heroicons/react/outline';
import { useState } from 'react';
import Image from 'next/image';

function BrandShowcase() {
  const [selectedCard, setSelectedCard] = useState('mentor');

  return (
    <div className="bg-custom-blue">
      <div className=" flex flex-row sm:items-center space-x-10 sm:space-x-28 sm:justify-center text-white mt-20 overflow-x-auto">
        <div
          className={`w-40 h-24 cursor-pointer sm:w-40 sm:h-40 border-2 rounded-3xl ${
            selectedCard === 'mentor'
              ? 'bg-white text-black transition duration-1000'
              : ''
          } `}
          onClick={() => {
            setSelectedCard('mentor');
          }}
        >
          <div className="m-5 flex flex-row sm:flex-col items-center">
            <ClipboardCheckIcon className="w-5 sm:w-12" />
            <p className="m-5">Mentor</p>
          </div>
        </div>

        <div
          className={`w-40 h-24 cursor-pointer sm:w-40 sm:h-40 border-2 rounded-3xl ${
            selectedCard === 'campaigns'
              ? 'bg-white text-black transition duration-1000'
              : ''
          } `}
          onClick={() => {
            setSelectedCard('campaigns');
          }}
        >
          <div className="m-5 flex flex-row sm:flex-col items-center">
            <PresentationChartBarIcon className="w-5 sm:w-12" />
            <p className="m-5">Campaigns</p>
          </div>
        </div>

        <div
          className={`w-40 h-24 cursor-pointer sm:w-40 sm:h-40 border-2 rounded-3xl ${
            selectedCard === 'improve'
              ? 'bg-white text-black transition duration-1000'
              : ''
          } `}
          onClick={() => {
            setSelectedCard('improve');
          }}
        >
          <div className="m-5 flex flex-row sm:flex-col items-center">
            <AcademicCapIcon className="w-5 sm:w-12" />
            <p className="m-5">Improve</p>
          </div>
        </div>
      </div>
      <div className="mt-10 flex items-center justify-center mb-20">
        <div className="sm:w-2/4 sm:h-2/4 w-full h-full m-2 sm:m-0">
          <Image
            src={`${
              selectedCard === 'mentor'
                ? 'https://res.cloudinary.com/dhmtg163x/image/upload/v1632721698/placeholder_mentor_ukvybp.png'
                : selectedCard === 'improve'
                ? 'https://res.cloudinary.com/dhmtg163x/image/upload/v1632722544/placeholder_improve_tg4r6d.png'
                : 'https://res.cloudinary.com/dhmtg163x/image/upload/v1632722544/placeholder_campaigns_akplon.png'
            }`}
            width="985px"
            height="565px"
            alt="no image"
            layout="responsive"
          ></Image>
        </div>
      </div>
      <div className="mt-5 mb-10 text-white flex items-center justify-center">
        <h2 className="text-2xl items-center text-center">
          Gain skills, have fun, and build a better you.
          <br />
          Trusted by over 40,000 students.
        </h2>
      </div>
      <div className="w-full h-32 flex flex-row overflow-hidden space-x-6">
        {[...Array(40)].map((element, index) => (
          <div key={index} className="text-gray-500 text-xl">
            PLACEHOLDER COMPANY
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrandShowcase;
