import React, { use, useState } from 'react';
import styles from '../../../styles/operationDetail.module.css';
import { dataVal } from '../../../app/dataSet/operationCardProcessDept';
const SelectKarigar = ({
  operationCardProductDept,
  operationCardDetailData,
  operationCardKarigar,
}: any) => {
  const [operationCardFieldVal, setOperationCardFieldVal] = useState([
    operationCardDetailData,
  ]);
  const operationCardFields: any = Object?.entries(operationCardProductDept)
    .filter(([key, value]) => key.includes('show') && value === 1)
    .map(([key, value]) => key.replace('show_', ''));

  const operationCardFieldValue = Object.entries(
    operationCardDetailData
  ).filter(([key, value]) => operationCardFields.includes(key));

  // function extractMatchingValues(obj: any, keys: any) {
  //   console.log(keys, 'keys');
  //   return Object.entries(obj).filter(([key]) => keys.includes(key));
  // }

  // const matchingValues = extractMatchingValues(
  //   operationCardDetailData,
  //   operationCardFields
  // )
  console.log(operationCardFieldValue, 'operationCardFieldValue');
  return (
    <div className={`row   text-center  py-2 mx-2 gap-3`}>
      <div className="col-md-2 p-0 m-0">
        <div className="fs-14 bold text-start">Karigar</div>
        <div className="fs-14 ">
          <select
            className="form-control  dark-blue operationCardinputFields"
            id="exampleFormControlSelect1"
          >
            {operationCardKarigar.map((karigar_item: any, index: any) => {
              return <option key={index}>{karigar_item.name}</option>;
            })}
          </select>
        </div>
      </div>
      {operationCardFieldValue.length > 0 &&
        operationCardFieldValue.map(([key, values]: any, index: number) => (
          <div className="col-md-2 p-0 m-0" key={index}>
            <div className="fs-14 bold text-start">
              {key
                .split('_')
                .map((val: any, index: any) => {
                  return index === 0
                    ? val.charAt(0).toUpperCase() + val.slice(1)
                    : val;
                })
                .join(' ')}
            </div>
            <div className="fs-14 ">
              <input
                type="text"
                className="form-control dark-blue operationCardinputFields"
                id="inputText"
                placeholder={key
                  .split('_')
                  .map((val: any, index: any) => {
                    return index === 0
                      ? val.charAt(0).toUpperCase() + val.slice(1)
                      : val;
                  })
                  .join(' ')}
                value={values}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default SelectKarigar;
