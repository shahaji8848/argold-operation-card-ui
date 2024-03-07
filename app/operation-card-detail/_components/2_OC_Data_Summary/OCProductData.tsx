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
            {operationCardDetailData?.product_process.split('-')[0]}
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
    </div>
  );
};

export default ProductData;
