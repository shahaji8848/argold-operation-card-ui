import useInputAutoComplete from '@/hooks/input_auto_complete_hook';
import React, { useEffect, useState } from 'react';

const AutoCompleteField = ({
  listOfDropdownObjs,
  label,
  handleDropDownValuesChange,
  modalDropdownFieldsProp,
}: any) => {
  const [field, setField] = useState('');
  const {
    setOptionValue,
    setFilteredSuggestionsAutoComplete,
    inputValueAutoComplete,
    setInputValueAutoComplete,
    showFilteredValuesHandler,
    inputRef,
    showSuggestionsAutoComplete,
    setShowSuggestionsAutoComplete,
    filteredSuggestionsAutoComplete,
    handleSuggestionClickAutoComplete,
    dropdownsHideAfterLosingFocus,
  } = useInputAutoComplete(listOfDropdownObjs);
  return (
    <div>
      <div>
        <div className="fs-14 ">
          <div className="position-relative ">
            <input
              type="text"
              // id={field}
              value={inputValueAutoComplete}
              className={`form-control w-100 `}
              autoComplete="off"
              onChange={(e) => {
                setInputValueAutoComplete(e.target.value);
                handleDropDownValuesChange(label, e.target.value);
                showFilteredValuesHandler();
              }}
              onFocus={showFilteredValuesHandler}
              onBlur={dropdownsHideAfterLosingFocus}
              ref={inputRef}
            />

            {showSuggestionsAutoComplete &&
              filteredSuggestionsAutoComplete.length > 0 && (
                <div
                  className="position-absolute w-100 scrollbar "
                  style={{
                    border: '1px solid #ccc',
                    height: '150px',
                    overflowY: 'auto',
                    background: 'white',
                    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;',
                    zIndex: '4',
                  }}
                >
                  {filteredSuggestionsAutoComplete?.map(
                    (suggestion: any, index: number) => (
                      <div
                        key={index}
                        onClick={() => {
                          handleSuggestionClickAutoComplete(suggestion);
                          handleDropDownValuesChange(label, suggestion);
                        }}
                        style={{
                          cursor: 'pointer',
                          padding: '7px',
                          fontWeight: 'bold',
                        }}
                        className="fileredValue-hover force-overflow"
                        id="style-2"
                      >
                        {suggestion?.value}
                      </div>
                    )
                  )}
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoCompleteField;
