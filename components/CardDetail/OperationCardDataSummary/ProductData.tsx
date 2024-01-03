import style from '../../../styles/melting-lot-data.module.css';
const ProductData = () => {
  return (
    <div className={`col-12 col-md-3 border rounded-3 mt-2 ${style.mg_x_5}`}>
      <div className="p-2">
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
      </div>
    </div>
  );
};

export default ProductData;
