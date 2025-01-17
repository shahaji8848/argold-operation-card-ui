import { useEffect, useRef, useState } from 'react';

const useInputAutoComplete = (listOfDropdownValues?: any, initialValue?: any, handleSubmit?: any) => {
  const [optionvalue, setOptionValue] = useState<any>([]);

  const [inputValueAutoComplete, setInputValueAutoComplete] = useState<any>(
    (initialValue && {
      name: '' || initialValue,
      value: '' || initialValue,
    }) ||
      initialValue
  );
  const [filteredSuggestionsAutoComplete, setFilteredSuggestionsAutoComplete] = useState<any>([]);
  const [showSuggestionsAutoComplete, setShowSuggestionsAutoComplete] = useState<boolean>(false);

  useEffect(() => {
    setInputValueAutoComplete({
      name: initialValue,
      value: initialValue,
    });
    const handleOutsideClickAutoComplete = (event: any) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestionsAutoComplete(false);
      }
    };

    window.addEventListener('click', handleOutsideClickAutoComplete);

    return () => {
      window.removeEventListener('click', handleOutsideClickAutoComplete);
    };
  }, []);

  useEffect(() => {
    if (listOfDropdownValues !== undefined) {
      setOptionValue([...listOfDropdownValues]);
      setFilteredSuggestionsAutoComplete([...listOfDropdownValues]);
    }
  }, [listOfDropdownValues]);

  const handleSuggestionClickAutoComplete = (suggestion: any) => {
    setInputValueAutoComplete({
      name: suggestion?.name,
      value: suggestion?.value,
    });
    setShowSuggestionsAutoComplete(false);
  };

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedOption, setSelectedOption] = useState(0);
  const handleKeyDown: any = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        setSelectedOption((prev: any) => (prev >= 0 ? prev - 1 : filteredSuggestionsAutoComplete.length - 1));
        break;

      case 'ArrowDown':
        setSelectedOption((prev: any) => (prev <= filteredSuggestionsAutoComplete.length - 1 ? prev + 1 : 0));
        break;

      case 'Enter':
        if (selectedOption !== null) {
          const suggestion = filteredSuggestionsAutoComplete[selectedOption];

          handleSuggestionClickAutoComplete(suggestion);
        }
        break;
      case 'Tab':
        setShowSuggestionsAutoComplete(false);
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    const handleKeyDownEvent = (event: KeyboardEvent) => {
      if (inputRef.current && event.target === inputRef.current) {
        handleKeyDown(event);

        if (event.key === 'Enter' && showSuggestionsAutoComplete === false) {
          handleSubmit();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDownEvent);
    return () => {
      window.removeEventListener('keydown', handleKeyDownEvent);
    };
  }, [inputRef, handleKeyDown]);

  const selectedOptionElement: any = document.getElementById(`style-2-${selectedOption}`);
  if (selectedOptionElement) {
    selectedOptionElement.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }

  const handleFocusRemove = () => {
    setShowSuggestionsAutoComplete(false);
  };

  const showFilteredValuesHandler = (user_input_value?: string) => {
    //
    const trimmedInput = user_input_value?.trim().toLowerCase();

    setInputValueAutoComplete(user_input_value);

    // filteredSuggestionsAutoComplete

    if (trimmedInput === '' || !trimmedInput || trimmedInput.length === 0) {
      // If input is empty, contains only whitespace, or doesn't exist, show all suggestions
      setFilteredSuggestionsAutoComplete(optionvalue);
      setShowSuggestionsAutoComplete(true);
    } else {
      const filtered: any = optionvalue.filter(
        (suggestion: any) =>
          // suggestion.toLowerCase().includes(trimmedInput)
          suggestion?.value?.toLowerCase()?.includes(trimmedInput)
      );

      // setFilteredSuggestionsAutoComplete(filtered);
      // Always show all suggestions if there is no match
      setFilteredSuggestionsAutoComplete(filtered.length > 0 ? filtered : [{ name: 'Not Found', value: 'Not Found' }]);
      setShowSuggestionsAutoComplete(true);
    }
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
    selectedOption,
  };
};

export default useInputAutoComplete;
