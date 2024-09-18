import React from 'react';
import meltingStyle from '../../styles/melting-lot-data.module.css';

const OperationCardFiltersOption = ({ meltingFiltersList, filterOptions, handleFilterChange }: any) => {
  return (
    <>
      <div className="row">
        <div className="col-12 pt-2 pb-3">
          <div className="d-inline-block me-3">
            <div className="me-2 bold fs-14">Product </div>
            <select
              className={`form-select d-inline w-auto ${meltingStyle.dropdown_width}`}
              name="product"
              value={filterOptions?.product}
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
              className={`form-select d-inline w-auto ${meltingStyle.dropdown_width}`}
              name="product_category"
              value={filterOptions?.product_category}
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
              className={`form-select d-inline w-auto ${meltingStyle.dropdown_width}`}
              name="machine_size"
              value={filterOptions?.machine_size}
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
            <div className="me-2 bold fs-14">Design Code </div>
            <select
              className={`form-select d-inline w-auto ${meltingStyle.dropdown_width}`}
              name="design_code"
              value={filterOptions?.design_code}
              onChange={handleFilterChange}
            >
              <option>All</option>
              {meltingFiltersList?.design_code &&
                meltingFiltersList?.design_code?.map((list: any, idx: any) => {
                  return (
                    <option key={idx} value={list}>
                      {list}
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="d-inline-block me-3">
            <div className="me-2 bold fs-14">Cutting Process</div>
            <select
              className={`form-select d-inline w-auto ${meltingStyle.dropdown_width}`}
              name="cutting_process"
              value={filterOptions?.cutting_process}
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
              className={`form-select d-inline w-auto ${meltingStyle.dropdown_width}`}
              name="status"
              value={filterOptions?.status}
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
              className={`form-select d-inline w-auto ${meltingStyle.dropdown_width}`}
              name="purity"
              value={filterOptions?.purity}
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

          <div className="d-inline-block me-3">
            <div className="me-2 bold fs-14">Design </div>
            <select
              className={`form-select d-inline w-auto ${meltingStyle.dropdown_width}`}
              name="design"
              value={filterOptions?.design}
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
        </div>
      </div>
    </>
  );
};

export default OperationCardFiltersOption;
