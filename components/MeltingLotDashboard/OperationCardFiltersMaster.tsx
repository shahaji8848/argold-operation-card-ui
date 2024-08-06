import React from 'react';
import OperationCardTable from './OperationCardTable';
import OperationCardFiltersOption from './OperationCardFIlterOption';
import useMeltingLot from '@/hooks/meltingLothook';

const MeltingLotDashboardMaster = () => {
  const {
    meltingFiltersList,
    meltingLotList,
    productOption,
    categoryOption,
    machineSizeOption,
    designOption,
    cuttingProcessOption,
    statusOption,
    purityOption,
    handleProductChange,
    handleCategoryChange,
    handleMachineSizeChange,
    handleDesignChange,
    handleCuttingProcessChange,
    handleStatusChange,
    handlePurityChange,
  } = useMeltingLot();
  return (
    <div className="container-fluid">
      <div className="spacing-pd">
        <OperationCardFiltersOption
          meltingFiltersList={meltingFiltersList}
          productOption={productOption}
          categoryOption={categoryOption}
          machineSizeOption={machineSizeOption}
          designOption={designOption}
          cuttingProcessOption={cuttingProcessOption}
          statusOption={statusOption}
          purityOption={purityOption}
          handleProductChange={handleProductChange}
          handleCategoryChange={handleCategoryChange}
          handleMachineSizeChange={handleMachineSizeChange}
          handleDesignChange={handleDesignChange}
          handleCuttingProcessChange={handleCuttingProcessChange}
          handleStatusChange={handleStatusChange}
          handlePurityChange={handlePurityChange}
        />
        <OperationCardTable meltingLotList={meltingLotList} />
      </div>
    </div>
  );
};

export default MeltingLotDashboardMaster;
