import POSTApproveAPI from '@/services/api/operation-card-list-page/approve-post-api';
import GETDepartmentFilters from '@/services/api/operation-card-list-page/get-department-filter';
import GETOperationCardListData from '@/services/api/operation-card-list-page/operation-card-list-api';
import GETPremittedUserAPI from '@/services/api/operation-card-list-page/premitted-user-api';
import { get_access_token, storeToken } from '@/store/slice/login-slice';
import { FieldTypes } from '@/types/oc-list-input-field-types';
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
    ord:''
    // show_zero_balance: 0 || 1,
  });

  const [departmentValue, setDepartmentValue] = useState<any>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [departmentInput, setDepartmentInput] = useState(''); // Input field value
  const [filteredDepartments, setFilteredDepartments] = useState([]); // Filtered department
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Create a ref for the dropdown

  const onDepartmentFocusValue = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const filtered = departmentValue.filter(
      (department: any) => department?.title?.toLowerCase().includes(inputValue.toLowerCase() || [])
    );
    setFilteredDepartments(filtered);
    setIsDropdownOpen(true);
  };

  const handleDepartmentChange = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const value = e.target.value;
    handleInputChange(e, fieldName);
    setDepartmentInput(value);
    if (!value && !filtersData.product) {
      await handleDepartmentDropdown(filtersData?.product);
    } else if (!value && filtersData?.product) {
      await handleDepartmentDropdown(filtersData?.product);
    } else if (filtersData.product) {
      await handleDepartmentDropdown(filtersData?.product);
    } else {
      await handleDepartmentDropdown(value);
    }
    const filtered = departmentValue.filter((department: any) => department?.title?.toLowerCase().includes(value.toLowerCase()));

    setFilteredDepartments(filtered);
    setFiltersData((prevFiltersData: any) => ({
      ...prevFiltersData,
      [fieldName]: e.target.value,
    }));
    setIsDropdownOpen(true);
    // Fetch the updated operation card list using the updated filters
    const updatedUrl = constructUrl({ ...filtersData, [fieldName]: value });
    await getOperationCardListFromAPI(updatedUrl); // Call the API with the new URL

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
    setDepartmentValue([]); // Optionally clear the dropdown data or manage dropdown state
    setIsDropdownOpen(false);
    // // Update the URL

    const updatedUrl = constructUrl({ ...filtersData, operation_department: selectedItem?.title });
    await getOperationCardListFromAPI(updatedUrl); // Call the API with the new URL
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    //
    // if (fieldName === 'show_zero_balance') {
    //   setFiltersData((prevFiltersData: any) => ({
    //     ...prevFiltersData,
    //     [fieldName]: e.target.checked ? 1 : 0,
    //   }));
    // } else {
    // }
    setFiltersData((prevFiltersData: any) => ({
      ...prevFiltersData,
      [fieldName]: e.target.value,
    }));
    if (fieldName === 'product') {
      handleDepartmentDropdown(e.target.value);
      // handleDepartmentChange(e, 'department');
    }
  };

  const handleDepartmentDropdown = async (product: any) => {
    const getDepartmentBasedOnProduct = await GETDepartmentFilters(product || '', token);
    if (getDepartmentBasedOnProduct?.status === 200) {
      setDepartmentValue(getDepartmentBasedOnProduct?.data?.message?.data);
    } else {
      setDepartmentValue([]);
    }
  };

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
  const handleApplyFilters = () => {
    URLForFiltersHandler();
  };

  const handleButtonFilter = (searchValue: any) => {
    const currentURLValue = window.location.href;
    // Construct the new URL
    const newURL = new URL(currentURLValue);
    // Handle spaces in searchValue
    const encodedSearchValue = encodeURIComponent(searchValue);
    // newURL.searchParams.set('product', encodedSearchValue);
    const newURLWithParam = `${newURL.pathname}?product=${encodedSearchValue}`;
    router.push(newURLWithParam);
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
      // show_zero_balance: false,
    };

    keyValuePairs.forEach((keyValuePair) => {
      const [key, value] = keyValuePair.split('=');
      if (key in updatedFiltersData) {
        // Replace '+' with space before updating the state
        updatedFiltersData[key] = decodeURIComponent(value.replace(/\+/g, ' '));
      }
    });
    setDepartmentInput(updatedFiltersData?.operation_department);

    // Update the state with the new values
    setFiltersData((prevFiltersData: any) => ({
      ...prevFiltersData,
      ...updatedFiltersData,
    }));
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
      ord:''
      // show_zero_balance: false,
    });
    setDepartmentInput('');
    setFiltersClear(1);
  };
  const getOperationCardListFromAPI = async (url: string) => {
    const getList: any = await GETOperationCardListData(url, token, username);
    if (getList?.status === 200 && getList?.data?.message?.length > 0) {
      setListData([...getList?.data?.message]);
    } else {
      setListData([]);
    }
    setFiltersClear(0);
  };

  useEffect(() => {
    if (filtersClear === 1) {
      const currentUrl = new URL(window.location.href);
      router.push(`${currentUrl.pathname}`);
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

  useEffect(() => {
    PremittedProductAPI();
  }, []);

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
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const product = searchParams.get('product');
    console.log(product, 'Product in useEffetct');
    handleDepartmentDropdown(product);
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
  };
};

export default useOperationCardList;
