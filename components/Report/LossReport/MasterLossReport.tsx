import React from 'react';
import LossReportTable from './LossReportTable';
import LossReport from './LossReport';

const MasterLossReport = () => {
  return (
    <div className="spacing-mt spacing-pd">
      <div className="row">
        {/* <div className="col-md-2"></div> */}
        <div className="col-md-12">
          {/* <div className="container"> */}
          <LossReport />
          <LossReportTable />
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default MasterLossReport;
