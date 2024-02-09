import { useRouter } from 'next/navigation';
import React from 'react';

const LossReport = () => {
  const router = useRouter();
  const redirectToHomepage = () => {
    router.push('/');
  };
  return (
    <>
      <div className="blue text-uppercase fw-semibold fs-14 my-3 d-flex">
        Loss Report
        <button
          className="btn btn-grey px-4 px-1 btn-py "
          onClick={redirectToHomepage}
        >
          Back
        </button>
      </div>
    </>
  );
};

export default LossReport;
