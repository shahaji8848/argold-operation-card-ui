import React, { useState } from 'react';
import meltingStyle from '../../styles/melting-lot-data.module.css';

const OperationCardFilterOptionSelect = ({ meltingFiltersList, filterOptions, handleFilterChange }: any) => {
  // Define local state to manage filtered dropdown options
  // const [filteredProductList, setFilteredProductList] = useState(meltingFiltersList?.product || []);

  // // Handle input change to filter options dynamically
  // const handleInputChange = (e: any) => {
  //   const { value } = e.target;
  //   const filteredOptions = meltingFiltersList?.product?.filter((item: any) => item.toLowerCase().includes(value.toLowerCase()));
  //   setFilteredProductList(filteredOptions);
  //   handleFilterChange(e); // To update global filter state
  // };

  const [filteredProductList, setFilteredProductList] = useState(meltingFiltersList?.product || []);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleInputChange = (e: any) => {
    const { value } = e.target;
    handleFilterChange(e);

    // Filter dropdown options based on input value
    const filteredList = meltingFiltersList?.product.filter((product: string) =>
      product.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProductList(filteredList);
    setIsDropdownOpen(true); // Show the dropdown options
  };

  const handleOptionClick = (option: string) => {
    setIsDropdownOpen(false); // Hide the dropdown after selection
    handleFilterChange({
      target: { name: 'product', value: option },
    });
  };

  return (
    <>
      {/* <div className="row">
        <div className="col-12 pt-2 pb-3">
          <div className="d-inline-block me-3">
            <div className="me-2 bold fs-14">Product</div>
            <input
              type="text"
              className={`form-control d-inline w-auto ${meltingStyle.dropdown_width}`}
              placeholder="Type to filter..."
              value={filterOptions?.product}
              name="product"
              onChange={handleInputChange}
            />
            <select
              className={`form-select d-inline w-auto mt-1 ${meltingStyle.dropdown_width}`}
              name="product"
              value={filterOptions?.product}
              onChange={handleFilterChange}
            >
              <option key={''} value={''}>
                All
              </option>
              {filteredProductList?.map((list: any, idx: any) => (
                <option key={idx} value={list}>
                  {list}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div> */}

      <div className="row">
        <div className="col-12 pt-2 pb-3">
          <div className="d-inline-block me-3">
            <div className="me-2 bold fs-14">Product</div>
            <div className="custom-dropdown-wrapper">
              <input
                type="text"
                className={`${meltingStyle.custom_dropdown_input} ${meltingStyle.dropdown_width}`}
                name="product"
                value={filterOptions?.product}
                onChange={handleInputChange}
                onFocus={() => setIsDropdownOpen(true)} // Show dropdown when focused
                placeholder="Search product"
              />
              <div className={`${meltingStyle.custom_dropdown_options} ${isDropdownOpen ? 'open' : ''}`}>
                {filteredProductList?.map((list: string, idx: number) => (
                  <div key={idx} className={meltingStyle.custom_dropdown_option} onClick={() => handleOptionClick(list)}>
                    {list}
                  </div>
                ))}
                {filteredProductList.length === 0 && (
                  <div className={`${meltingStyle.custom_dropdown_option} disabled`}>No options</div>
                )}
              </div>
            </div>
          </div>

          {/* Repeat the above for other fields */}
        </div>
      </div>
    </>
  );
};

export default OperationCardFilterOptionSelect;
