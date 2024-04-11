'use client';

import Image from 'next/image';
import React from 'react';

const Error = ({ error, reset }: any) => (
  <div className="vertical-center text-center mt-5 pt-5">
    <Image src="/not-found.png" width={180} height={180} alt="Picture of the author" />
    {/* <p className="mt-3">{error.message}</p> */}
    <p className="mt-2">Something went wrong!</p>
    <button onClick={reset} className="btn btn-blue  px-4 ms-2 px-1 btn-py ">
      Retry
    </button>
  </div>
);

export default Error;
