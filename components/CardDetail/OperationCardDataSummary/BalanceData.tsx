import { ReactHTMLElement, useMemo, useState } from 'react';

const BalanceData = ({ operationCardDetailData }: any) => {
  const [weightInput, setWeightInput] = useState<number>(0);
  const expensiveCalculation = (num: any) => {
    console.log(
      'Calculating...',
      num,
      operationCardDetailData?.total_wastage_issue_percentage,
      num * operationCardDetailData?.total_wastage_issue_percentage,
      num * operationCardDetailData?.total_wastage_issue_percentage -
        operationCardDetailData?.balance_weight
    );
    const calculatedValue =
      operationCardDetailData?.balance_weight -
      num * (1 + operationCardDetailData?.total_wastage_issue_percentage / 100);
    return calculatedValue;
  };
  const calculation = useMemo(
    () => expensiveCalculation(weightInput),
    [weightInput]
  );
  return (
    <div className="row py-2 border rounded-3 p-0 m-0 summary-height align-items-baseline">
      <div className="col-md-12 ">
        <div className="row">
          <div className="col-md-4 p-0 m-0 mob-reverse-content">
            <div
              className="fs-14 bold mob-text-start
    "
            >
              {operationCardDetailData?.balance_weight === 0
                ? '--'
                : operationCardDetailData?.balance_weight?.toFixed(3)}
            </div>
            <div className="fs-14 mob-px">Balance</div>
          </div>
          <div className="col-md-4 p-0 m-0 mob-reverse-content">
            <div
              className="fs-14 bold mob-text-start
    "
            >
              {operationCardDetailData?.balance_gross_weight === 0
                ? '--'
                : operationCardDetailData?.balance_gross_weight?.toFixed(3)}
            </div>
            <div className="fs-14 mob-px">Gross Balance</div>
          </div>
          <div className="col-md-4 p-0 m-0 mob-reverse-content">
            <div
              className="fs-14 bold mob-text-start
    "
            >
              {operationCardDetailData?.balance_fine_weight === 0
                ? '--'
                : operationCardDetailData?.balance_fine_weight?.toFixed(3)}
            </div>
            <div className="fs-14 mob-px">Fine Balance</div>
          </div>
          <div className="col-md-4 p-0 m-0 mob-reverse-content"></div>
        </div>
        <div className="d-flex  mt-3 fs-14 ">
          <div className="col-md-4  p-0 m-0 text-center ">
            {operationCardDetailData?.hasOwnProperty(
              'total_wastage_issue_percentage'
            ) &&
            operationCardDetailData?.total_wastage_issue_percentage !== 0 &&
            operationCardDetailData?.total_wastage_issue_percentage !== '' &&
            operationCardDetailData?.total_wastage_issue_percentage !== null &&
            operationCardDetailData?.total_wastage_issue_percentage !==
              undefined ? (
              <span className="">
                Diff (
                {`${operationCardDetailData?.total_wastage_issue_percentage}`})
              </span>
            ) : (
              <span className="">Difference</span>
            )}
          </div>
          <div className="col-md-4  p-0 m-0">
            <input
              type="text"
              name="weight"
              id="weight"
              size={12}
              className="ms-2 rounded-2 input_fields px-2"
              value={weightInput}
              onChange={(e: any) => setWeightInput(e.target.value)}
            />
          </div>
          <div className="col-md-4  p-0 m-0">
            {/* <span className="px-3">{'='}</span> */}
            <span>{Number(calculation).toFixed(3)}</span>
          </div>
        </div>
      </div>
    </div>
    // <>
    //   {' '}
    //   <div className={`row py-2 border rounded-3 p-0 m-0 summary-height`}>
    //     <div className="col-md-4 p-0 m-0 mob-reverse-content">
    //       <div
    //         className="fs-14 bold mob-text-start
    // "
    //       >
    //         {operationCardDetailData?.balance_weight === 0
    //           ? '--'
    //           : operationCardDetailData?.balance_weight?.toFixed(3)}
    //       </div>
    //       <div className="fs-14 mob-px">Balance</div>
    //     </div>
    //     <div className="col-md-4 p-0 m-0 mob-reverse-content">
    //       <div
    //         className="fs-14 bold mob-text-start
    // "
    //       >
    //         {operationCardDetailData?.balance_gross_weight === 0
    //           ? '--'
    //           : operationCardDetailData?.balance_gross_weight?.toFixed(3)}
    //       </div>
    //       <div className="fs-14 mob-px">Gross Balance</div>
    //     </div>
    //     <div className="col-md-4 p-0 m-0 mob-reverse-content">
    //       <div
    //         className="fs-14 bold mob-text-start
    // "
    //       >
    //         {operationCardDetailData?.balance_fine_weight === 0
    //           ? '--'
    //           : operationCardDetailData?.balance_fine_weight?.toFixed(3)}
    //       </div>
    //       <div className="fs-14 mob-px">Fine Balance</div>
    //     </div>
    //     <div className="row w-100 h-50 mt-3 " style={{ fontSize: '14px' }}>
    //       {/* <div className="col-md-1"></div> */}
    //       <div className="col-md-12 ms-xxl-4">
    //         <div className="row">
    //           <div className="col-xxl-3 col-xl-4 col-lg-3 col-3">
    //             {operationCardDetailData?.hasOwnProperty(
    //               'total_wastage_issue_percentage'
    //             ) &&
    //             operationCardDetailData?.total_wastage_issue_percentage !== 0 &&
    //             operationCardDetailData?.total_wastage_issue_percentage !==
    //               '' &&
    //             operationCardDetailData?.total_wastage_issue_percentage !==
    //               null &&
    //             operationCardDetailData?.total_wastage_issue_percentage !==
    //               undefined ? (
    //               <span className="">
    //                 Diff (
    //                 {`${operationCardDetailData?.total_wastage_issue_percentage}`}
    //                 )
    //               </span>
    //             ) : (
    //               <span className="">Difference</span>
    //             )}
    //           </div>
    //           <div className="col-xxl-4 col-xl-4 col-lg-6 col-4 text-start">
    //             <input
    //               type="text"
    //               name="weight"
    //               id="weight"
    //               size={12}
    //               className="ms-2 rounded-2 input_fields px-2"
    //               value={weightInput}
    //               onChange={(e: any) => setWeightInput(e.target.value)}
    //             />
    //           </div>
    //           <div className="col-xxl-3  col-xl-3 col-lg-3 col-3">
    //             {/* <span className="px-3">{'='}</span> */}
    //             <span>{Number(calculation).toFixed(3)}</span>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
};

export default BalanceData;
