import React, { use, useState } from 'react';
import styles from '../../../styles/operationDetail.module.css';
import { dataVal } from '../../../app/DataSet/operationCardProcessDept';
const SelectKarigar = ({
  operationCardProductDept,
  operationCardDetailData,
  operationCardKarigar,
}: any) => {
  const [operationCardFieldVal, setOperationCardFieldVal] = useState([
    operationCardDetailData,
  ]);
  const operationCardFields: any = Object.entries(dataVal[0])
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
            className="form-control  dark-blue inputFields"
            id="exampleFormControlSelect1"
          >
            {operationCardKarigar.map((karigar_item: any, index: any) => {
              return <option key={index}>{karigar_item.name}</option>;
            })}
          </select>
        </div>
      </div>
      {operationCardFieldValue.length > 0 &&
        operationCardFieldValue.map(([key, values]: any) => (
          <div className="col-md-2 p-0 m-0">
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
                className="form-control  dark-blue inputFields"
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
    // <div>
    //   <div className="form-group row d-flex flex-column ">
    //     <label
    //       htmlFor="staticEmail"
    //       className={`${styles.labelFlex} col-sm-8 col-form-label dark-blue`}
    //     >
    //       Karigar:
    //     </label>
    //     <div className={`col-sm-10 text-left ${styles.inputFlex}`}>
    //       <select
    //         className="form-control inputFields dark-blue"
    //         id="exampleFormControlSelect1"
    //       >
    //         <option selected>Select Karigar</option>
    //         <option>Select Karigar1</option>
    //         <option>Select Karigar2</option>
    //         <option>Select Karigar3</option>
    //       </select>
    //     </div>
    //   </div>

    //   <div className="form-group row d-flex mt-2 flex-column ">
    //     <label
    //       htmlFor="staticEmail"
    //       className={`${styles.labelFlex} col-sm-8 col-form-label dark-blue`}
    //     >
    //       Tounch Purity:
    //     </label>
    //     <div className={`col-sm-10 text-left ${styles.inputFlex}`}>
    //       <input
    //         type="text"
    //         className="form-control inputFields dark-blue"
    //         id="inputText"
    //         placeholder="Tounch Purity"
    //         value={'0.0'}
    //       />
    //     </div>
    //   </div>
    //   <div className="form-group row d-flex mt-2 flex-column ">
    //     <label
    //       htmlFor="staticEmail"
    //       className={`${styles.labelFlex} col-sm-8 col-form-label dark-blue`}
    //     >
    //       Quantity:
    //     </label>
    //     <div className={`col-sm-10 text-left ${styles.inputFlex}`}>
    //       <input
    //         type="text"
    //         className="form-control inputFields dark-blue"
    //         id="inputText"
    //         placeholder="Tounch Purity"
    //         value={'0.0'}
    //       />
    //     </div>
    //   </div>
    // </div>
  );
};

export default SelectKarigar;
