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
    <div className="container">
      <div className="row">
        {inputField.map((data: any, index: any) => {
          return (
            <div className="col-md-3">
              <form>
                <div className="mb-3">
                  <label className="form-label">{data}</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>
              </form>
            </div>
          );
        })}
      </div>

      <div>
        <button>Apply filter</button>
      </div>
    </div>
  );
};

export default OperationCardListingField;
