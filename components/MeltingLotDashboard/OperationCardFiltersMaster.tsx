import React from 'react';
import useMeltingLot from '@/hooks/meltingLothook';
import MeltingLotHeaderButton from './MeltingLotHeaderButton';
import OperationCardFiltersOption from './OperationCardFIlterOption';
import OperationCardTable from './OperationCardTable';
import OperationCardTableDataset from './OperationCardTableDataset';
// import meltingLotList from './get_melting_lot_api_response.json';
const MeltingLotDashboardMaster = () => {
  const { meltingLotList, meltingFiltersList, filterOptions, handleFilterChange, productList, handleProductBtnClicked } =
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
        {/* <OperationCardTableDataset /> */}
        {/* {meltingLotList?.data?.map((productData: any, index: number) => {
          const productType: string[] = productData.product;
          const columns = meltingLotList?.columns || [];

          // Filter data based on productType
          // const filteredData = meltingLotList?.data?.filter((d: any) => d.product === productType);

          return (
            <OperationCardTableDataset
              key={index}
              productType={productType}
              columns={columns}
              // data={filteredData.flatMap((d: any) => d.linked_operations)}
              data={meltingLotList}
            />
          );
        })} */}
        <OperationCardTable meltingLotList={meltingLotList} />
      </div>
    </div>
  );
};

export default MeltingLotDashboardMaster;
