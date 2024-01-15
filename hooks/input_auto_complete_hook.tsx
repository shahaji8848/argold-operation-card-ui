import { useEffect, useRef, useState } from 'react';

const useInputAutoComplete = (listOfDropdownValues?: any) => {
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
    // if (listOfDropdownValues !== undefined) {
    const data = [
      'Factory',
      'MC-Kdm',
      'Bappy Nawabi',
      'Babu',
      'Dipu',
      'Sajan',
      'Dharam',
      'Hollow Bapi',
      'Golu',
      'Ashish',
      'Bhim',
      'Ganesh',
      'Bullet',
      'MC-Rajat',
      '-Tushar',
      '-Aftab',
      '-Raju',
      'Bapan',
      'Laxmikant',
      'Prashanto',
    ].map((ele) => {
      return ele;
    });
    setOptionValue(data);
    setFilteredSuggestionsAutoComplete(data);
    // setOptionValue([...listOfDropdownValues]);
    // setFilteredSuggestionsAutoComplete([...listOfDropdownValues]);
    // }
  }, []);

  useEffect(() => {
    showFilteredValuesHandler();
  }, [inputValueAutoComplete]);

  const handleSuggestionClickAutoComplete = (suggestion: any) => {
    // setInputValueAutoComplete(suggestion?.value);
    setInputValueAutoComplete(suggestion);
    setShowSuggestionsAutoComplete(false);
    console.log('k list', suggestion);
  };

  const arr = [
    { name: 'MC-40', value: '40' },
    { name: 'MC-50', value: '50' },
    { name: 'MC-60', value: '60' },
  ];
  const [selectedOption, setSelectedOption] = useState(0);

  const handleKeyDown = (e: any) => {
    switch (e.key) {
      case 'ArrowUp':
        setSelectedOption((prev) =>
          prev >= 0 ? prev - 1 : filteredSuggestionsAutoComplete.length - 1
        );
        break;
      case 'ArrowDown':
        setSelectedOption((prev) =>
          prev <= filteredSuggestionsAutoComplete.length - 1 ? prev + 1 : 0
        );
        break;
      case 'Enter':
        handleSuggestionClickAutoComplete(
          filteredSuggestionsAutoComplete[selectedOption]
        );
        console.log(
          'Selected Option:',
          filteredSuggestionsAutoComplete[selectedOption]
        );
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedOption]);

  const showFilteredValuesHandler = () => {
    console.log('modal input value', inputValueAutoComplete);
    const trimmedInput = inputValueAutoComplete?.trim().toLowerCase();

    // filteredSuggestionsAutoComplete

    if (trimmedInput === '' || !trimmedInput || trimmedInput.length === 0) {
      // If input is empty, contains only whitespace, or doesn't exist, show all suggestions

      setFilteredSuggestionsAutoComplete(optionvalue);
      console.log('optionvalue', optionvalue);
      setShowSuggestionsAutoComplete(true);
      // setSelectedOption(optionvalue);
    } else {
      const filtered: any = optionvalue.filter(
        (suggestion: any) => suggestion.toLowerCase().startsWith(trimmedInput)
        // suggestion?.value?.toLowerCase().startsWith(trimmedInput)
      );

      // setFilteredSuggestionsAutoComplete(filtered);
      // Always show all suggestions if there is no match
      setFilteredSuggestionsAutoComplete(
        filtered.length > 0 ? filtered : [' Not Found ']
      );

      // setSelectedOption(filtered);
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
    selectedOption,
    setSelectedOption,
  };
};

export default useInputAutoComplete;
