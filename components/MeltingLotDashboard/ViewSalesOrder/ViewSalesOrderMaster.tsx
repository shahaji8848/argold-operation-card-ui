'use client';
import React, { useEffect, useRef, useState } from 'react';
import useMeltingLotSalesOrder from '@/hooks/meltingLotSalesOrderhook';
import meltingStyle from '../../../styles/melting-lot-data.module.css';
import useMeltingViewHook from '@/hooks/meltingViewHokks';

interface FilterOptions {
  product_category?: string;
  machine_size?: string;
  purity?: string;
  design?: string;
  cust_name?: string;
  product: string;
}

interface FilterItem {
  key: keyof FilterOptions;
  label: string;
  value: keyof FilterOptions;
  options: string[];
}

const ViewSalesOrderMaster = () => {
  const { filterOptions, handleFilterChange, meltingFiltersList, filteredData, setFilteredData } = useMeltingViewHook();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<any>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value, 'llllllllll');
    handleFilterChange(e);
    // Update filtered data
    setFilteredData((prevData: any) => ({
      ...prevData,
      [name]: meltingFiltersList?.[name]?.filter((item: string) => item.toLowerCase().includes(value.toLowerCase())) || [],
    }));
    setIsDropdownOpen(true);
    setActiveDropdown(name);
    setHighlightedIndex({ [name]: 0 });
  };

  const handleOptionClick = (option: string, field: string) => {
    setIsDropdownOpen(false);
    handleFilterChange({ target: { name: field, value: option } });
    setActiveDropdown(null);
  };

  const handleInputFocus = (field: string) => {
    setIsDropdownOpen(true);
    setActiveDropdown(field);
    setHighlightedIndex({ [field]: 0 });
  };

  const handleKeyDown = (e: React.KeyboardEvent, field: string) => {
    if (!isDropdownOpen) return;

    const maxIndex = filteredData[field]?.length - 1 || 0;

    switch (e.key) {
      case 'ArrowDown':
        setHighlightedIndex((prev: any) => ({ ...prev, [field]: Math.min(prev[field] + 1, maxIndex) }));
        e.preventDefault();
        break;
      case 'ArrowUp':
        setHighlightedIndex((prev: any) => ({ ...prev, [field]: Math.max(prev[field] - 1, 0) }));
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
  }, []);

  const arrForMappingFlters: FilterItem[] = [
    {
      key: 'product',
      label: 'Product',
      value: 'product',
      options: meltingFiltersList?.product || [],
    },
    {
      key: 'purity',
      label: 'Purity',
      value: 'purity',
      options: meltingFiltersList?.purity || [],
    },
    {
      key: 'cust_name',
      label: 'Customer',
      value: 'cust_name',
      options: meltingFiltersList?.cust_name || [],
    },
    {
      key: 'product_category',
      label: 'Product Category',
      value: 'product_category',
      options: meltingFiltersList?.product_category || [],
    },

    {
      key: 'design',
      label: 'Design',
      value: 'design',
      options: meltingFiltersList?.design || [],
    },

    {
      key: 'machine_size',
      label: 'Machine Size',
      value: 'machine_size',
      options: meltingFiltersList?.machine_size || [],
    },
  ];

  return (
    <div className="container-fluid">
      <div className="spacing-pd mb-3 mt-3">
        <div className="row">
          {arrForMappingFlters.map((item) => {
            return (
              <div className="col-md-2 col-2 mb-2">
                <div className="d-inline-block me-3">
                  <>
                    <div className="me-2 bold fs-14">{item?.label}</div>
                    <div className={meltingStyle.custom_dropdown_wrapper} key={item.key}>
                      <input
                        type="text"
                        className={`${meltingStyle.custom_dropdown_input} ${meltingStyle.dropdown_width}`}
                        name={item.label}
                        value={filterOptions[item.value]}
                        onChange={handleInputChange}
                        onFocus={() => handleInputFocus(item.value)}
                        placeholder={`search ${item.label}`}
                        ref={inputRef}
                        onKeyDown={(e) => handleKeyDown(e, item.value)}
                      />
                      {activeDropdown === item.value && (
                        <div className={`${meltingStyle.custom_dropdown_options} ${isDropdownOpen ? meltingStyle.open : ''}`}>
                          {filteredData[item?.value]?.map((list: string, idx: number) => {
                            return (
                              <div
                                key={idx}
                                className={`${meltingStyle.custom_dropdown_option} ${
                                  highlightedIndex[`${item?.value}}`] === idx ? meltingStyle.highlighted : ''
                                }`}
                                onClick={() => handleOptionClick(list, `${item?.value}}`)}
                              >
                                {list}
                              </div>
                            );
                          })}
                          {filteredData[item?.value]?.length === 0 && (
                            <div className={`${meltingStyle.custom_dropdown_option} disabled`}>No options</div>
                          )}
                        </div>
                      )}
                    </div>
                  </>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ViewSalesOrderMaster;

{
  /* <div className="container-fluid">
        <div className="spacing-pd mb-3 mt-3">
          <div className="row">
            {viewSalesOrderFields?.product !== null && (
              <div className="col-md-3 mb-2">
                <label className="w-100 dark-blue fw-bold text-capitalize fs-13">Product</label>
                <input
                  type="text"
                  className="form-control inputFields fs-13 rounded-2"
                  value={viewSalesOrderFields?.product}
                  readOnly
                />
              </div>
            )}
            {viewSalesOrderFields?.purity !== null && (
              <div className="col-md-3 mb-2">
                <label className="w-100 dark-blue fw-bold text-capitalize fs-13">Purity</label>
                <input
                  type="text"
                  className="form-control inputFields fs-13 rounded-2"
                  value={viewSalesOrderFields?.purity}
                  readOnly
                />
              </div>
            )}
          </div>

          <div>
            <button className="text-end btn btn-blue btn-py mt-1" onClick={handleGetViewSalesOrders}>
              Get Orders
            </button>
          </div>

          <div>
            <SingleViewSalesOrder
              salesOrderData={viewSalesOrderData}
              formatDate={formatDate}
              groupOrdersByDesign={groupOrdersByDesign}
            />
            <BunchViewSalesOrder
              salesOrderData={viewSalesOrderData}
              formatDate={formatDate}
              groupOrdersByDesign={groupOrdersByDesign}
            />
          </div>
        </div>
      </div> */
}
