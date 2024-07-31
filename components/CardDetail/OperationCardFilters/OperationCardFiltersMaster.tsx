import React from 'react';
import OperationCardFilters from './OperationCardFilters';
import OperationCardTable from './OperationCardTable';
import OperationCardFiltersOption from './OperationCardFIlterOption';

const OperationCardFiltersMaster = () => {
  return (
    <>
      {/* <OperationCardFilters /> */}
      <OperationCardFiltersOption />
      <OperationCardTable />
    </>
  );
};

export default OperationCardFiltersMaster;
