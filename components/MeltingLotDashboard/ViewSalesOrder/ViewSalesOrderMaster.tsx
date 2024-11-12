'use client';
import React, { useEffect, useRef, useState } from 'react';
import useMeltingLotSalesOrder from '@/hooks/meltingLotSalesOrderhook';
import meltingStyle from '../../../styles/melting-lot-data.module.css';
import useMeltingViewHook from '@/hooks/meltingViewHokks';
import { callGetAPI } from '@/services/config/api-config';
import BunchViewSalesOrder from './BunchViewSalesOrder';
import SingleViewSalesOrder from './SingleViewSalesOrder';
import { column } from 'mathjs';

interface FilterOptions {
  product_category?: string;
  machine_size?: string;
  purity?: string;
  design?: string;
  cust_name?: string;
  product?: string;
}

interface FilterItem {
  key: keyof FilterOptions;
  label: string;
  value: keyof FilterOptions;
  options: string[];
  stateValue?: any;
  filterVisible?: any;
}

const ViewSalesOrderMaster = () => {
  const {
    filterOptions,
    handleFilterChange,
    meltingFiltersList,
    handleGetSalesOrders,
    dataForSalesOrder,
    filtersVisible,
    columnList,
  } = useMeltingViewHook();
  const [filteredData, setFilteredData] = useState<any>();
  const [value, setValue] = useState(filterOptions);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<any>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const formatDate = (dateString: any) => {
    if (!dateString || dateString === ' ' || dateString === null) {
      return '--';
    }

    // Attempt to parse and format the date
    try {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because getMonth() returns 0-11
      const year = date.getFullYear();

      return `${day}-${month}-${year}`;
    } catch (error) {
      return '--';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    handleFilterChange(e);
    // Update filtered data
    setIsDropdownOpen(true);
    setActiveDropdown(name);
    setHighlightedIndex({ [name]: 0 });
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value: inputValue } = e.target;
    setValue((prev) => ({ ...prev, [name]: inputValue }));
    setFilteredData((prevData: any) => ({
      ...prevData,
      [name]: meltingFiltersList?.[name]?.filter((item: string) => item.toLowerCase().includes(inputValue.toLowerCase())) || [],
    }));
    handleInputChange(e);
  };

  const handleOptionClick = (option: string, field: string) => {
    setIsDropdownOpen(false);
    // @ts-ignore
    handleValueChange({ target: { name: field, value: option } });
    setActiveDropdown(null);
  };

  const handleInputFocus = (field: string) => {
    setFilteredData(meltingFiltersList);
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
      // case 'Enter':
      //   handleOptionClick(filteredData[field][highlightedIndex[field]], field);
      //   break;
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
      stateValue: value?.product,
      filterVisible: true,
    },
    {
      key: 'purity',
      label: 'Purity',
      value: 'purity',
      options: meltingFiltersList?.purity || [],
      stateValue: value?.purity,
      filterVisible: filtersVisible?.purity,
    },
    {
      key: 'cust_name',
      label: 'Customer',
      value: 'cust_name',
      options: meltingFiltersList?.cust_name || [],
      stateValue: value?.cust_name,
      filterVisible: filtersVisible?.cust_name,
    },
    {
      key: 'product_category',
      label: 'Product Category',
      value: 'product_category',
      options: meltingFiltersList?.product_category || [],
      stateValue: value?.product_category,
      filterVisible: filtersVisible?.product_category,
    },

    {
      key: 'design',
      label: 'Design',
      value: 'design',
      options: meltingFiltersList?.design || [],
      stateValue: value?.design,
      filterVisible: filtersVisible?.design,
    },
    {
      key: 'machine_size',
      label: 'Machine Size',
      value: 'machine_size',
      options: meltingFiltersList?.machine_size || [],
      stateValue: value?.machine_size,
      filterVisible: filtersVisible?.machine_size,
    },
  ];

  return (
    <div className="container-fluid">
      <div className="spacing-pd mb-3 mt-3" style={{minHeight:'99vh'}}>
        <div className="row">
          {arrForMappingFlters.map((item, index) => {
            return (
              <>
                {item?.filterVisible ? (
                  <div className="col-md-2 col-12 mb-2" key={index}>
                    <div className="d-inline-block ">
                      <>
                        <>
                          <div className="me-2 bold fs-14">{item?.label}</div>
                          <div className={meltingStyle.custom_dropdown_wrapper} key={item.key}>
                            <input
                              type="text"
                              className={`${meltingStyle.custom_dropdown_input} ${meltingStyle.dropdown_width}`}
                              name={item.value}
                              value={item?.stateValue}
                              onChange={handleValueChange}
                              onFocus={() => handleInputFocus(item.value)}
                              placeholder={`search ${item.label}`}
                              ref={inputRef}
                              onKeyDown={(e) => handleKeyDown(e, item.value)}
                              id={item?.key}
                            />
                            {activeDropdown === item.value && (
                              <div
                                className={`${meltingStyle.custom_dropdown_options} ${isDropdownOpen ? meltingStyle.open : ''}`}
                              >
                                {filteredData[item?.value]?.map((list: string, idx: number) => {
                                  return (
                                    <div
                                      key={idx}
                                      className={`${meltingStyle.custom_dropdown_option} ${
                                        highlightedIndex[`${item?.value}}`] === idx ? meltingStyle.highlighted : ''
                                      }`}
                                      onClick={() => handleOptionClick(list, `${item?.value}`)}
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
                      </>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </>
            );
          })}
        </div>
        <div className="row">
          {filterOptions?.product && (
            <div className="col-12 col-sm-3">
              <button className="text-end btn btn-blue btn-py me-3 mt-2" onClick={handleGetSalesOrders}>
                Apply Filters
              </button>
            </div>
          )}
        </div>
        <div>
          {filterOptions?.product && (
            <div style={{ width: '100%' }}>
              <SingleViewSalesOrder
                salesOrderData={dataForSalesOrder?.single_orders}
                formatDate={formatDate}
                columnList={columnList}
                title={'Single Orders'}
              />
              <SingleViewSalesOrder
                salesOrderData={dataForSalesOrder?.bunch_orders}
                formatDate={formatDate}
                columnList={columnList}
                title={'Bunch Orders'}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewSalesOrderMaster;
