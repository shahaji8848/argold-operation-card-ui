import React from 'react';
// import OperationCardFilters from './OperationCardFilters';
import OperationCardTable from './OperationCardTable';
import OperationCardFiltersOption from './OperationCardFIlterOption';
import useMeltingLot from '@/hooks/meltingLothook';

const MeltingLotDashboardMaster = () => {
  const {
    meltingFiltersList,
    meltingLotList,
    categoryOneOption,
    machineSizeOption,
    chainMakingOption,
    filterPurityOption,
    handleCategoryOneChange,
    handleMachineSizeChange,
    handleChainMakingChange,
    handleFilterPurityChange,
  } = useMeltingLot();
  return (
    <div className="container-fluid">
      <div className="spacing-pd">
        {/* <OperationCardFilters /> */}
        <OperationCardFiltersOption
          meltingFiltersList={meltingFiltersList}
          categoryOneOption={categoryOneOption}
          machineSizeOption={machineSizeOption}
          chainMakingOption={chainMakingOption}
          filterPurityOption={filterPurityOption}
          handleCategoryOneChange={handleCategoryOneChange}
          handleMachineSizeChange={handleMachineSizeChange}
          handleChainMakingChange={handleChainMakingChange}
          handleFilterPurityChange={handleFilterPurityChange}
        />
        <OperationCardTable meltingLotList={meltingLotList} />
      </div>
    </div>
  );
};

export default MeltingLotDashboardMaster;
