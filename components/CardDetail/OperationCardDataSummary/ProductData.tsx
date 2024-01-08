const ProductData = ({ operationCardDetailData }: any) => {
  return (
    <div className="me-2">
      <div className={`row    border rounded-3 p-0 m-0 summary-height `}>
        <div className="col-md-4 p-0 m-0 mob-reverse-content">
          <div className="fs-14 bold mob-text-start">
            {operationCardDetailData?.product}
          </div>
          <div className="fs-14 mob-px">Product</div>
        </div>
        <div className="col-md-4 p-0 m-0 mob-reverse-content">
          <div className="fs-14 bold mob-text-start ">
            {operationCardDetailData?.product_process}
          </div>
          <div className="fs-14 mob-px">Process</div>
        </div>
        <div className="col-md-4 p-0 m-0 mob-reverse-content">
          <div className="fs-14 bold mob-text-start">
            {operationCardDetailData?.operation_department}
          </div>
          <div className="fs-14 mob-px">Department</div>
        </div>
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
