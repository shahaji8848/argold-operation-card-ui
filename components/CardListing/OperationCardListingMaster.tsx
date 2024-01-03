'use client';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import OperationCardListingField from './OperationCardListingField';
import OperationCardListingTable from './OperationCardListingTable';

const OperationCardListingMaster = () => {
  return (
    <div className='container-fuild'>
      <OperationCardListingField />
      <OperationCardListingTable />
    </div>
  );
};

export default OperationCardListingMaster;
