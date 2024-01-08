const MeltingLotData = ({ operationCardDetailData }: any) => {
  console.log(operationCardDetailData, 'operationCardDetailData ');
  return (
    <div className={`row  p-0 m-0 `}>
      <div className="col-md-3 p-0 m-0">
        <div className="fs-14 bold ">
          {operationCardDetailData?.melting_lot}
        </div>
        <div className="fs-14 ">Melting Lot</div>
      </div>
      <div className="col-md-3 p-0 m-0">
        <div className="fs-14 bold">
          {operationCardDetailData?.parent_melting_lot
            ? operationCardDetailData?.parent_melting_lot
            : '--'}
        </div>
        <div className="fs-14 ">Parent lot</div>
      </div>
      <div className="col-md-3 p-0 m-0">
        <div className="fs-14 bold">
          {operationCardDetailData?.product_purity?.toFixed(3)}
        </div>
        <div className="fs-14 ">Purity</div>
      </div>
      <div className="col-md-3 p-0 m-0">
        <div className="fs-14 bold">
          {operationCardDetailData?.accessories_purity?.toFixed(3)}
        </div>
        <div className="fs-14 ">Accessories </div>
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
