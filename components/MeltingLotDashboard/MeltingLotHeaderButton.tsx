import React from 'react';
import Link from 'next/link';
import btnHeaderStyle from '../../styles/melting-lot-data.module.css';

const MeltingLotHeaderButton = ({ productList, meltingFiltersList, handleProductBtnClicked }: any) => {
  return (
    <div className="row mt-3">
      <div className="col-12">
        <div>
          <button className="text-end btn btn-blue btn-py me-3 mt-2">
            <Link href={productList} className="text-white" target="_blank">
              Add Order
            </Link>
          </button>
        </div>
        {meltingFiltersList?.product &&
          meltingFiltersList?.product?.length > 0 &&
          meltingFiltersList?.product?.map((products: any, idx: any) => {
            return (
              <button
                className={`text-center btn btn-blue btn-py me-3 mt-2 ${idx === 0 ? btnHeaderStyle.btn_width : ''}`}
                onClick={() => handleProductBtnClicked(products)}
              >
                {products}
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default MeltingLotHeaderButton;
