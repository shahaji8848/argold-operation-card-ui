import React from 'react';
import OperationCardFilters from './OperationCardFilters';
import OperationCardTable from './OperationCardTable';
import OperationCardFiltersOption from './OperationCardFIlterOption';

const OperationCardFiltersMaster = ({
  meltingFiltersList,
  meltingLotList,
  filterMeltingOptionValue,
  handleSelectFilterMeltingChange,
}: any) => {
  return (
    <>
      {/* <OperationCardFilters /> */}
      <OperationCardFiltersOption
        meltingFiltersList={meltingFiltersList}
        filterMeltingOptionValue={filterMeltingOptionValue}
        handleSelectFilterMeltingChange={handleSelectFilterMeltingChange}
      />
      <OperationCardTable meltingLotList={meltingLotList} />
    </>
  );
};

export default OperationCardFiltersMaster;
