import useInputAutoComplete from '@/hooks/input_auto_complete_hook';
import { useEffect } from 'react';

const AutoCompleteField = ({
  listOfDropdownObjs,
  label,
  handleDropDownValuesChange,
  handleSubmit,
  initialValue,
  isReadOnly,
  getOperationCardProductCategory,
  getOperationCardNextProductProcess,
  modalDropdownFieldsProp,
  operationCardDetailData,
}: any) => {
  const {
    inputValueAutoComplete,
    showFilteredValuesHandler,
    inputRef,
    showSuggestionsAutoComplete,
    filteredSuggestionsAutoComplete,
    handleSuggestionClickAutoComplete,
    selectedOption,
    setInputValueAutoComplete,
  } = useInputAutoComplete(listOfDropdownObjs, initialValue, handleSubmit);

  console.log('select option in drop', listOfDropdownObjs);
  useEffect(() => {
    if (label === 'machine_size') {
      // Case 1: Machine size is returned from API
      if (initialValue !== '') {
        setInputValueAutoComplete(initialValue);
      } else if (listOfDropdownObjs.length > 0) {
        // Case 2 & 3: No machine size from API or no design selected
        showFilteredValuesHandler();
      } else {
        // If there is no value, clear the machine size
        setInputValueAutoComplete('');
        handleDropDownValuesChange('machine_size', { name: '' });
      }
    }
  }, [initialValue, label, listOfDropdownObjs]);

  useEffect(() => {
    if (showSuggestionsAutoComplete === false) {
      console.log('select dropdown value', inputValueAutoComplete);
      if (label === 'next_karigar' || label === 'karigar') {
        handleDropDownValuesChange(label, {
          value: inputValueAutoComplete?.value,
        });
      } else {
        handleDropDownValuesChange(label, {
          name: inputValueAutoComplete?.name,
        });
      }
    }
  }, [showSuggestionsAutoComplete]);

  useEffect(() => {
    if (label === 'machine_size' && initialValue) {
      handleDropDownValuesChange('machine_size', { name: initialValue });
    }
  }, [initialValue, label]);

  console.log('initialValue', initialValue);
  console.log('label', label);
  return (
    <div>
      <div>
        <div className="fs-14 ">
          <div className="position-relative ">
            <input
              type="text"
              // id={field}
              value={label === 'machine_size' && initialValue !== undefined ? initialValue : inputValueAutoComplete?.value}
              className={`form-control w-100 `}
              autoComplete="off"
              onChange={(e) => {
                handleDropDownValuesChange(label, e.target.value);
                showFilteredValuesHandler(e.target.value);
              }}
              onFocus={() => showFilteredValuesHandler()}
              // onKeyDown={(e) => {
              //   // Check for Ctrl + Enter manually if needed
              //   if (e.key === 'Enter') {
              //     e.preventDefault();
              //     handleSubmit();
              //   }
              // }}
              ref={inputRef}
              readOnly={isReadOnly}
              disabled={label === 'machine_size' && initialValue ? initialValue : isReadOnly}
            />

            {showSuggestionsAutoComplete && filteredSuggestionsAutoComplete.length > 0 && (
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
                {filteredSuggestionsAutoComplete?.map((suggestion: any, index: number) => (
                  <div
                    key={index}
                    onClick={() => {
                      if (label === 'gpc_product') {
                        getOperationCardProductCategory(suggestion.value);
                      } else if (label === 'product') {
                        getOperationCardNextProductProcess(suggestion.value);
                      }
                      handleSuggestionClickAutoComplete(suggestion);
                      handleDropDownValuesChange(label, suggestion);
                    }}
                    style={{
                      cursor: 'pointer',
                      padding: '7px',
                      fontWeight: 'bold',
                      textAlign: 'start',
                      // border: '2px solid red',
                    }}
                    className={`fileredValue-hover force-overflow 
                        ${
                          // handleDropDownValuesChange(label, suggestion) ||
                          index === selectedOption ? 'selected force-overflow' : ''
                        }
                        `}
                    id={`style-2-${index}`}
                  >
                    {suggestion?.value}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoCompleteField;
