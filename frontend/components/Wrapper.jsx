import React from 'react';

function Wrapper({ children }) {
  return (
    <div className="w-11/12 sm:w-10/12 mx-auto flex flex-col">
      <div className="">
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Wrapper;
