const BalanceData = ({ operationCardDetailData }: any) => {
  return (
    <div className={`row  border rounded-3 p-0 m-0 summary-height`}>
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
    </div>
  );
};

export default BalanceData;
