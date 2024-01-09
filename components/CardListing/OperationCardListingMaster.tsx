import React from 'react';
import OperationCardListingField from './OperationCardListingField';
import OperationCardListingTable from './OperationCardListingTable';
import useOperationCardList from '@/hooks/operation-card-list-hook/operation-card-list-hook';

const OperationCardListingMaster = () => {
  const {
    listData,
    filtersData,
    handleInputChange,
    handleApplyFilters,
    handleClearFilters,
    handleKeyDownEnter,
  } = useOperationCardList();
  return (
    <div className="container-fuild">
      <div className="row spacing-pd mt-3">
        <div className="col-md-10"></div>
        <div className="col-md-2 text-end">
          <button
            className="btn btn-secondary fs-13 px-4 px-1 btn-py "
            // onClick={redirectToHomepage}
          >
            Back
          </button>
        </div>
      </div>
      <div className="spacing-pd">
        <OperationCardListingField
          filtersData={filtersData}
          handleInputChange={handleInputChange}
          handleApplyFilters={handleApplyFilters}
          handleClearFilters={handleClearFilters}
          handleKeyDownEnter={handleKeyDownEnter}
        />
        <div className="spacing-mt">
          <OperationCardListingTable data={listData} />
        </div>
      </div>
    </div>
  );
};

export default OperationCardListingMaster;
