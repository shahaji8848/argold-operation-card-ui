// import React, { useEffect, useRef, useState } from 'react';
// import meltingStyle from '../../styles/melting-lot-data.module.css';

// const OperationCardFilterOptionSelect = ({ meltingFiltersList, filterOptions, handleFilterChange }: any) => {
//   const [filteredProductList, setFilteredProductList] = useState(meltingFiltersList?.product || []);
//   const [filteredProductCategoryList, setFilteredProductCategoryList] = useState(meltingFiltersList?.product_category || []);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [highlightedIndex, setHighlightedIndex] = useState(0);
//   const inputRef = useRef<HTMLInputElement | null>(null);

//   const handleInputChange = (e: any) => {
//     const { value } = e.target;
//     handleFilterChange(e);

//     // Filter dropdown options based on input value
//     const filteredList = meltingFiltersList?.product?.filter((product: string) =>
//       product.toLowerCase().includes(value.toLowerCase())
//     );

//     setFilteredProductList(filteredList);
//     setIsDropdownOpen(true); // Show the dropdown options
//   };

//   const handleOptionClick = (option: string) => {
//     setIsDropdownOpen(false); // Hide the dropdown after selection
//     handleFilterChange({
//       target: { name: 'product', value: option },
//     });
//   };

//   // Show all options when the input field is focused
//   const handleInputFocus = () => {
//     setFilteredProductList(meltingFiltersList?.product || []);
//     setIsDropdownOpen(true); // Show the dropdown on focus
//   };

//   useEffect(() => {
//     const handleOutsideClickAutoComplete = (event: any) => {
//       if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
//         setIsDropdownOpen(false);
//       }
//     };

//     window.addEventListener('click', handleOutsideClickAutoComplete);

//     return () => {
//       window.removeEventListener('click', handleOutsideClickAutoComplete);
//     };
//   }, []);

//   // Handle keyboard navigation
//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (isDropdownOpen) {
//       switch (e.key) {
//         case 'ArrowDown':
//           setHighlightedIndex((prevIndex: any) => (prevIndex < filteredProductList?.length - 1 ? prevIndex + 1 : prevIndex));
//           e.preventDefault(); // Prevent scrolling
//           break;
//         case 'ArrowUp':
//           setHighlightedIndex((prevIndex: any) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
//           e.preventDefault(); // Prevent scrolling
//           break;
//         case 'Enter':
//           if (highlightedIndex >= 0) {
//             handleOptionClick(filteredProductList[highlightedIndex]);
//           }
//           break;
//         case 'Escape':
//           setIsDropdownOpen(false); // Close dropdown on escape
//           break;
//         default:
//           break;
//       }
//     }
//   };

//   return (
//     <>
//       {/* <div className="row">
//         <div className="col-12 pt-2 pb-3">
//           <div className="d-inline-block me-3">
//             <div className="me-2 bold fs-14">Product</div>
//             <input
//               type="text"
//               className={`form-control d-inline w-auto ${meltingStyle.dropdown_width}`}
//               placeholder="Type to filter..."
//               value={filterOptions?.product}
//               name="product"
//               onChange={handleInputChange}
//             />
//             <select
//               className={`form-select d-inline w-auto mt-1 ${meltingStyle.dropdown_width}`}
//               name="product"
//               value={filterOptions?.product}
//               onChange={handleFilterChange}
//             >
//               <option key={''} value={''}>
//                 All
//               </option>
//               {filteredProductList?.map((list: any, idx: any) => (
//                 <option key={idx} value={list}>
//                   {list}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div> */}

//       <div className="row">
//         <div className="col-12 pt-2 pb-3">
//           <div className="d-inline-block me-3">
//             <div className="me-2 bold fs-14">Product</div>
//             <div className="custom-dropdown-wrapper">
//               <input
//                 type="text"
//                 className={`${meltingStyle.custom_dropdown_input} ${meltingStyle.dropdown_width}`}
//                 name="product"
//                 value={filterOptions?.product}
//                 onChange={handleInputChange}
//                 onFocus={handleInputFocus} // Show dropdown when focused
//                 placeholder="Search product"
//                 ref={inputRef}
//                 onKeyDown={handleKeyDown}
//               />
//               {isDropdownOpen && (
//                 <div className={`${meltingStyle.custom_dropdown_options}  ${isDropdownOpen ? meltingStyle.open : ''} `}>
//                   {filteredProductList?.map((list: string, idx: number) => (
//                     <div
//                       key={idx}
//                       className={`${meltingStyle.custom_dropdown_option} ${
//                         highlightedIndex === idx ? meltingStyle.highlighted : ''
//                       }`}
//                       onClick={() => handleOptionClick(list)}
//                     >
//                       {list}
//                     </div>
//                   ))}
//                   {filteredProductList?.length === 0 && (
//                     <div className={`${meltingStyle.custom_dropdown_option} disabled`}>No options</div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default OperationCardFilterOptionSelect;

import React, { useEffect, useRef, useState } from 'react';
import meltingStyle from '../../styles/melting-lot-data.module.css';
const OperationCardFilterOptionSelect = ({ meltingFiltersList, filterOptions, handleFilterChange }: any) => {
  const [filteredData, setFilteredData] = useState<any>({
    product: meltingFiltersList?.product || [],
    product_category: meltingFiltersList?.product_category || [],
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
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
  };
  const handleOptionClick = (option: string, field: string) => {
    setIsDropdownOpen(false); // Hide the dropdown after selection
    handleFilterChange({
      target: { name: field, value: option },
    });
  };
  const handleInputFocus = (field: string) => {
    setFilteredData({
      ...filteredData,
      [field]: meltingFiltersList?.[field] || [],
    });
    setIsDropdownOpen(true); // Show the dropdown on focus
  };
  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, field: string) => {
    if (isDropdownOpen) {
      switch (e.key) {
        case 'ArrowDown':
          setHighlightedIndex((prevIndex: any) => (prevIndex < filteredData[field]?.length - 1 ? prevIndex + 1 : prevIndex));
          e.preventDefault(); // Prevent scrolling
          break;
        case 'ArrowUp':
          setHighlightedIndex((prevIndex: any) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
          e.preventDefault(); // Prevent scrolling
          break;
        case 'Enter':
          if (highlightedIndex >= 0) {
            handleOptionClick(filteredData[field][highlightedIndex], field);
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
                onFocus={() => handleInputFocus('product')} // Show dropdown when focused
                placeholder="search product"
                ref={inputRef}
                onKeyDown={(e) => handleKeyDown(e, 'product')}
              />
              {isDropdownOpen && (
                <div className={`${meltingStyle.custom_dropdown_options} ${isDropdownOpen ? meltingStyle.open : ''}`}>
                  {filteredData.product?.map((list: string, idx: number) => (
                    <div
                      key={idx}
                      className={`${meltingStyle.custom_dropdown_option} ${
                        highlightedIndex === idx ? meltingStyle.highlighted : ''
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
            <div className="custom-dropdown-wrapper">
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
              {isDropdownOpen && (
                <div className={`${meltingStyle.custom_dropdown_options} ${isDropdownOpen ? meltingStyle.open : ''}`}>
                  {filteredData.product_category?.map((list: string, idx: number) => (
                    <div
                      key={idx}
                      className={`${meltingStyle.custom_dropdown_option} ${
                        highlightedIndex === idx ? meltingStyle.highlighted : ''
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
        </div>
      </div>
    </>
  );
};
export default OperationCardFilterOptionSelect;
