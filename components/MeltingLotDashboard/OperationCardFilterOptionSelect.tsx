import React, { useEffect, useRef, useState } from 'react';
import meltingStyle from '../../styles/melting-lot-data.module.css';

const OperationCardFilterOptionSelect = ({ meltingFiltersList, filterOptions, handleFilterChange }: any) => {
  const [filteredData, setFilteredData] = useState<any>({
    product: meltingFiltersList?.product || [],
    product_category: meltingFiltersList?.product_category || [],
    machine_size: meltingFiltersList?.machine_size,
    cutting_process: meltingFiltersList?.cutting_process,
    purity: meltingFiltersList?.purity,
    design: meltingFiltersList?.design,
    melting_plan: meltingFiltersList?.melting_lot,
    melting_lot: meltingFiltersList?.melting_lot,
    factory_design_name: meltingFiltersList?.factory_design_name,
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<any>({});
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null); // Track which input has an open dropdown
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    handleFilterChange(e);
    // Dynamically filter both product and product_category
    const updatedFilteredData = {
      ...filteredData,
      [name]: meltingFiltersList?.[name]?.filter((item: string) => item.toLowerCase().includes(value.toLowerCase())),
    };
    setFilteredData(updatedFilteredData);
    setIsDropdownOpen(true); // Show the dropdown options
    setActiveDropdown(name); // Open the dropdown for the active field
    // setHighlightedIndex({ ...highlightedIndex, [name]: 0 }); // Reset highlighted index for the active field
    setHighlightedIndex({ name: 0 }); // Reset highlighted index for the active field
  };
  const handleOptionClick = (option: string, field: string) => {
    setIsDropdownOpen(false); // Hide the dropdown after selection
    handleFilterChange({
      target: { name: field, value: option },
    });
    setIsDropdownOpen(false); // Close dropdown on escape
    setActiveDropdown(null); // Reset active dropdown
  };
  const handleInputFocus = (field: string) => {
    setFilteredData({
      ...filteredData,
      [field]: meltingFiltersList?.[field] || [],
    });
    setIsDropdownOpen(true); // Show the dropdown on focus
    setActiveDropdown(field); // Set the active dropdown to the focused input field
    // setHighlightedIndex({ ...highlightedIndex, [field]: 0 });
    setHighlightedIndex({ name: 0 }); // Reset highlighted index for the active field
  };
  // Handle keyboard navigation
  // const handleKeyDown = (e: React.KeyboardEvent, field: string) => {
  //   if (isDropdownOpen) {
  //     switch (e.key) {
  //       case 'ArrowDown':
  //         setHighlightedIndex((prevIndex: any) => (prevIndex < filteredData[field]?.length - 1 ? prevIndex + 1 : prevIndex));
  //         e.preventDefault(); // Prevent scrolling
  //         break;
  //       case 'ArrowUp':
  //         setHighlightedIndex((prevIndex: any) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  //         e.preventDefault(); // Prevent scrolling
  //         break;
  //       case 'Enter':
  //         if (highlightedIndex >= 0) {
  //           handleOptionClick(filteredData[field][highlightedIndex], field);
  //         }
  //         setIsDropdownOpen(false); // Close dropdown on escape
  //         setActiveDropdown(null); // Reset active dropdown
  //         break;
  //       case 'Escape':
  //         setIsDropdownOpen(false); // Close dropdown on escape
  //         setActiveDropdown(null); // Reset active dropdown
  //         break;
  //       case 'Tab':
  //         setIsDropdownOpen(false); // Close dropdown when tabbing out
  //         setActiveDropdown(null); // Move to the next input
  //         break;
  //       default:
  //         break;
  //     }
  //   }
  // };

  // Handle keyboard navigation in the dropdown
  const handleKeyDown = (e: React.KeyboardEvent, field: string) => {
    if (!isDropdownOpen) return;

    const maxIndex = filteredData[field]?.length - 1 || 0;

    switch (e.key) {
      case 'ArrowDown':
        setHighlightedIndex((prevIndices: any) => ({
          ...prevIndices,
          [field]: prevIndices[field] < maxIndex ? prevIndices[field] + 1 : 0,
        }));
        e.preventDefault();
        break;
      case 'ArrowUp':
        setHighlightedIndex((prevIndices: any) => ({
          ...prevIndices,
          [field]: prevIndices[field] > 0 ? prevIndices[field] - 1 : maxIndex,
        }));
        e.preventDefault();
        break;
      case 'Enter':
        handleOptionClick(filteredData[field][highlightedIndex[field]], field);
        break;
      case 'Escape':
        setIsDropdownOpen(false);
        setActiveDropdown(null);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const handleOutsideClickAutoComplete = (event: any) => {
      // if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      //   setIsDropdownOpen(false);
      //   setActiveDropdown(null);
      // }
      if (!event.target.closest(`.${meltingStyle.custom_dropdown_wrapper}`)) {
        setIsDropdownOpen(false);
        setActiveDropdown(null);
      }
    };

    window.addEventListener('click', handleOutsideClickAutoComplete);

    return () => {
      window.removeEventListener('click', handleOutsideClickAutoComplete);
    };
  });

  return (
    <>
      <div className="row">
        <div className="col-12 pt-2 pb-3">
          <div className="d-inline-block me-3">
            <div className="me-2 bold fs-14">Product</div>
            <div className={meltingStyle.custom_dropdown_wrapper}>
              <input
                type="text"
                className={`${meltingStyle.custom_dropdown_input} ${meltingStyle.dropdown_width}`}
                name="product"
                value={filterOptions?.product}
                onChange={handleInputChange}
                onFocus={() => handleInputFocus('product')} // Show dropdown when focused
                placeholder="search product"
                ref={inputRef}
                onKeyDown={(e) => handleKeyDown(e, 'product')}
              />
              {/* {isDropdownOpen && ( */}
              {activeDropdown === 'product' && (
                <div className={`${meltingStyle.custom_dropdown_options} ${isDropdownOpen ? meltingStyle.open : ''}`}>
                  {filteredData.product?.map((list: string, idx: number) => (
                    <div
                      key={idx}
                      className={`${meltingStyle.custom_dropdown_option} ${
                        highlightedIndex['product'] === idx ? meltingStyle.highlighted : ''
                      }`}
                      onClick={() => handleOptionClick(list, 'product')}
                    >
                      {list}
                    </div>
                  ))}
                  {filteredData.product?.length === 0 && (
                    <div className={`${meltingStyle.custom_dropdown_option} disabled`}>No options</div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="d-inline-block me-3">
            <div className="me-2 bold fs-14">Product Category</div>
            <div className={meltingStyle.custom_dropdown_wrapper}>
              <input
                type="text"
                className={`${meltingStyle.custom_dropdown_input} ${meltingStyle.dropdown_width}`}
                name="product_category"
                value={filterOptions?.product_category}
                onChange={handleInputChange}
                onFocus={() => handleInputFocus('product_category')} // Show dropdown when focused
                placeholder="search product category"
                ref={inputRef}
                onKeyDown={(e) => handleKeyDown(e, 'product_category')}
              />
              {/* {isDropdownOpen && ( */}
              {activeDropdown === 'product_category' && (
                <div className={`${meltingStyle.custom_dropdown_options} ${isDropdownOpen ? meltingStyle.open : ''}`}>
                  {filteredData.product_category?.map((list: string, idx: number) => (
                    <div
                      key={idx}
                      className={`${meltingStyle.custom_dropdown_option} ${
                        highlightedIndex['product_category'] === idx ? meltingStyle.highlighted : ''
                      }`}
                      onClick={() => handleOptionClick(list, 'product_category')}
                    >
                      {list}
                    </div>
                  ))}
                  {filteredData.product_category?.length === 0 && (
                    <div className={`${meltingStyle.custom_dropdown_option} disabled`}>No options</div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="d-inline-block me-3">
            <div className="me-2 bold fs-14">Machine Size</div>
            <div className={meltingStyle.custom_dropdown_wrapper}>
              <input
                type="text"
                className={`${meltingStyle.custom_dropdown_input} ${meltingStyle.dropdown_width}`}
                name="machine_size"
                value={filterOptions?.machine_size}
                onChange={handleInputChange}
                onFocus={() => handleInputFocus('machine_size')} // Show dropdown when focused
                placeholder="search machine size"
                ref={inputRef}
                onKeyDown={(e) => handleKeyDown(e, 'machine_size')}
              />
              {/* {isDropdownOpen && ( */}
              {activeDropdown === 'machine_size' && (
                <div className={`${meltingStyle.custom_dropdown_options} ${isDropdownOpen ? meltingStyle.open : ''}`}>
                  {filteredData.machine_size?.map((list: string, idx: number) => (
                    <div
                      key={idx}
                      className={`${meltingStyle.custom_dropdown_option}  ${
                        highlightedIndex['machine_size'] === idx ? meltingStyle.highlighted : ''
                      }`}
                      onClick={() => handleOptionClick(list, 'machine_size')}
                    >
                      {list}
                    </div>
                  ))}
                  {filteredData.machine_size?.length === 0 && (
                    <div className={`${meltingStyle.custom_dropdown_option} disabled`}>No options</div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="d-inline-block me-3">
            <div className="me-2 bold fs-14">Cutting Process</div>
            <div className={meltingStyle.custom_dropdown_wrapper}>
              <input
                type="text"
                className={`${meltingStyle.custom_dropdown_input} ${meltingStyle.dropdown_width}`}
                name="cutting_process"
                value={filterOptions?.cutting_process}
                onChange={handleInputChange}
                onFocus={() => handleInputFocus('cutting_process')} // Show dropdown when focused
                placeholder="search cutting process"
                ref={inputRef}
                onKeyDown={(e) => handleKeyDown(e, 'cutting_process')}
              />
              {/* {isDropdownOpen && ( */}
              {activeDropdown === 'cutting_process' && (
                <div
                  className={`${meltingStyle.custom_dropdown_options} ${
                    isDropdownOpen ? meltingStyle.open : meltingStyle.closed
                  }`}
                >
                  {filteredData.cutting_process?.map((list: string, idx: number) => (
                    <div
                      key={idx}
                      className={`${meltingStyle.custom_dropdown_option}  ${
                        highlightedIndex['cutting_process'] === idx ? meltingStyle.highlighted : ''
                      }`}
                      onClick={() => handleOptionClick(list, 'cutting_process')}
                    >
                      {list}
                    </div>
                  ))}
                  {filteredData.cutting_process?.length === 0 && (
                    <div className={`${meltingStyle.custom_dropdown_option} disabled`}>No options</div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="d-inline-block me-3">
            <div className="me-2 bold fs-14">Purity</div>
            <div className={meltingStyle.custom_dropdown_wrapper}>
              <input
                type="text"
                className={`${meltingStyle.custom_dropdown_input} ${meltingStyle.dropdown_width}`}
                name="purity"
                value={filterOptions?.purity}
                onChange={handleInputChange}
                onFocus={() => handleInputFocus('purity')} // Show dropdown when focused
                placeholder="search purity"
                ref={inputRef}
                onKeyDown={(e) => handleKeyDown(e, 'purity')}
              />
              {/* {isDropdownOpen && ( */}
              {activeDropdown === 'purity' && (
                <div className={`${meltingStyle.custom_dropdown_options} ${isDropdownOpen ? meltingStyle.open : ''}`}>
                  {filteredData.purity?.map((list: string, idx: number) => (
                    <div
                      key={idx}
                      className={`${meltingStyle.custom_dropdown_option} ${
                        highlightedIndex['purity'] === idx ? meltingStyle.highlighted : ''
                      }`}
                      onClick={() => handleOptionClick(list, 'purity')}
                    >
                      {list}
                    </div>
                  ))}
                  {filteredData.purity?.length === 0 && (
                    <div className={`${meltingStyle.custom_dropdown_option} disabled`}>No options</div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="d-inline-block me-3">
            <div className="me-2 bold fs-14">Design</div>
            <div className={meltingStyle.custom_dropdown_wrapper}>
              <input
                type="text"
                className={`${meltingStyle.custom_dropdown_input} ${meltingStyle.dropdown_width}`}
                name="design"
                value={filterOptions?.design}
                onChange={handleInputChange}
                onFocus={() => handleInputFocus('design')} // Show dropdown when focused
                placeholder="search design"
                ref={inputRef}
                onKeyDown={(e) => handleKeyDown(e, 'design')}
              />
              {/* {isDropdownOpen && ( */}
              {activeDropdown === 'design' && (
                <div className={`${meltingStyle.custom_dropdown_options} ${isDropdownOpen ? meltingStyle.open : ''}`}>
                  {filteredData?.design?.map((list: string, idx: number) => (
                    <div
                      key={idx}
                      className={`${meltingStyle.custom_dropdown_option} ${
                        highlightedIndex['design'] === idx ? meltingStyle.highlighted : ''
                      }`}
                      onClick={() => handleOptionClick(list, 'design')}
                    >
                      {list}
                    </div>
                  ))}
                  {filteredData.design?.length === 0 && (
                    <div className={`${meltingStyle.custom_dropdown_option} disabled`}>No options</div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="d-inline-block me-3">
            <div className="me-2 bold fs-14">Melting Plan</div>
            <div className={meltingStyle.custom_dropdown_wrapper}>
              <input
                type="text"
                className={`${meltingStyle.custom_dropdown_input} ${meltingStyle.dropdown_width}`}
                name="melting_plan"
                value={filterOptions?.design}
                onChange={handleInputChange}
                onFocus={() => handleInputFocus('design')} // Show dropdown when focused
                placeholder="search design"
                ref={inputRef}
                onKeyDown={(e) => handleKeyDown(e, 'design')}
              />
              {/* {isDropdownOpen && ( */}
              {activeDropdown === 'design' && (
                <div className={`${meltingStyle.custom_dropdown_options} ${isDropdownOpen ? meltingStyle.open : ''}`}>
                  {filteredData?.design?.map((list: string, idx: number) => (
                    <div
                      key={idx}
                      className={`${meltingStyle.custom_dropdown_option} ${
                        highlightedIndex['design'] === idx ? meltingStyle.highlighted : ''
                      }`}
                      onClick={() => handleOptionClick(list, 'design')}
                    >
                      {list}
                    </div>
                  ))}
                  {filteredData.design?.length === 0 && (
                    <div className={`${meltingStyle.custom_dropdown_option} disabled`}>No options</div>
                  )}
                </div>
              )}
            </div>
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
        </div>
      </div>
    </>
  );
};
export default OperationCardFilterOptionSelect;
