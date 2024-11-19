import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import inputField from '../../DataSet/operationCardListingField';
import { useRouter } from 'next/navigation';
import meltingStyle from '../../styles/melting-lot-data.module.css';
import useOperationCardList from '@/hooks/operation-card-list-hook/operation-card-list-hook';
import { filter } from 'mathjs';

const OperationCardListingField = ({
  filtersData,
  handleInputChange,
  handleApplyFilters,
  handleClearFilters,
  URLForFiltersHandler,
  handleKeyDownEnter,
  handleCheckbox,
  selectAllCheckbox,
  handleSelectAllCheckbox,
  showZeroBalance,
  handleButtonFilter,
  premittedProducts,
  handleDepartmentDropdown,
  departmentValue,
  processValue,
  handleDepartmentChange,
  handleOptionClick,
  isDropdownOpen,
  setIsDropdownOpen,
  onDepartmentFocusValue,
  filteredDepartments,
  departmentInput,
  dropdownRef,
  handleProcessOptionClick,
  handleProcessChange,
  processInput,
  onProcessFocusVisible,
  handleProcessKeyDownEnter,
  processRef,
  isProcessDropOpen,
  isLoading,
}: any) => {
  const focusRef = useRef<any>(null);
  const focuusProcessRef = useRef<any>(null);
  const [searchField, setSearchField] = useState<string>('');
  const router = useRouter();
  const { departmentInput: newDepartmentInput } = useOperationCardList();
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
  // useEffect(() => {
  //   handleDepartmentDropdown(filtersData?.product);
  // }, []);

  useEffect(() => {
    focusRef.current.focus();
  }, []);
  console.log(processValue, 'PROCESS VALUE');
  return (
    <div className="spacing-mt" style={{ paddingBottom: '7rem' }}>
      <div className="row">
        {inputField.map((data, index) => (
          <div className="col-md-3 mb-2" key={data?.name || index}>
            <form>
              <div>
                <label className="w-100 dark-blue fw-bold text-capitalize fs-13">{data?.label}</label>
                {data?.label === 'department' ? (
                  <div className="d-inline-block w-100">
                    <div className={meltingStyle.custom_dropdown_wrapper} ref={dropdownRef}>
                      <input
                        type="text"
                        className={`${meltingStyle.custom_dropdown_input} form-control inputFields fs-13 rounded-2`}
                        value={departmentInput}
                        onChange={(e) => handleDepartmentChange(e, data.name)}
                        onFocus={onDepartmentFocusValue}
                        onKeyDown={handleKeyDownEnter}
                        placeholder="Search department"
                        ref={data?.name === 'search' ? focusRef : null}
                      />
                      {isDropdownOpen &&
                        (isLoading ? (
                          'Loading'
                        ) : (
                          <div className={meltingStyle.custom_dropdown_options}>
                            {departmentValue
                              .filter(
                                (department: any) => department?.title?.toLowerCase().includes(departmentInput.toLowerCase())
                              )
                              .map((list: any, idx: any) => (
                                <div
                                  key={idx}
                                  className={meltingStyle.custom_dropdown_option}
                                  onClick={() => handleOptionClick(list)}
                                >
                                  {list?.title}
                                </div>
                              ))}
                            {departmentValue.length === 0 && (
                              <div className={`${meltingStyle.custom_dropdown_option} disabled`}>No options</div>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                ) : data?.label === 'process' ? (
                  <div className="d-inline-block w-100">
                    <div className={meltingStyle.custom_dropdown_wrapper} ref={processRef}>
                      <input
                        type="text"
                        className={`${meltingStyle.custom_dropdown_input} form-control inputFields fs-13 rounded-2`}
                        value={processInput}
                        onChange={(e) => handleProcessChange(e, data?.name)}
                        onFocus={onProcessFocusVisible}
                        onKeyDown={handleProcessKeyDownEnter}
                        placeholder="Search Process"
                        ref={data?.name === 'search' ? focusRef : null}
                      />
                      {isProcessDropOpen &&
                        (isLoading ? (
                          'Loading'
                        ) : (
                          <div className={meltingStyle.custom_dropdown_options}>
                            {processValue
                              ?.filter(
                                (department: any) => department?.title?.toLowerCase().includes(processInput?.toLowerCase())
                              )
                              ?.map((list: any, idx: any) => (
                                <div
                                  key={idx}
                                  className={meltingStyle.custom_dropdown_option}
                                  onClick={() => handleProcessOptionClick(list)}
                                >
                                  {list?.title}
                                </div>
                              ))}
                            {processValue.length === 0 && (
                              <div className={`${meltingStyle.custom_dropdown_option} disabled`}>No options</div>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  // Regular Input Field
                  <input
                    type="text"
                    className="form-control inputFields fs-13 rounded-2"
                    value={filtersData[data?.name]}
                    onChange={(e) => handleInputChange(e, data.name)}
                    onKeyDown={handleKeyDownEnter}
                    ref={data?.name === 'search' ? focusRef : null}
                  />
                )}
              </div>
            </form>
          </div>
        ))}
      </div>

      <div className="filter-wrapper mt-2 row align-items-center">
        <div className="col-12">
          <button className="btn btn-primary text-capitalize filter-btn fs-13 me-2 mb-2" onClick={handleApplyFilters}>
            Apply filter
          </button>
          {premittedProducts &&
            premittedProducts?.length > 0 &&
            premittedProducts?.map((ele: any, idx: any) => {
              return (
                <button
                  className="btn btn-primary text-capitalize filter-btn fs-13 me-2 mb-2"
                  onClick={() => handleButtonFilter(ele)}
                >
                  {ele}
                </button>
              );
            })}

          <Link href="" className="px-3 py-0 my-0 fs-14" onClick={handleClearFilters}>
            Clear Filter
          </Link>

          <label>
            <input
              type="checkbox"
              checked={Number(filtersData?.show_zero_balance) === 1}
              onChange={handleCheckbox}
              style={{ cursor: 'pointer' }}
            />
            <span className="ps-2">Show zero balance record</span>
          </label>

          <label className="ps-3">
            <input type="checkbox" checked={selectAllCheckbox} onChange={handleSelectAllCheckbox} style={{ cursor: 'pointer' }} />
            <span className="ps-2">Select all</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default OperationCardListingField;
