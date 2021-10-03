import React from 'react';
import NextLink from 'next/link';

function Subscribe() {
  return (
    <div className="flex items-center justify-center mb-20">
      <div className="shadow-lg w-72">
        <div className="flex flex-col items-center justify-center text-center space-y-4 p-10">
          <div className="font-semibold text-lg">Basic</div>
          <div className="text-gray-400">Flexible Timing</div>

          <div className="text-gray-400">Live sessions on weekends </div>
          <div className="text-gray-400">Real world projects </div>
          <div className="text-gray-400">Access to community of peers</div>
          <div className="text-gray-400">
            Recordings of live sessions for future access
          </div>
          <div className="font-bold">&#8377; 1500</div>
          <NextLink href="/payment">
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
              Subscribe
            </button>
          </NextLink>
        </div>
      </div>
    </div>
  );
}

export default Subscribe;
