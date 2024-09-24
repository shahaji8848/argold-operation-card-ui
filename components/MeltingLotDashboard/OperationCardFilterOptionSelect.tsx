import React, { useEffect, useRef, useState } from 'react';
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
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (e: any) => {
    const { value } = e.target;
    handleFilterChange(e);

    // Filter dropdown options based on input value
    const filteredList = meltingFiltersList?.product?.filter((product: string) =>
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

  // Show all options when the input field is focused
  const handleInputFocus = () => {
    setFilteredProductList(meltingFiltersList?.product || []);
    setIsDropdownOpen(true); // Show the dropdown on focus
  };

  useEffect(() => {
    // setInputValueAutoComplete({
    //   name: initialValue,
    //   value: initialValue,
    // });
    const handleOutsideClickAutoComplete = (event: any) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener('click', handleOutsideClickAutoComplete);

    return () => {
      window.removeEventListener('click', handleOutsideClickAutoComplete);
    };
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isDropdownOpen) {
      switch (e.key) {
        case 'ArrowDown':
          setHighlightedIndex((prevIndex: any) => (prevIndex < filteredProductList?.length - 1 ? prevIndex + 1 : prevIndex));
          e.preventDefault(); // Prevent scrolling
          break;
        case 'ArrowUp':
          setHighlightedIndex((prevIndex: any) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
          e.preventDefault(); // Prevent scrolling
          break;
        case 'Enter':
          if (highlightedIndex >= 0) {
            handleOptionClick(filteredProductList[highlightedIndex]);
          }
          break;
        case 'Escape':
          setIsDropdownOpen(false); // Close dropdown on escape
          break;
        default:
          break;
      }
    }
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
                onFocus={handleInputFocus} // Show dropdown when focused
                placeholder="Search product"
                ref={inputRef}
                onKeyDown={handleKeyDown}
              />
              {isDropdownOpen && (
                <div className={`${meltingStyle.custom_dropdown_options}  ${isDropdownOpen ? meltingStyle.open : ''} `}>
                  {filteredProductList?.map((list: string, idx: number) => (
                    <div
                      key={idx}
                      className={`${meltingStyle.custom_dropdown_option} ${
                        highlightedIndex === idx ? meltingStyle.highlighted : ''
                      }`}
                      onClick={() => handleOptionClick(list)}
                    >
                      {list}
                    </div>
                  ))}
                  {filteredProductList?.length === 0 && (
                    <div className={`${meltingStyle.custom_dropdown_option} disabled`}>No options</div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Repeat the above for other fields */}
        </div>
      </div>
    </>
  );
};

export default OperationCardFilterOptionSelect;
