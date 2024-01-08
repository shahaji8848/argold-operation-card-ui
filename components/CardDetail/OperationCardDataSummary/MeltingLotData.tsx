const MeltingLotData = ({ operationCardDetailData }: any) => {
  console.log(operationCardDetailData, 'operationCardDetailData ');
  return (
    <div className="me-2">
      <div className={`row  border rounded-3   p-0 m-0 summary-height`}>
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
      </div>
    </div>

    // <div
    //   className={`col-12  col-md-3  border rounded-3 mt-2 `}
    // >
    //   <div className="p-2">
    //     <div className="d-flex justify-content-between align-items-center mt-2">
    //       <span className="fs-14">Melting Lot:</span>
    //       <span className="fs-14">BaC126</span>
    //     </div>
    //     <hr className="my-1" />
    //     <div className="d-flex justify-content-between align-items-center mt-2">
    //       <span className="fs-14 ">Purity:</span>
    //       <span className="fs-14 "> 92.0</span>
    //     </div>
    //     <hr className="my-1" />
    //     <div className="d-flex justify-content-between align-items-center mt-2">
    //       <span className="fs-14 w-50">Accessories Purity:</span>
    //       <span className="fs-14 align-items-end"> 91.85</span>
    //     </div>
    //     <hr className="my-1" />
    //     <div className="d-flex justify-content-between align-items-center mt-2">
    //       <span className="fs-14 ">Tone:</span>
    //       <span className="fs-14 ">Single Tone</span>
    //     </div>
    //     <hr className="my-1" />
    //   </div>
    // </div>
  );
};

export default MeltingLotData;
