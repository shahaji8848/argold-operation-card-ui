import React from 'react';
import { IDropdownEditable } from '@/types/dropdown-editable-fields';
import EditableOperationCardFields from './EditableOperationCardFields';
import UnEditableOperationCardFields from './UnEditableOperationCardFields';

const OperationCardInputFieldMaster = ({
  operationCardProductDept,
  operationCardDetailData,
  operationCardKarigar,
  operationCardMachine,
  operationCardTone,
  operationCardNextProductCategory,
  operationCardKarigarQuantitySettings,
  headerSave,
  handleHeaderSave,
}: any) => {
  const operationCardFields: any = Object?.entries(operationCardProductDept)
    .filter(([key, value]) => key.includes('show') && value === 1)
    .map(([key, value]) => key.replace('show_', ''));

  const operationCardFieldValue = Object.entries(
    operationCardDetailData
  ).filter(([key, value]) => operationCardFields?.includes(key));

  const editableFieldsList = [
    'karigar',
    'quantity',
    'machine',
    'tone',
    'product_category',
  ];
  const editableFieldsWithDropdownData = [
    { name: 'karigar', label: 'Karigar', data: operationCardKarigar },
    { name: 'machine', label: 'Machine', data: operationCardMachine },
    { name: 'tone', label: 'Tone', data: operationCardTone },
    {
      name: 'product_category',
      label: 'Product Category',
      data: operationCardNextProductCategory,
    },
  ];
  const dropdownEditable: IDropdownEditable[] =
    editableFieldsWithDropdownData.filter((fieldObj: any) =>
      operationCardFields.includes(fieldObj.name)
    );

  const dataEditable: string[] = operationCardFields?.filter(
    (field: string) =>
      editableFieldsList?.includes(field) &&
      !editableFieldsWithDropdownData.some(
        (fieldObj: any) => fieldObj.name === field
      )
  );
  return (
    <div className="d-flex  spacing-mt ">
      <div className="col-md-12 border  rounded-3">
        <div className={`row text-center py-2 mx-2 gap-3`}>
          {operationCardFields.some(
            (field: string) => editableFieldsList?.includes(field)
          ) && (
            <EditableOperationCardFields
              dropdownEditable={dropdownEditable}
              dataEditable={dataEditable}
              headerSave={headerSave}
              handleHeaderSave={handleHeaderSave}
              operationCardDetailData={operationCardDetailData}
              operationCardKarigarQuantitySettings={
                operationCardKarigarQuantitySettings
              }
            />
          )}

          <UnEditableOperationCardFields
            operationCardFieldValue={operationCardFieldValue}
            editableFieldsList={editableFieldsList}
          />
        </div>
      </div>
    </div>
  );
};

export default OperationCardInputFieldMaster;
