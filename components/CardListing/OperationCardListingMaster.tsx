import React from 'react';
import OperationCardListingField from './OperationCardListingField';
import OperationCardListingTable from './OperationCardListingTable';

const OperationCardListingMaster = () => {
  return (
    <div className="container-fuild">
      <div className="px-2">
        <OperationCardListingField />
        <OperationCardListingTable />
      </div>
    </div>
  );
};

export default OperationCardListingMaster;
