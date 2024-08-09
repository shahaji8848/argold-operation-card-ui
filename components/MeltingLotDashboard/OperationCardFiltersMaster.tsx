import React from 'react';
import useMeltingLot from '@/hooks/meltingLothook';
import MeltingLotHeaderButton from './MeltingLotHeaderButton';
import OperationCardFiltersOption from './OperationCardFIlterOption';
import OperationCardTable from './OperationCardTable';

const MeltingLotDashboardMaster = () => {
  const { meltingFiltersList, meltingLotList, filterOptions, handleFilterChange, productList, handleProductBtnClicked } =
    useMeltingLot();
  return (
    <div className="container-fluid">
      <div className="spacing-pd mb-3">
        <MeltingLotHeaderButton
          productList={productList}
          meltingFiltersList={meltingFiltersList}
          handleProductBtnClicked={handleProductBtnClicked}
        />
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
