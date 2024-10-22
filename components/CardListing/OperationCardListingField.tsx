import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import inputField from '../../DataSet/operationCardListingField';
import { useRouter } from 'next/navigation';
import meltingStyle from '../../styles/melting-lot-data.module.css';

const OperationCardListingField = ({
  filtersData,
  handleInputChange,
  handleApplyFilters,
  handleClearFilters,
  URLForFiltersHandler,
  handleKeyDownEnter,
  handleCheckbox,
  showZeroBalance,
  handleButtonFilter,
  premittedProducts,
  handleDepartmentDropdown,
  departmentValue,
  handleDepartmentChange,
}: any) => {
  const focusRef = useRef<any>(null);
  const [searchField, setSearchField] = useState<string>('');
  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      redirectToListPage();
    }
  };

  const redirectToListPage = () => {
    if (searchField === '') {
      router.push('');
    } else if (searchField.includes('OP') || searchField.includes('op')) {
      router.push(`/operation-card-detail?name=${searchField}`);
    } else {
      router.push(`/operation-card-list?search=${searchField}`);
    }
  };

  useEffect(() => {
    focusRef.current.focus();
  }, []);
  console.log('monika', departmentValue);
  return (
    <div className="spacing-mt">
      <div className="row">
        {inputField.map((data: any, index: any) => (
          <div className="col-md-3 mb-2" key={index}>
            <form>
              <div className="">
                <>
                  <label className="w-100 dark-blue fw-bold text-capitalize fs-13">{data?.label}</label>
                  {/* Handle department dropdown separately */}
                  {data.label === 'department' ? (
                    <div className="d-inline-block ">
                      <div className={meltingStyle.custom_dropdown_wrapper}>
                        <input
                          type="text"
                          className={`${meltingStyle.custom_dropdown_input}  form-control inputFields fs-13 rounded-2`}
                          value={filtersData[data?.name]}
                          onChange={(e) => {
                            handleDepartmentChange(e, data.name);
                          }}
                          // onFocus={() => handleInputFocus('product')} // Show dropdown when focused
                          placeholder="search department"
                          ref={data?.name === 'search' ? focusRef : null}
                          // onKeyDown={(e) => handleKeyDown(e, 'product')}
                        />
                        {/* {isDropdownOpen && ( */}
                        {/* {activeDropdown === 'product' && ( */}

                        <div className={`${meltingStyle.custom_dropdown_options} `}>
                          {departmentValue?.map((list: any, idx: number) => (
                            <div
                              key={idx}
                              className={`${meltingStyle.custom_dropdown_option} 
                            
                              `}
                              // onClick={() => handleOptionClick(list, 'product')}
                            >
                              {list?.title}
                            </div>
                          ))}
                          {departmentValue?.length === 0 && (
                            <div className={`${meltingStyle.custom_dropdown_option} disabled`}>No options</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="form-control inputFields fs-13 rounded-2"
                      value={filtersData[data?.name]}
                      onChange={(e) => {
                        handleInputChange(e, data.name);
                        if (data.name === 'product') {
                          handleDepartmentDropdown(e.target.value); // Call handleProductChange when product input changes
                        }
                      }}
                      onKeyDown={handleKeyDownEnter}
                      ref={data?.name === 'search' ? focusRef : null}
                    />
                  )}
                </>
              </div>
            </form>
          </div>
        ))}
      </div>

      <div className="filter-wrapper row">
        <div className="col-12">
          <button className="btn btn-primary text-capitalize filter-btn  fs-13 mt-2 me-2" onClick={handleApplyFilters}>
            Apply filter
          </button>
          {premittedProducts &&
            premittedProducts?.length > 0 &&
            premittedProducts?.map((ele: any, idx: any) => {
              return (
                <button
                  className="btn btn-primary text-capitalize filter-btn  fs-13 mt-2 me-2"
                  onClick={() => handleButtonFilter(ele)}
                >
                  {ele}
                </button>
              );
            })}

          <Link href="" className="px-3 py-0 my-0 fs-14 " onClick={handleClearFilters}>
            Clear Filter
          </Link>

          <label>
            <input type="checkbox" checked={showZeroBalance} onChange={handleCheckbox} />
            <span className="ps-2">Show zero balance record</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default OperationCardListingField;
