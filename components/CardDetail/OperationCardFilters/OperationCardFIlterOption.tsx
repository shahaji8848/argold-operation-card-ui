import Link from 'next/link';
import React from 'react';

const OperationCardFiltersOption = ({ meltingFiltersList, filterMeltingOptionValue, handleSelectFilterMeltingChange }: any) => {
  console.log('monika', meltingFiltersList?.data?.category_one);
  return (
    <>
      <div className="row mt-3">
        <div className="col-12">
          <span className="bold pe-5 text-uppercase text-primary">KA Chain Orders</span>
          <button className="me-4 text-uppercase btn btn-blue btn-py">Add Ka Chain Order</button>
          <button className="me-4 text-uppercase btn btn-blue btn-py">Add Ka Chain Single Order</button>
          <button className="me-4 text-uppercase btn btn-blue btn-py">Add Ka Chain Dhoom Order</button>
        </div>
      </div>

      <div className="row">
        <div className="col-12 py-3">
          <div className="d-inline-block me-3">
            <div className="me-2 bold">Category One:</div>
            <select
              className="form-select d-inline w-auto"
              value={filterMeltingOptionValue}
              onChange={handleSelectFilterMeltingChange}
            >
              {meltingFiltersList?.data?.category_one &&
                meltingFiltersList?.data?.category_one?.map((list: any, idx: any) => {
                  return (
                    <>
                      {/* <option key={''} value={''}>
                        All
                      </option> */}
                      <option key={idx} value={list?.name}>
                        {list?.name}
                      </option>
                    </>
                  );
                })}
            </select>
          </div>

          <div className="d-inline-block me-3">
            <div className="me-2 bold">Machine Size:</div>
            <select
              className="form-select d-inline w-auto"
              value={filterMeltingOptionValue}
              onChange={handleSelectFilterMeltingChange}
            >
              {meltingFiltersList?.data?.machine_size &&
                meltingFiltersList?.data?.machine_size?.map((list: any, idx: any) => {
                  return (
                    <>
                      <option key={''} value={''}>
                        All
                      </option>
                      <option key={''} value={''}>
                        {list?.name}
                      </option>
                    </>
                  );
                })}
            </select>
          </div>

          <div className="d-inline-block me-3">
            <div className="me-2 bold">Design Code:</div>
            <select className="form-select d-inline w-auto">
              <option>All</option>
              <option>Without Design Code</option>
              <option>With Design Code</option>
            </select>
          </div>

          <div className="d-inline-block me-3" value={filterMeltingOptionValue} onChange={handleSelectFilterMeltingChange}>
            <div className="me-2 bold">Chain Making:</div>
            <select className="form-select d-inline w-auto">
              {meltingFiltersList?.data?.chain_making &&
                meltingFiltersList?.data?.chain_making?.map((list: any, idx: any) => {
                  return (
                    <>
                      <option key={''} value={''}>
                        All
                      </option>
                      <option key={idx} value={list?.name}>
                        {list?.name}
                      </option>
                    </>
                  );
                })}
            </select>
          </div>

          <div className="d-inline-block me-3">
            <div className="me-2 bold">Status:</div>
            <select className="form-select d-inline w-auto">
              <option>All</option>
              <option>Pending (Melting)</option>
              <option>Pending (Process)</option>
              <option>Completed</option>
            </select>
          </div>

          <div className="d-inline-block me-3">
            <div className="me-2 bold">Purity:</div>
            <select
              className="form-select d-inline w-auto"
              value={filterMeltingOptionValue}
              onChange={handleSelectFilterMeltingChange}
            >
              {meltingFiltersList?.data?.purity &&
                meltingFiltersList?.data?.purity?.map((list: any, idx: any) => {
                  return (
                    <>
                      <option key={''} value={''}>
                        All
                      </option>
                      <option key={idx} value={list?.name}>
                        {list?.name}
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
