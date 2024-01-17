import { useEffect, useRef, useState } from 'react';

const useInputAutoComplete = (listOfDropdownValues?: any) => {
  console.log('karigar list hook', listOfDropdownValues);
  const [optionvalue, setOptionValue] = useState<any>([]);

  const [inputValueAutoComplete, setInputValueAutoComplete] =
    useState<string>('');
  const [filteredSuggestionsAutoComplete, setFilteredSuggestionsAutoComplete] =
    useState<any>([]);
  const [showSuggestionsAutoComplete, setShowSuggestionsAutoComplete] =
    useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // this login is for hide and show suggestion based on click
  useEffect(() => {
    const handleOutsideClickAutoComplete = (event: any) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestionsAutoComplete(false);
      }
    };

    window.addEventListener('click', handleOutsideClickAutoComplete);

    return () => {
      window.removeEventListener('click', handleOutsideClickAutoComplete);
    };
  }, []);

  useEffect(() => {
    console.log('modal listOfDropdownValues', listOfDropdownValues);
    if (listOfDropdownValues !== undefined) {
      setOptionValue([...listOfDropdownValues]);
      setFilteredSuggestionsAutoComplete([...listOfDropdownValues]);
    }
  }, [listOfDropdownValues]);

  // useEffect(() => {
  //   showFilteredValuesHandler();
  // }, [inputValueAutoComplete]);

  const handleSuggestionClickAutoComplete = (suggestion: any) => {
    setInputValueAutoComplete(suggestion?.value);
    setShowSuggestionsAutoComplete(false);
  };

  const dropdownsHideAfterLosingFocus = () => {
    setShowSuggestionsAutoComplete(false);
  };

  const showFilteredValuesHandler = () => {
    const trimmedInput = inputValueAutoComplete?.trim().toLowerCase();

    // filteredSuggestionsAutoComplete

    if (trimmedInput === '' || !trimmedInput || trimmedInput.length === 0) {
      // If input is empty, contains only whitespace, or doesn't exist, show all suggestions
      setFilteredSuggestionsAutoComplete(optionvalue);
      setShowSuggestionsAutoComplete(true);
    } else {
      const filtered: any = optionvalue.filter(
        (suggestion: any) =>
          // suggestion.toLowerCase().includes(trimmedInput)
          suggestion?.value?.toLowerCase().startsWith(trimmedInput)
      );

      // setFilteredSuggestionsAutoComplete(filtered);
      // Always show all suggestions if there is no match
      setFilteredSuggestionsAutoComplete(
        filtered.length > 0 ? filtered : [' Not Found ']
      );
      setShowSuggestionsAutoComplete(true);
    }
    console.log('modal', optionvalue);
  };

  //passing all the data and function
  return {
    setOptionValue,
    setFilteredSuggestionsAutoComplete,
    inputValueAutoComplete,
    setInputValueAutoComplete,
    showFilteredValuesHandler,
    inputRef,
    setShowSuggestionsAutoComplete,
    showSuggestionsAutoComplete,
    filteredSuggestionsAutoComplete,
    handleSuggestionClickAutoComplete,
    dropdownsHideAfterLosingFocus,
  };
};

export default useInputAutoComplete;
