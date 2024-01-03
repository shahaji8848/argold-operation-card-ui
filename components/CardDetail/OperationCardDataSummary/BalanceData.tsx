import style from '../../../styles/melting-lot-data.module.css';
const BalanceData = () => {
  return (
    <div className={`border rounded-3 col-12 col-md-3 mt-2 ${style.mg_x_3}`}>
      <div className="p-2">
        <div className="d-flex justify-content-between align-items-center mt-2">
          <span className="fs-14">Balance:</span>
          <span className="fs-14">0.2</span>
        </div>
        <hr className="my-1" />
        <div className="d-flex justify-content-between align-items-center mt-2">
          <span className="fs-14">Gross Balance:</span>
          <span className="fs-14">0.2</span>
        </div>
        <hr className="my-1" />
        <div className="d-flex justify-content-between align-items-center mt-2">
          <span className="fs-14">Fine Balance:</span>
          <span className="fs-14">0.184</span>
        </div>
        <hr className="my-1" />
        <div className="d-flex justify-content-between align-items-center mt-2">
          <span className="fs-14 w-100">Created On:</span>
          <span className="fs-14 w-50 text-end">2024-01-03</span>
        </div>
        <hr className="my-1" />
        <div className="d-flex justify-content-between align-items-center mt-2">
          <span className="fs-14 w-100">Updated On:</span>
          <span className="fs-14 w-50 text-end">2024-01-03</span>
        </div>
        <hr className="my-1" />
      </div>
    </div>
  );
};

export default BalanceData;
