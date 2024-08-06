import React from 'react';
import OperationCardTable from './OperationCardTable';
import OperationCardFiltersOption from './OperationCardFIlterOption';
import useMeltingLot from '@/hooks/meltingLothook';

const MeltingLotDashboardMaster = () => {
  const { meltingFiltersList, meltingLotList, filterOptions, handleFilterChange } = useMeltingLot();
  return (
    <div className="container-fluid">
      <div className="spacing-pd">
        <OperationCardFiltersOption
          meltingFiltersList={meltingFiltersList}
          filterOptions={filterOptions}
          handleFilterChange={handleFilterChange}
        />
        <OperationCardTable meltingLotList={meltingLotList} />
      </div>
    </div>
  );
};

export default MeltingLotDashboardMaster;
