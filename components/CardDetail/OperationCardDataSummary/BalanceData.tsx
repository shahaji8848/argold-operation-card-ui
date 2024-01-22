const BalanceData = ({ operationCardDetailData }: any) => {
  return (
    <div className="row align-items-baseline border py-2 rounded-3 p-0 m-0 summary-height">
      {/* <div className="col-md-12">
        <div className={`row    align-items-baseline`}> */}
      <div className="col-md-4 p-0 m-0 mob-reverse-content input-balc-mob">
        <div className="row">
          <div
            className="fs-14 bold mob-text-start col-md-12
"
          >
            {operationCardDetailData?.balance_weight === 0
              ? '--'
              : operationCardDetailData?.balance_weight?.toFixed(3)}
          </div>
        </div>

        <div className="fs-14 mob-px ">Balance</div>
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
      <div className="mx-2 mb-2 hr-mob">
        <hr className="p-0 m-0" />
      </div>

      <div className="row ">
        {/* <div className="col-xxl-1 col-xl-1 col-lg-1 col-md-1"></div> */}
        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 ms-xxl-5 ms-xl-4 ms-lg-3 ms-md-2">
          <div className="">
            <input type="text" className="w-100 " />
          </div>
          <div></div>
        </div>
      </div>
    </div>

    // <div
    //   className={`border rounded-3 col-12  col-md-3   mt-2 `}
    // >
    //   <div className="p-2">
    //     <div className="d-flex justify-content-between align-items-center mt-2">
    //       <span className="fs-14">Balance:</span>
    //       <span className="fs-14">0.2</span>
    //     </div>
    //     <hr className="my-1" />
    //     <div className="d-flex justify-content-between align-items-center mt-2">
    //       <span className="fs-14">Gross Balance:</span>
    //       <span className="fs-14">0.2</span>
    //     </div>
    //     <hr className="my-1" />
    //     <div className="d-flex justify-content-between align-items-center mt-2">
    //       <span className="fs-14">Fine Balance:</span>
    //       <span className="fs-14">0.184</span>
    //     </div>
    //     <hr className="my-1" />
    //     <div className="d-flex justify-content-between align-items-center mt-2">
    //       <span className="fs-14 w-100">Created On:</span>
    //       <span className="fs-14 w-50 text-end">2024-01-03</span>
    //     </div>
    //     <hr className="my-1" />
    //     <div className="d-flex justify-content-between align-items-center mt-2">
    //       <span className="fs-14 w-100">Updated On:</span>
    //       <span className="fs-14 w-50 text-end">2024-01-03</span>
    //     </div>
    //     <hr className="my-1" />
    //   </div>
    // </div>
  );
};

export default BalanceData;
