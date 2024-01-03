import React from 'react';

const OperationCardListingField = () => {
  const inputField = [
    'parent melting lot',
    'process',
    'gross balance',
    'melting lot',
    'department',
    'fine balance',
    'purity',
    'karigar',
    'operation card',
    'product',
    'balance',
    
  ];

  return (
    <div className="container mt-5 pt-3">
      <div className="row">
        {inputField.map((data: any, index: any) => {
          return (
            <div className="col-md-3">
              <form>
                <div className="mb-3">
                  <label className="form-label text-center w-100 dark-blue fw-bold text-capitalize" >{data}</label>
                  <input
                    type="text"
                    className="form-control grey-bg border-none border-grey flied-height"
                    
                  />
                </div>
                
              </form>
            </div>
          );
        })}
         <div className='d-flex justify-content-end' >
         <button className='btn btn-primary text-capitalize filter-btn'>Apply filter</button>
         </div>
        
      </div>
     
     
     
    </div>
  );
};

export default OperationCardListingField;
