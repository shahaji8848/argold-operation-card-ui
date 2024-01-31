import React from 'react';
import OperationCardReceiptItem from './OperationCardReceiptItem';
import OperationCardReceiptButton from './OperationCardReceiptButton';
import OCIssueReferenceTable from './OC-Issue-Reference-Table/OCIssueReferenceTableItem';
import { DummyTable } from '../../../../DataSet/dummy';
import OCGoldAccessoryTableItem from './OC-Gold-Accessory-Table/OCGoldAccessoryTableItem';

const OperationCardReceiptMaster = ({
  search,
  goldAccessoryTable,
  issueReference,
  getOperationCardDetailNextKarigarFunc,
  getOperationCardDetailNextProductProcessAPICallFunc,
  getOperationCardDetailNextProductProcessDepartmentAPICallFunc,
  operationCardDetail,
  operationCardProductDept,
  operationCardDetailData,
  operationCardKarigar,
  operationCardNextKarigar,
  operationCardThickness,
  operationCardConcept,
  operationCardVariant,
  operationCardMachineSize,
  operationCardDesignCodeCategory,
  operationCardNextProductProcess,
  operationCardNextProductProcessDepartment,
}: any) => {
  return (
    <>
      <OperationCardReceiptButton
        operationCardProductDept={operationCardProductDept}
        search={search}
        operationCardDetail={operationCardDetail}
        getOperationCardDetailNextKarigarFunc={
          getOperationCardDetailNextKarigarFunc
        }
        getOperationCardDetailNextProductProcessAPICallFunc={
          getOperationCardDetailNextProductProcessAPICallFunc
        }
        getOperationCardDetailNextProductProcessDepartmentAPICallFunc={
          getOperationCardDetailNextProductProcessDepartmentAPICallFunc
        }
        operationCardDetailData={operationCardDetailData}
        operationCardKarigar={operationCardKarigar}
        operationCardConcept={operationCardConcept}
        operationCardNextKarigar={operationCardNextKarigar}
        operationCardThickness={operationCardThickness}
        operationCardVariant={operationCardVariant}
        operationCardMachineSize={operationCardMachineSize}
        operationCardDesignCodeCategory={operationCardDesignCodeCategory}
        operationCardNextProductProcess={operationCardNextProductProcess}
        operationCardNextProductProcessDepartment={
          operationCardNextProductProcessDepartment
        }
      />
      <div className="mt-2">
        <OperationCardReceiptItem
          operationCardDetailData={operationCardDetailData}
        />
      </div>
      {goldAccessoryTable?.length > 0 && (
        <div className="mt-2">
          <OCGoldAccessoryTableItem goldAccessoryTable={goldAccessoryTable} />
        </div>
      )}

      {issueReference?.length > 0 && (
        <div className="mt-2">
          <OCIssueReferenceTable issueReferenceTable={issueReference} />
        </div>
      )}
    </>
  );
};

export default OperationCardReceiptMaster;
