import React from 'react';
import InputField from './InputField';
import AutoCompleteField from '../OperationCardTable/OperationCardIssue/AutoCompleteField';
import { IDropdownEditable } from '@/types/dropdown-editable-fields';

interface IEditableOperationCardFields {
  dropdownEditable: IDropdownEditable[];
  dataEditable: string[];
  headerSave: any;
  handleHeaderSave: (label: string, value: string) => void;
  operationCardDetailData: any;
  operationCardKarigarQuantitySettings: any;
}

const EditableOperationCardFields = ({
  dropdownEditable,
  dataEditable,
  headerSave,
  handleHeaderSave,
  operationCardDetailData,
  operationCardKarigarQuantitySettings,
}: IEditableOperationCardFields) => {
  return (
    <>
      {dropdownEditable?.length > 0 &&
        dropdownEditable?.map((fieldData: any, index: number) => {
          return (
            <div className="col-md-2 p-0 m-0" key={index}>
              <div className="fs-14 bold text-start">{fieldData?.label}</div>
              <AutoCompleteField
                listOfDropdownObjs={fieldData?.data}
                handleDropDownValuesChange={handleHeaderSave}
                label={fieldData?.name}
                initialValue={operationCardDetailData[fieldData?.name]}
                isReadOnly={
                  operationCardKarigarQuantitySettings?.[
                    `set_${fieldData?.name}`
                  ] === 0
                }
              />
            </div>
          );
        })}
      {dataEditable?.length > 0 &&
        dataEditable?.map((field: string, index: number) => {
          return (
            <div className="col-md-2 p-0 m-0" key={index}>
              <div className="fs-14 bold text-start">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </div>
              <InputField
                label={field}
                value={headerSave[field]}
                readOnly={
                  operationCardKarigarQuantitySettings?.[`set_${field}`] === 0
                }
                handleChange={handleHeaderSave}
              />
            </div>
          );
        })}
    </>
  );
};

export default EditableOperationCardFields;
