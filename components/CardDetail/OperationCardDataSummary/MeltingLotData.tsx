const MeltingLotData = ({ operationCardDetailData }: any) => {
  console.log(operationCardDetailData, 'operationCardDetailData ');
  return (
    <div className="me-2">
      <div
        className={`row align-items-baseline border py-2 rounded-3 p-0 m-0 summary-height`}
      >
        <div className="col-md-3 p-0 m-0 mob-reverse-content">
          <div className="fs-14 bold mob-text-start">
            {operationCardDetailData?.melting_lot}
          </div>
          <div className="fs-14 mob-px">Melting Lot</div>
        </div>
        <div className="col-md-3 p-0 m-0 mob-reverse-content">
          <div className="fs-14 bold mob-text-start">
            {operationCardDetailData?.parent_melting_lot
              ? operationCardDetailData?.parent_melting_lot
              : '--'}
          </div>
          <div className="fs-14 mob-px">Parent lot</div>
        </div>
        <div className="col-md-3 p-0 m-0 mob-reverse-content">
          <div className="fs-14 bold mob-text-start">
            {operationCardDetailData?.product_purity === 0
              ? '--'
              : operationCardDetailData?.product_purity?.toFixed(3)}
          </div>
          <div className="fs-14 mob-px">Purity</div>
        </div>
        <div className="col-md-3 p-0 m-0 mob-reverse-content">
          <div className="fs-14 bold mob-text-start">
            {operationCardDetailData?.accessories_purity === 0
              ? '--'
              : operationCardDetailData?.accessories_purity?.toFixed(3)}
          </div>
          <div className="fs-14 mob-px">Accessories </div>
        </div>
        <div className="col-md-3 p-0 m-0 mob-reverse-content">
          <div className="fs-14 bold mob-text-start">
            {operationCardDetailData?.tracking_number === ''
              ? '--'
              : operationCardDetailData?.tracking_number}
          </div>
          <div className="fs-14 mob-px">Tracking No. </div>
        </div>
      </div>
    </div>
  );
};

export default MeltingLotData;
