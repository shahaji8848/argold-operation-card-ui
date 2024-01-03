import style from '../../../styles/melting-lot-data.module.css';
const MeltingLotData = () => {
  return (
    <div
      className={`col-12 col-md-3 border rounded-3 mt-2 ${style.mg_x_3} ${style.mg_s_5}`}
    >
      <div className="p-2">
        <div className="d-flex justify-content-between align-items-center mt-2">
          <span className="fs-14">Melting Lot:</span>
          <span className="fs-14">BaC126</span>
        </div>
        <hr className="my-1" />
        <div className="d-flex justify-content-between align-items-center mt-2">
          <span className="fs-14 ">Purity:</span>
          <span className="fs-14 "> 92.0</span>
        </div>
        <hr className="my-1" />
        <div className="d-flex justify-content-between align-items-center mt-2">
          <span className="fs-14 w-50">Accessories Purity:</span>
          <span className="fs-14 align-items-end"> 91.85</span>
        </div>
        <hr className="my-1" />
        <div className="d-flex justify-content-between align-items-center mt-2">
          <span className="fs-14 ">Tone:</span>
          <span className="fs-14 ">Single Tone</span>
        </div>
        <hr className="my-1" />
      </div>
    </div>
  );
};

export default MeltingLotData;
