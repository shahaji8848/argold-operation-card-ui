import React from 'react';

const OperationCardFiltersOption = ({
  meltingFiltersList,
  productOption,
  categoryOption,
  machineSizeOption,
  designOption,
  cuttingProcessOption,
  statusOption,
  purityOption,
  handleProductChange,
  handleCategoryChange,
  handleMachineSizeChange,
  handleDesignChange,
  handleCuttingProcessChange,
  handleStatusChange,
  handlePurityChange,
}: any) => {
  return (
    <>
      <div className="row">
        <div className="col-12 py-3">
          <div className="d-inline-block me-3">
            <div className="me-2 bold fs-14">Product </div>
            <select className="form-select d-inline w-auto " value={productOption} onChange={handleProductChange}>
              <option key={''} value={''}>
                All
              </option>
              {meltingFiltersList?.product &&
                meltingFiltersList?.product?.map((list: any, idx: any) => {
                  return (
                    <>
                      <option key={idx} value={list}>
                        {list}
                      </option>
                    </>
                  );
                })}
            </select>
          </div>
          <div className="d-inline-block me-3">
            <div className="me-2 bold fs-14">Product Category</div>
            <select className="form-select d-inline w-auto" value={categoryOption} onChange={handleCategoryChange}>
              <option key={''} value={''}>
                All
              </option>
              {meltingFiltersList?.product_category &&
                meltingFiltersList?.product_category?.map((list: any, idx: any) => {
                  return (
                    <>
                      <option key={idx} value={list}>
                        {list}
                      </option>
                    </>
                  );
                })}
            </select>
          </div>

          <div className="d-inline-block me-3">
            <div className="me-2 bold fs-14">Machine Size</div>
            <select className="form-select d-inline w-auto" value={machineSizeOption} onChange={handleMachineSizeChange}>
              <option key={''} value={''}>
                All
              </option>
              {meltingFiltersList?.machine_size &&
                meltingFiltersList?.machine_size?.map((list: any, idx: any) => {
                  return (
                    <>
                      <option key={idx} value={list}>
                        {list}
                      </option>
                    </>
                  );
                })}
            </select>
          </div>

          <div className="d-inline-block me-3">
            <div className="me-2 bold fs-14">Design </div>
            <select className="form-select d-inline w-auto" value={designOption} onChange={handleDesignChange}>
              <option>All</option>
              {meltingFiltersList?.design &&
                meltingFiltersList?.design?.map((list: any, idx: any) => {
                  return (
                    <>
                      <option key={idx} value={list}>
                        {list}
                      </option>
                    </>
                  );
                })}
            </select>
          </div>

          <div className="d-inline-block me-3">
            <div className="me-2 bold fs-14">Cutting Process</div>
            <select className="form-select d-inline w-auto" value={cuttingProcessOption} onChange={handleCuttingProcessChange}>
              <option key={''} value={''}>
                All
              </option>
              {meltingFiltersList?.cutting_process &&
                meltingFiltersList?.cutting_process?.map((list: any, idx: any) => {
                  return (
                    <>
                      <option key={idx} value={list}>
                        {list}
                      </option>
                    </>
                  );
                })}
            </select>
          </div>

          <div className="d-inline-block me-3">
            <div className="me-2 bold fs-14">Status</div>
            <select className="form-select d-inline w-auto" value={statusOption} onChange={handleStatusChange}>
              <option>All</option>
              {meltingFiltersList?.status &&
                meltingFiltersList?.status?.map((list: any, idx: any) => {
                  return (
                    <>
                      <option key={idx} value={list}>
                        {list}
                      </option>
                    </>
                  );
                })}
            </select>
          </div>

          <div className="d-inline-block me-3">
            <div className="me-2 bold fs-14">Purity</div>
            <select className="form-select d-inline w-auto" value={purityOption} onChange={handlePurityChange}>
              <option key={''} value={''}>
                All
              </option>
              {meltingFiltersList?.purity &&
                meltingFiltersList?.purity?.map((list: any, idx: any) => {
                  return (
                    <>
                      <option key={idx} value={list}>
                        {list}
                      </option>
                    </>
                  );
                })}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default OperationCardFiltersOption;
