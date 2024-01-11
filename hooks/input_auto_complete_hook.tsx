import { useEffect, useRef, useState } from 'react';

const useInputAutoComplete = () => {
  const [optionvalue, setOptionValue] = useState<any>([]);

  const [inputValueAutoComplete, setInputValueAutoComplete] = useState('');
  const [filteredSuggestionsAutoComplete, setFilteredSuggestionsAutoComplete] =
    useState([]);
  const [showSuggestionsAutoComplete, setShowSuggestionsAutoComplete] =
    useState(false);
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

  const handleSuggestionClickAutoComplete = (suggestion: string) => {
    setInputValueAutoComplete(suggestion);
    setShowSuggestionsAutoComplete(false);
  };

  const showSuggestionsAutoCompleteHandlerAutoComplete = () => {
    const trimmedInput = inputValueAutoComplete.trim().toLowerCase();

    if (trimmedInput === '' || !trimmedInput || trimmedInput.length === 0) {
      // If input is empty, contains only whitespace, or doesn't exist, show all suggestions
      setFilteredSuggestionsAutoComplete(optionvalue);
      setShowSuggestionsAutoComplete(true);
    } else {
      const filtered: any = optionvalue.filter((suggestion: any) =>
        // suggestion.toLowerCase().includes(trimmedInput)
        suggestion.toLowerCase().startsWith(trimmedInput)
      );

      // setFilteredSuggestionsAutoComplete(filtered);
      // Always show all suggestions if there is no match
      setFilteredSuggestionsAutoComplete(
        filtered.length > 0 ? filtered : [' Not Found ']
      );
      setShowSuggestionsAutoComplete(true);
    }
  };

  //passing all the data and function
  return {
    setOptionValue,
    inputValueAutoComplete,
    setInputValueAutoComplete,
    showSuggestionsAutoCompleteHandlerAutoComplete,
    inputRef,
    showSuggestionsAutoComplete,
    filteredSuggestionsAutoComplete,
    handleSuggestionClickAutoComplete,
  };
};

export default useInputAutoComplete;
