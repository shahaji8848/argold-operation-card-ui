import useInputAutoComplete from '@/hooks/input_auto_complete_hook';
import React, { useEffect, useState } from 'react';

const AutoCompleteField = ({ list, label }: any) => {
  const [field, setField] = useState('');
  const {
    setOptionValue,
    inputValueAutoComplete,
    setInputValueAutoComplete,
    showSuggestionsAutoCompleteHandlerAutoComplete,
    inputRef,
    showSuggestionsAutoComplete,
    filteredSuggestionsAutoComplete,
    handleSuggestionClickAutoComplete,
  } = useInputAutoComplete();

  useEffect(() => {
    console.log('fields list', list);
    if (list?.length === 0) {
    } else {
      const fieldData = list?.map((karigar_item: any) => karigar_item?.value);
      console.log('fields list data', fieldData);
      setOptionValue(fieldData);
      setField(fieldData);
    }
  }, [list, setOptionValue]);

  useEffect(() => {
    showSuggestionsAutoCompleteHandlerAutoComplete();
  }, [inputValueAutoComplete]);
  return (
    <div>
      <div>
        <div className="fs-14 ">
          <div className="position-relative ">
            <input
              type="text"
              id={field}
              value={inputValueAutoComplete}
              className={`form-control w-100 ${!field ? 'is-invalid' : ''}`}
              autoComplete="off"
              onChange={(e) => {
                setInputValueAutoComplete(e.target.value);
                showSuggestionsAutoCompleteHandlerAutoComplete();
                console.log('Input value:', e.target.value);
              }}
              onFocus={showSuggestionsAutoCompleteHandlerAutoComplete}
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
                  {filteredSuggestionsAutoComplete?.map((suggestion, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        handleSuggestionClickAutoComplete(suggestion);
                      }}
                      style={{
                        cursor: 'pointer',
                        padding: '7px',
                        fontWeight: 'bold',
                      }}
                      className="fileredValue-hover force-overflow"
                      id="style-2"
                    >
                      {suggestion}
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
