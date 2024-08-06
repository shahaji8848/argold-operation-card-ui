import Link from 'next/link';
import React from 'react';

const OperationCardFiltersOption = ({ meltingFiltersList, filterMeltingOptionValue, handleSelectFilterMeltingChange }: any) => {
  console.log('monika', meltingFiltersList?.product_category);
  return (
    <>
      {/* <div className="row mt-3"> */}
      {/* <div className="col-12"> */}
      {/* <div className="me-2 bold">Product </div>
          <select
            className="form-select d-inline w-auto"
            value={filterMeltingOptionValue}
            onChange={handleSelectFilterMeltingChange}
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
          </select> */}
      {/* <button className="me-4 text-uppercase btn btn-blue btn-py">Add Ka Chain Order</button>
          <button className="me-4 text-uppercase btn btn-blue btn-py">Add Ka Chain Single Order</button>
          <button className="me-4 text-uppercase btn btn-blue btn-py">Add Ka Chain Dhoom Order</button> */}
      {/* </div> */}
      {/* </div> */}

      <div className="row">
        <div className="col-12 py-3">
          <div className="d-inline-block me-3">
            <div className="me-2 bold">Product </div>
            <select
              className="form-select d-inline w-auto"
              value={filterMeltingOptionValue}
              onChange={handleSelectFilterMeltingChange}
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
            <div className="me-2 bold">Product Category</div>
            <select
              className="form-select d-inline w-auto"
              value={filterMeltingOptionValue}
              onChange={handleSelectFilterMeltingChange}
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
            <div className="me-2 bold">Machine Size</div>
            <select
              className="form-select d-inline w-auto"
              value={filterMeltingOptionValue}
              onChange={handleSelectFilterMeltingChange}
            >
              <option key={''} value={''}>
                All
              </option>
              {meltingFiltersList?.machine_size &&
                meltingFiltersList?.machine_size?.map((list: any, idx: any) => {
                  return (
                    <>
                      <option key={''} value={''}>
                        {list}
                      </option>
                    </>
                  );
                })}
            </select>
          </div>

          <div className="d-inline-block me-3">
            <div className="me-2 bold">Design </div>
            <select className="form-select d-inline w-auto">
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

          <div className="d-inline-block me-3" value={filterMeltingOptionValue} onChange={handleSelectFilterMeltingChange}>
            <div className="me-2 bold">Cutting Process:</div>
            <select className="form-select d-inline w-auto">
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
            <div className="me-2 bold">Status</div>
            <select className="form-select d-inline w-auto">
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
            <div className="me-2 bold">Purity</div>
            <select
              className="form-select d-inline w-auto"
              value={filterMeltingOptionValue}
              onChange={handleSelectFilterMeltingChange}
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
