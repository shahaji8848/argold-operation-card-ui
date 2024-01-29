import useInputAutoComplete from '@/hooks/input_auto_complete_hook';

const AutoCompleteField = ({
  listOfDropdownObjs,
  label,
  handleDropDownValuesChange,
  initialValue,
  isReadOnly,
}: any) => {
  const {
    inputValueAutoComplete,
    showFilteredValuesHandler,
    inputRef,
    showSuggestionsAutoComplete,
    filteredSuggestionsAutoComplete,
    handleSuggestionClickAutoComplete,
  } = useInputAutoComplete(listOfDropdownObjs, initialValue);
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
                handleDropDownValuesChange(label, e.target.value);
                showFilteredValuesHandler(e.target.value);
              }}
              onFocus={() => showFilteredValuesHandler()}
              ref={inputRef}
              readOnly={isReadOnly}
              disabled={isReadOnly}
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
                          textAlign: 'start',
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
