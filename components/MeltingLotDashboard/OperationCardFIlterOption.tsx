import React from 'react';

const OperationCardFiltersOption = ({ meltingFiltersList, filterOptions, handleFilterChange }: any) => {
  return (
    <>
      <div className="row">
        <div className="col-12 py-3">
          <div className="d-inline-block me-3">
            <div className="me-2 bold fs-14">Product </div>
            <select
              className="form-select d-inline w-auto "
              name="productOption"
              value={filterOptions?.productOption}
              onChange={handleFilterChange}
            >
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
            <select
              className="form-select d-inline w-auto"
              name="categoryOption"
              value={filterOptions?.categoryOption}
              onChange={handleFilterChange}
            >
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
            <select
              className="form-select d-inline w-auto"
              name="machineSizeOption"
              value={filterOptions?.machineSizeOption}
              onChange={handleFilterChange}
            >
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
            <select
              className="form-select d-inline w-auto"
              name="designOption"
              value={filterOptions?.designOption}
              onChange={handleFilterChange}
            >
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
            <select
              className="form-select d-inline w-auto"
              name="cuttingProcessOption"
              value={filterOptions?.cuttingProcessOption}
              onChange={handleFilterChange}
            >
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
            <select
              className="form-select d-inline w-auto"
              name="statusOption"
              value={filterOptions?.statusOption}
              onChange={handleFilterChange}
            >
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
            <select
              className="form-select d-inline w-auto"
              name="purityOption"
              value={filterOptions?.purityOption}
              onChange={handleFilterChange}
            >
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
