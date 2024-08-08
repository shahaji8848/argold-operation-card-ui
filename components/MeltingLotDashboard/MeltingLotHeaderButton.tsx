import Link from 'next/link';
import React from 'react';

const MeltingLotHeaderButton = ({ buttonLabel }: any) => {
  return (
    <div className="row mt-3">
      <div className="col-12">
        {buttonLabel &&
          buttonLabel?.length > 0 &&
          buttonLabel?.map((products: any) => {
            return (
              <button className="text-end btn btn-blue btn-py me-3 mt-2">
                <Link href={products?.redirect_url} className="text-white" target="_blank">
                  {products?.button}
                </Link>
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default MeltingLotHeaderButton;
