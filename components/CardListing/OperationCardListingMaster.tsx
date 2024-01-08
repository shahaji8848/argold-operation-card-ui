import React from 'react';
import OperationCardListingField from './OperationCardListingField';
import OperationCardListingTable from './OperationCardListingTable';

const OperationCardListingMaster = () => {
  return (
    <div className="container-fuild">
      <div className="spacing-pd">
        <OperationCardListingField />
        <div className="spacing-mt">
          <OperationCardListingTable />
        </div>
      </div>
    </div>
  );
};

export default OperationCardListingMaster;
