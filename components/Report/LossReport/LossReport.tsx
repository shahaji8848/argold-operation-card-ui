import React from 'react';

const LossReport = () => {
  return (
    <>
      <div className="blue text-uppercase fw-semibold fs-14 my-3">
        Loss Report
      </div>
      <div className="row ">
        <div className="col-md-2">
          <div className=" fs-14 ">
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-9">
                <div className="col-md-12 fw-semibold">Select factory:</div>
                <div className="col-md-12 blue fw-semibold">(Sep 2023)</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-10">
          <div className="row">
            <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 fs-14 p-0 blue fw-semibold">
              AR Gold(Apr 2023)
            </div>
            <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 fs-14 p-0 blue fw-semibold">
              ARF (Apr 2023)
            </div>
            <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 fs-14 p-0  blue fw-semibold">
              ARC (Apr 2023)
            </div>
            <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 fs-14 p-0 fw-semibold text-decoration-underline">
              AR Gold(Sep 2023)
            </div>
            <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 fs-14 p-0 blue fw-semibold">
              ARF (Sep 2023)
            </div>
            <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 fs-14 p-0 blue fw-semibold">
              ARC
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LossReport;
