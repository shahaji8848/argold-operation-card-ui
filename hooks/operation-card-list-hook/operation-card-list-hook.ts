import POSTApproveAPI from '@/services/api/operation-card-list-page/approve-post-api';
import GETDepartmentFilters, { GETProcessFilters } from '@/services/api/operation-card-list-page/get-department-filter';
import GETOperationCardListData from '@/services/api/operation-card-list-page/operation-card-list-api';
import GETPremittedUserAPI from '@/services/api/operation-card-list-page/premitted-user-api';
import { get_access_token, storeToken } from '@/store/slice/login-slice';
import { FieldTypes } from '@/types/oc-list-input-field-types';
import { filter } from 'mathjs';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useOperationCardList = () => {
  const { token, username } = useSelector(get_access_token);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [listData, setListData] = useState<any>([]);

  const [filtersClear, setFiltersClear] = useState(0);
  const [checked, setChecked] = useState(false);
  const [premittedProducts, setPremittedProducts] = useState([]);
  const [filtersData, setFiltersData] = useState<FieldTypes>({
    search: '',
    name: '',
    parent_melting_lot: '',
    melting_lot: '',
    product_purity: '',
    product: '',
    product_process: '',
    operation_department: '',
    karigar: '',
    bom_code: '',
    ord: '',
    show_zero_balance: 0,
  });

  const [departmentValue, setDepartmentValue] = useState<any>([]);
  const [processValue, setProcessValue] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProcessDropOpen, setIsProcessDropOpen] = useState(false);
  const [departmentInput, setDepartmentInput] = useState(''); // Input field value
  const [processInput, setProcessInput] = useState(''); // Input field value
  const [filteredDepartments, setFilteredDepartments] = useState([]); // Filtered department|
  const [filterProcess, setFilterProcess] = useState([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Create a ref for the dropdown
  const processRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [product, setProduct] = useState('');

  const onDepartmentFocusValue = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // const inputValue = e.target.value;
    // const filtered = departmentValue.filter(
    //   (department: any) => department?.title?.toLowerCase().includes(inputValue.toLowerCase() || [])
    // );
    // setFilteredDepartments(filtered);
    setIsDropdownOpen(true);
    // await handleDepartmentDropdown(filtersData?.product);
  };

  const onProcessFocusVisible = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsProcessDropOpen(true);
    // const inputValue = e.target.value;
    // const filtered = processValue.filter(
    //   (department: any) => department?.title?.toLowerCase().includes(inputValue.toLowerCase() || [])
    // );
    // setFilterProcess(filtered);
    // await handleDepartmentDropdown(filtersData?.product);
  };

  const handleDepartmentChange = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const value = e.target.value;
    // handleInputChange(e, fieldName);
    setDepartmentInput(value);
    // if (!value && !filtersData.product) {
    //   await handleDepartmentDropdown(filtersData?.product);
    // } else if (!value && filtersData?.product) {
    //   await handleDepartmentDropdown(filtersData?.product);
    // } else if (filtersData.product) {
    //   await handleDepartmentDropdown(filtersData?.product);
    // } else {
    // await handleDepartmentDropdown(value);
    // }
    // const filtered = departmentValue.filter((department: any) => department?.title?.toLowerCase().includes(value.toLowerCase()));
    // setFilteredDepartments(filtered:);
    setFiltersData((prevFiltersData: any) => ({
      ...prevFiltersData,
      operation_department: e.target.value,
    }));
    setIsDropdownOpen(true);
    // Fetch the updated operation card list using the updated filters
    const updatedUrl = constructUrl({ ...filtersData, [fieldName]: value });
    // await getOperationCardListFromAPI(updatedUrl); // Call the API with the new URL
    // Update the URL in the browser
    // URLForFiltersHandler(); // Ensure the URL reflects the new filter state
  };

  const handleProcessChange = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const value = e.target.value;
    // handleInputChange(e, fieldName);
    setProcessInput(value);
    // if (!value && !filtersData.product) {
    //   await handleDepartmentDropdown(filtersData?.product);
    // } else if (!value && filtersData?.product) {
    //   await handleDepartmentDropdown(filtersData?.product);
    // } else if (filtersData.product) {
    //   await handleDepartmentDropdown(filtersData?.product);
    // } else {
    //   await handleDepartmentDropdown(value);
    // }
    // const filtered = processValue.filter((department: any) => department?.title?.toLowerCase().includes(value.toLowerCase()));
    // setFilterProcess(filtered);
    setFiltersData((prevFiltersData: any) => ({
      ...prevFiltersData,
      product_process: e.target.value,
    }));
    setIsProcessDropOpen(true);
    // Fetch the updated operation card list using the updated filters
    // const updatedUrl = constructUrl({ ...filtersData, [fieldName]: value });
    // await getOperationCardListFromAPI(updatedUrl); // Call the API with the new URL
    // Update the URL in the browser
    // URLForFiltersHandler(); // Ensure the URL reflects the new filter state
  };

  // Handle input change for filtering and dropdown options
  const handleOptionClick = async (selectedItem: any) => {
    setFiltersData((prevFiltersData) => ({
      ...prevFiltersData,
      operation_department: selectedItem?.title, // Set the selected department title
    }));
    setDepartmentInput(selectedItem?.title);
    // Close the dropdown after selection
    // setDepartmentValue([]); // Optionally clear the dropdown data or manage dropdown state
    setIsDropdownOpen(false);
    // // Update the URL
    router.push(constructUrl({ ...filtersData, operation_department: selectedItem?.title }));
    // await getOperationCardListFromAPI(updatedUrl); // Call the API with the new URL
    // URLForFiltersHandler();
  };
  const handleProcessOptionClick = async (selectedItem: any) => {
    setFiltersData((prevFiltersData) => ({
      ...prevFiltersData,
      product_process: selectedItem?.title, // Set the selected department title
    }));
    setProcessInput(selectedItem?.title);
    // Close the dropdown after selection
    // setProcessValue([]); // Optionally clear the dropdown data or manage dropdown state
    setIsProcessDropOpen(false);
    // // Update the URL

    router.push(constructUrl({ ...filtersData, product_process: selectedItem?.title }));
    // await getOperationCardListFromAPI(updatedUrl); // Call the API with the new URL
    // Update the URL
    // URLForFiltersHandler(); // Ensure the URL reflects the new filter state
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    if (fieldName === 'show_zero_balance') {
      setFiltersData((prevFiltersData: any) => ({
        ...prevFiltersData,
        [fieldName]: e.target.checked ? 1 : 0,
      }));
    } else {
      if (fieldName === 'product') {
        setDepartmentInput('');
        setProcessInput('');
        setFiltersData((prevFiltersData: any) => ({
          ...prevFiltersData,
          product_process: '',
          operation_department: '',
          [fieldName]: e.target.value,
        }));
        handleDepartmentDropdown(e.target.value);
        // handleDepartmentChange(e, 'department');
      } else {
        setFiltersData((prevFiltersData: any) => ({
          ...prevFiltersData,
          [fieldName]: e.target.value,
        }));
      }
    }
  };
  const handleSetProduct = (prod: any) => {};
  const handleDepartmentDropdown = async (prod: any) => {
    setProduct(prod);
  };

  const functionTOFetchProductDepartment = async () => {
    try {
      setLoading(true);
      const getDepartmentBasedOnProduct = await GETDepartmentFilters(product || '', token);
      const getProcessBasedOnFilters = await GETProcessFilters(product || '', token);
      if (getDepartmentBasedOnProduct?.status === 200) {
        setDepartmentValue(getDepartmentBasedOnProduct?.data?.message?.data);
      } else {
        setDepartmentValue([]);
      }
      if (getProcessBasedOnFilters?.status === 200) {
        setProcessValue(getProcessBasedOnFilters?.data?.message?.data);
      } else {
        setProcessValue([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      functionTOFetchProductDepartment();
    }, 300);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [product]);
  // const getProductNDepaartment = async () => {
  //   const getDepartmentBasedOnProduct = await GETDepartmentFilters(products || '', token);
  //   const getProcessBasedOnFilters = await GETProcessFilters(products || '', token);
  //   if (getDepartmentBasedOnProduct?.status === 200) {
  //     console.log(getDepartmentBasedOnProduct?.data?.message?.data, 'gggggggggggggggggg');
  //     setDepartmentValue(getDepartmentBasedOnProduct?.data?.message?.data);
  //   } else {
  //     setDepartmentValue([]);
  //   }
  //   if (getProcessBasedOnFilters?.status === 200) {
  //     setProcessValue(getProcessBasedOnFilters?.data?.message?.data);
  //   } else {
  //     setProcessValue([]);
  //   }
  // };

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     getProductNDepaartment();
  //   }, 300);
  //   return () => clearTimeout(timer);
  // }, [products]);

  const constructUrl = (filtersData: any) => {
    const currentUrl = new URL(window.location.href);
    const queryString = Object.entries(filtersData)
      .filter(([key, value]: any) => value !== '')
      .map(([key, value]: any) => `${key}=${encodeURIComponent(value)}`)
      .join('&');
    // Return the updated URL
    return `${currentUrl.pathname}?${queryString}`;
  };

  const URLForFiltersHandler = () => {
    const getconstructedUrl: any = constructUrl(filtersData);
    router.push(`${getconstructedUrl}`);
  };

  const handleKeyDownEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Add the selected department to filtersData before constructing the URL
      setFiltersData((prevFiltersData: any) => ({
        ...prevFiltersData,
        operation_department: departmentInput, // Use the current department input value
      }));
      URLForFiltersHandler();
    }
  };

  const handleProcessKeyDownEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Add the selected department to filtersData before constructing the URL
      setFiltersData((prevFiltersData: any) => ({
        ...prevFiltersData,
        product_process: processInput, // Use the current department input value
      }));
      URLForFiltersHandler();
    }
  };

  const handleApplyFilters = () => {
    URLForFiltersHandler();
  };

  const handleButtonFilter = (searchValue: any) => {
    setDepartmentInput('');
    setProcessInput('');
    handleDepartmentDropdown(searchValue);
    setFiltersData((prevFiltersData: FieldTypes) => ({
      ...prevFiltersData,
      product_process: '',
      operation_department: '',
      product: searchValue,
    }));
    // const currentURLValue = window.location.href;
    // // Construct the new URL
    // const newURL = new URL(currentURLValue);
    // // Handle spaces in searchValue
    // const encodedSearchValue = encodeURIComponent(searchValue);
    // // newURL.searchParams.set('product', encodedSearchValue);
    // const newURLWithParam = `${newURL.pathname}?product=${encodedSearchValue}`;
    // router.push(newURLWithParam);
  };
  const handelCheckbox = () => {
    URLForFiltersHandler();
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    // Get the search parameters
    const searchParams = url.searchParams;
    // Convert the search parameters to a string
    const searchParamsString = searchParams.toString();
    const keyValuePairs = searchParamsString.split('&');
    // Create an object to store the updated state
    const updatedFiltersData: any = {
      search: '',
      name: '',
      parent_melting_lot: '',
      melting_lot: '',
      product_purity: '',
      product: '',
      product_process: '',
      operation_department: '',
      karigar: '',
      bom_code: '',
      show_zero_balance: '',
    };
    keyValuePairs.forEach((keyValuePair) => {
      const [key, value] = keyValuePair.split('=');
      if (key in updatedFiltersData) {
        // Replace '+' with space before updating the state
        updatedFiltersData[key] = decodeURIComponent(value.replace(/\+/g, ' '));
      }
    });

    // Update the state with the new values
    setFiltersData((prevFiltersData: any) => ({
      ...prevFiltersData,
      ...updatedFiltersData,
    }));
    setProcessInput(updatedFiltersData?.product_process);
    setDepartmentInput(updatedFiltersData?.operation_department);
    getOperationCardListFromAPI(searchParamsString);
    // URLForFiltersHandler();
  }, [searchParams]);

  const handleClearFilters = () => {
    setFiltersData({
      search: '',
      name: '',
      parent_melting_lot: '',
      melting_lot: '',
      product_purity: '',
      product: '',
      product_process: '',
      operation_department: '',
      karigar: '',
      bom_code: '',
      ord: '',
      show_zero_balance: 0,
    });
    setProcessInput('');
    setDepartmentInput('');
    setFiltersClear(1);
    handleDepartmentDropdown('');
  };
  const getOperationCardListFromAPI = async (url: string) => {
    const getList: any = await GETOperationCardListData(url, token, username);
    if (getList?.status === 200 && getList?.data?.message?.length > 0) {
      setListData([...getList?.data?.message]);
    } else {
      setListData([]);
    }
  };

  useEffect(() => {
    if (filtersClear === 1) {
      const currentUrl = new URL(window.location.href);
      router.push(`${currentUrl.pathname}`);
      setFiltersClear(0);
    }
  }, [filtersClear]);

  const PremittedProductAPI = async () => {
    const getPremittedList = await GETPremittedUserAPI(token, username);
    if (getPremittedList?.status === 200 && getPremittedList?.data?.message?.data?.permitted_products?.length > 0) {
      setPremittedProducts(getPremittedList?.data?.message?.data?.permitted_products);
    } else {
      setPremittedProducts([]);
    }
  };

  const disabledItems: any = {};
  const handleApprove = async (rowData: any) => {
    const formData: any = new FormData();
    formData.append('item', rowData);
    const button = document.getElementById(rowData);
    if (button instanceof HTMLButtonElement) {
      button.disabled = true;
      button.classList.add('disabled'); // Add a class to handle styling
      // if (!disabledItems[rowData]) {
      //   disabledItems[rowData] = setTimeout(
      //     () => {
      //       delete disabledItems[rowData];
      //       button.disabled = false;
      //     },
      //     5 * 60 * 1000
      //   ); // 5 minutes in milliseconds
      // }
    }
    try {
      const saveApprove = await POSTApproveAPI(rowData, token);
      if (saveApprove.status === 200) {
        window.location.reload();
      } else {
        // toast.error(saveApprove?.response?.data?.exc_type);
        toast.error(saveApprove?.message);
      }
    } catch (error) {
      // Handle API errors
      toast.error('Something went wrong, please try again.');
    } finally {
      // Enable button again after API request is finished (success or error)
      if (button instanceof HTMLButtonElement) {
        button.disabled = false;
        button.classList.remove('disabled'); // Remove the class when re-enabled
      }
    }
  };

  // Close the dropdown if clicked outside
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
    if (processRef.current && !processRef.current.contains(event.target as Node)) {
      setIsProcessDropOpen(false);
    }
  };

  const handleCheckbox = (event: any) => {
    // Toggle the value
    console.log(event.target.checked, 'hitttt');
    const newValue = event.target.checked ? 1 : 0;
    console.log(newValue, filtersData, 'FilterDATAT');
    setFiltersData((prevFiltersData: any) => ({
      ...prevFiltersData,
      show_zero_balance: newValue,
    }));
    router.push(constructUrl({ ...filtersData, show_zero_balance: newValue }));
    // URLForFiltersHandler();
  };

  useEffect(() => {
    const product = searchParams.get('product');
    handleDepartmentDropdown(product);
    PremittedProductAPI();
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return {
    listData,
    filtersData,
    handleInputChange,
    handleApplyFilters,
    handleClearFilters,
    handleKeyDownEnter,
    URLForFiltersHandler,
    constructUrl,
    handelCheckbox,
    handleButtonFilter,
    premittedProducts,
    handleApprove,
    handleDepartmentDropdown,
    departmentValue,
    handleDepartmentChange,
    handleOptionClick,
    isDropdownOpen,
    setIsDropdownOpen,
    onDepartmentFocusValue,
    filteredDepartments,
    departmentInput,
    dropdownRef,
    processRef,
    isProcessDropOpen,
    setIsProcessDropOpen,
    handleProcessKeyDownEnter,
    processInput,
    filterProcess,
    processValue,
    handleProcessChange,
    handleProcessOptionClick,
    onProcessFocusVisible,
    isLoading,
    handleCheckbox,
  };
};

export default useOperationCardList;
