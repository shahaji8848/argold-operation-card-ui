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
    handleKeyDownEnter,
  } = useOperationCardList();
  return (
    <div className="container-fuild">
      <div className="spacing-pd">
        <OperationCardListingField
          filtersData={filtersData}
          handleInputChange={handleInputChange}
          handleApplyFilters={handleApplyFilters}
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
