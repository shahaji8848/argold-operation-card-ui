import React from 'react';
import useMeltingLot from '@/hooks/meltingLothook';
import MeltingLotHeaderButton from './MeltingLotHeaderButton';
import OperationCardFiltersOption from './OperationCardFIlterOption';
import OperationCardTable from './OperationCardTable';

const MeltingLotDashboardMaster = () => {
  const { meltingFiltersList, meltingLotList, filterOptions, handleFilterChange, buttonLabel } = useMeltingLot();
  return (
    <div className="container-fluid">
      <div className="spacing-pd">
        <MeltingLotHeaderButton buttonLabel={buttonLabel} />
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
