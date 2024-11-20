'use client';
import useMeltingLot from '@/hooks/meltingLothook';
import PaginationComponent from '../pagination';
import MeltingLotHeaderButton from './MeltingLotHeaderButton';
import OperationCardFilterOptionSelect from './OperationCardFilterOptionSelect';
import OperationCardTable from './OperationCardTable';

// import meltingLotList from './get_melting_lot_api_response.json';
const MeltingLotDashboardMaster = () => {
  const {
    meltingLotList,
    meltingFiltersList,
    filterOptions,
    handleFilterChange,
    productList,
    handleProductBtnClicked,
    handlePageChange,
  } = useMeltingLot();

  return (
    <div className="container-fluid">
      <div className="spacing-pd mb-3">
        <MeltingLotHeaderButton
          productList={productList}
          meltingFiltersList={meltingFiltersList}
          handleProductBtnClicked={handleProductBtnClicked}
        />
        {/* <OperationCardFiltersOption
          meltingFiltersList={meltingFiltersList}
          filterOptions={filterOptions}
          handleFilterChange={handleFilterChange}
        /> */}
        <OperationCardFilterOptionSelect
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
        {meltingLotList && meltingLotList?.data?.length > 0 && (
          <PaginationComponent handlePageChange={handlePageChange} meltingLotList={meltingLotList} />
        )}

        <OperationCardTable meltingLotList={meltingLotList} />
        {meltingLotList && meltingLotList?.data?.length > 0 && (
          <PaginationComponent handlePageChange={handlePageChange} meltingLotList={meltingLotList} />
        )}
      </div>
    </div>
  );
};

export default MeltingLotDashboardMaster;
