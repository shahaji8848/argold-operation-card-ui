import React from 'react';
import LossReportDetail from './LossReportDetailTable';
import LossReportDetailTable from './LossReportDetailTable';

const MasterLossReportDetail = () => {
  return (
    <div className="spacing-mt spacing-pd">
      <div className="row">
        {/* <div className="col-md-2"></div> */}
        <div className="col-md-12 mt-3">
          {/* <div className="container"> */}
          <LossReportDetailTable />
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default MasterLossReportDetail;
