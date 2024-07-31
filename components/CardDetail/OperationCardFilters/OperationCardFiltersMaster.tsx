import React from 'react';
import OperationCardFilters from './OperationCardFilters';
import OperationCardTable from './OperationCardTable';
import OperationCardFiltersOption from './OperationCardFIlterOption';

const OperationCardFiltersMaster = ({ meltingLotList }: any) => {
  return (
    <>
      {/* <OperationCardFilters /> */}
      <OperationCardFiltersOption />
      <OperationCardTable meltingLotList={meltingLotList} />
    </>
  );
};

export default OperationCardFiltersMaster;
