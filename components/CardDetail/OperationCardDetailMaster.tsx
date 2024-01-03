'use client';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import OperationCardReceiptItem from './OperationCardReceiptItem';
import OperationCardIssueItem from './OperationCardIssueItem';
import SelectKarigar from './SelectKarigar';

const OperationCardDetailMaster = () => {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <SelectKarigar />
          </div>
          <div className="col-md-6"></div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <OperationCardReceiptItem />
          </div>
          <div className="col-md-6">
            <OperationCardIssueItem />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationCardDetailMaster;
