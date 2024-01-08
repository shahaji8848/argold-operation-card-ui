const ProductData = ({ operationCardDetailData }: any) => {
  return (
    <div className={`row    p-0 m-0 `}>
      <div className="col-md-4 p-0 m-0">
        <div className="fs-14 bold">{operationCardDetailData?.product}</div>
        <div className="fs-14 ">Product</div>
      </div>
      <div className="col-md-4 p-0 m-0">
        <div className="fs-14 bold">
          {operationCardDetailData?.product_process}
        </div>
        <div className="fs-14 ">Process</div>
      </div>
      <div className="col-md-4 p-0 m-0">
        <div className="fs-14 bold">
          {operationCardDetailData?.operation_department}
        </div>
        <div className="fs-14 ">Department</div>
      </div>

      {/* <div className="p-2">
        <div className="d-flex justify-content-between align-items-center mt-2">
          <span className="fs-14 ">Product:</span>
          <span className="fs-14 ">Ball Chain</span>
        </div>
        <hr className="my-1" />
        <div className="d-flex justify-content-between align-items-center mt-2">
          <span className="fs-14 ">Process:</span>
          <span className="fs-14 ">Test GPC</span>
        </div>
        <hr className="my-1" />
        <div className="d-flex justify-content-between align-items-center mt-2">
          <span className="fs-14 w-25">Department:</span>
          <span className="fs-14 ">Hallmark Out</span>
        </div>
        <hr className="my-1" />
        <div className="d-flex justify-content-between align-items-center mt-2">
          <span className="fs-14 ">Created By:</span>
          <span className="fs-14 ">Administrator</span>
        </div>
        <hr className="my-1" />
        <div className="d-flex justify-content-between align-items-center mt-2">
          <span className="fs-14 ">Updated By:</span>
          <span className="fs-14 ">Administrator</span>
        </div>
        <hr className="my-1" />
      </div> */}
    </div>
  );
};

export default ProductData;
