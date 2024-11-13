import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams, useRouter } from 'next/navigation';
import { get_access_token } from '@/store/slice/login-slice';
import { CONSTANTS, callFormDataPOSTAPI } from '@/services/config/api-config';
import GETReportLossItem from '@/services/api/operation-card-report-loss/report-loss-item-api';
import GETOperationCardReportLoss from '@/services/api/operation-card-report-loss/operation-card-report-loss';
import GETReportLossFactory from '@/services/api/loss-period/report-loss-factory-api';
import GETFinancialYear from '@/services/api/loss-period/report-loss-financial-year-api';
import GETAfterFinancialYear from '@/services/api/loss-period/financial-loss-period-api';
import GETReportPerKgLossVatav from '@/services/api/operation-card-report-loss/report-loss-per-kg-loss-vatav-api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useReportLoss = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const getFinancialYearValueFromURL: string | null = searchParams.get('financial_year');
  const getLossPeriodValueFromURL: string | null = searchParams.get('loss_period');
  const getFactoryValueFromURL: string | null = searchParams.get('factory');
  const { token, username } = useSelector(get_access_token);
  const [lossPeriodList, setLossPeriodList] = useState<any>([]);
  const [reportLossData, setReportLossData] = useState([]);
  const [reportLossItem, setReportLossItem] = useState([]);
  const [selectedLossPeriodValue, setSelectedLossPeriodValue] = useState<string>('');
  const [factoryList, setFactoryList] = useState<any>([]);
  const [financialYearList, setFinancialYear] = useState<any>([]);
  const [perKgLossVatav, setPerKgLossVatav] = useState<any>([]);
  const disabledItems: any = {};
  const getFinancialYearList = async () => {
    const getLossReportFinancialYearFromAPI = await GETFinancialYear(token);
    if (getLossReportFinancialYearFromAPI?.status === 200) {
      setFinancialYear(getLossReportFinancialYearFromAPI?.data?.data);
    } else {
      setFinancialYear([]);
    }
  };

  const getLossReportFactoryFromAPI = async () => {
    const getFactoryList: any = await GETReportLossFactory(token);
    if (getFactoryList?.status === 200) {
      setFactoryList(getFactoryList?.data?.data);
    } else {
      setFactoryList([]);
    }
  };

  const getReportLossItem = async () => {
    const fetchReportLossItem: any = await GETReportLossItem(
      getFinancialYearValueFromURL,
      getLossPeriodValueFromURL,
      getFactoryValueFromURL,
      username,
      token
    );

    if (fetchReportLossItem?.status === 200) {
      setReportLossItem(fetchReportLossItem?.data?.message);
    } else {
      setReportLossItem([]);
    }
  };

  const getReportLossData = async () => {
    const fetchReportLossData: any = await GETOperationCardReportLoss(
      getFinancialYearValueFromURL,
      getLossPeriodValueFromURL,
      getFactoryValueFromURL,
      username,
      token
    );

    if (fetchReportLossData?.status === 200) {
      setReportLossData(fetchReportLossData?.data?.message);
    } else {
      setReportLossData([]);
    }
  };

  const getPerKgLossVatav = async () => {
    const fetchPerKgLossVatav: any = await GETReportPerKgLossVatav(
      getFinancialYearValueFromURL,
      getLossPeriodValueFromURL,
      getFactoryValueFromURL,
      token
    );
    if (fetchPerKgLossVatav?.status === 200) {
      setPerKgLossVatav(fetchPerKgLossVatav?.data?.message);
    } else {
      setPerKgLossVatav([]);
    }
  };

  const handleFinancialYearValuesChange = (financialYearValue: any) => {
    getLossPeriodListAfterFinancialYear(financialYearValue);
    const currentUrl = new URL(window.location.href);
    const queryParams = new URLSearchParams(currentUrl.search);

    // Check if 'financial_year' parameter exists
    if (queryParams.has('financial_year')) {
      // Override the existing value
      queryParams.set('financial_year', financialYearValue);
    }
    queryParams.forEach((value, key) => {
      queryParams.set(key, value.replace(/\+/g, '%20'));
    });

    // Update the URL with the modified query parameters
    const newUrl = `${currentUrl.pathname}?${queryParams.toString()}`;
    router.push(`${decodeURI(newUrl)}`);
  };

  const handleFinancialYearValuesChange1 = (financialYearValue: any) => {
    getLossPeriodListAfterFinancialYear(financialYearValue);
   
  };

  const handleLossPeriodValuesChange = (lossPeriodValue: any) => {
    const currentUrl = new URL(window.location.href);
    const queryParams = new URLSearchParams(currentUrl.search);

    // Check if 'loss_period' parameter exists
    if (queryParams.has('loss_period')) {
      // Override the existing value
      queryParams.set('loss_period', lossPeriodValue);
    }
    queryParams.forEach((value, key) => {
      queryParams.set(key, value.replace(/\+/g, '%20'));
    });

    // Update the URL with the modified query parameters
    const newUrl = `${currentUrl.pathname}?${queryParams.toString()}`;
    router.push(`${decodeURI(newUrl)}`);
  };

  const handleFactoryValuesChange = (factoryValue: any) => {
    const currentUrl = new URL(window.location.href);
    const queryParams = new URLSearchParams(currentUrl.search);

    // Check if 'loss_period' parameter exists
    if (queryParams.has('factory')) {
      // Override the existing value
      queryParams.set('factory', factoryValue);
    }
    queryParams.forEach((value, key) => {
      queryParams.set(key, value.replace(/\+/g, '%20'));
    });

    // Update the URL with the modified query parameters
    const newUrl = `${currentUrl.pathname}?${queryParams.toString()}`;
    router.push(`${decodeURI(newUrl)}`);
  };

  const getLossPeriodListAfterFinancialYear = async (selectedFinancialYear: any) => {
    const getLossReportListDataFromAPI = await GETAfterFinancialYear(token, selectedFinancialYear);

    if (getLossReportListDataFromAPI?.status === 200) {
      setLossPeriodList(getLossReportListDataFromAPI?.data?.data);
    } else {
      setLossPeriodList([]);
    }
  };

  async function convertFunc(item_name: any, index: number) {
    const url = `${CONSTANTS.API_BASE_URL}/api/method/custom_app.custom_app.doctype.internal_transfer.create_internal_transfer_from_parent_lot_loss.create_internal_transfer_for_unrecoverable_loss`;
    const formData: any = new FormData();
    formData.append('item', item_name);
    formData.append('loss_period', getLossPeriodValueFromURL);
    formData.append('factory', getFactoryValueFromURL);
    const button = document.getElementById(item_name);
    if (button instanceof HTMLButtonElement) {
      button.disabled = true;
      if (!disabledItems[index]) {
        disabledItems[index] = setTimeout(
          () => {
            delete disabledItems[index];
            button.disabled = false;
          },
          5 * 60 * 1000
        ); // 5 minutes in milliseconds
      }
    }
    try {
      const getAPIResponse = await callFormDataPOSTAPI(url, formData, token);
      if (getAPIResponse?.status === 200) {
        if (getAPIResponse?.data?.message?.msg !== 'error') {
          toast.success(`${getAPIResponse?.data?.message?.data}`);
          return getAPIResponse?.data?.message?.data;
        } else {
          toast.error(`${getAPIResponse?.data?.message?.data}`);
          return null;
        }
      }
    } catch (error) {
      toast.error('Error occurred while submitting');
    }
  }

  const handleTransferAPI = async () => {
    const url = `${CONSTANTS.API_BASE_URL}/api/method/custom_app.custom_app.doctype.internal_transfer.create_internal_transfer_from_parent_lot_loss.create_material_issue_for_unrecoverable_loss`;
    const formData: any = new FormData();
    formData.append('loss_period', getLossPeriodValueFromURL);
    formData.append('factory', getFactoryValueFromURL);
    try {
      const getAPIResponse = await callFormDataPOSTAPI(url, formData, token);
      if (getAPIResponse?.status === 200) {
        if (getAPIResponse?.data?.message?.msg !== 'error') {
          toast.success(`${getAPIResponse?.data?.message?.data}`);
          return getAPIResponse?.data?.message?.data;
        } else {
          toast.error(`${getAPIResponse?.data?.message?.data}`);
          return null;
        }
      }
    } catch (error) {
      toast.error('Error occurred while transferring');
    }
  };
  const ObjToStoreLossReportTable = {
    fine_loss: 0,
    total_out_weight: 0,
    per_kg_loss: 0,
    metal_recieved_after_recovery: 0,
    recovered_loss: 0,
    per_kg_loss_after_recovery: 0,
    uncrecoverable_loss: 0,
    balance_loss: 0,
    percentage_recovered: 0,
  };

  const ObjToStoreLossReportItem = {
    in_weight: 0,
    out_weight: 0,
    balance: 0,
  };
  const CalculateTotalOfLossReport = (column: string, data: any[]) => {
    if (column === 'per_kg_loss') {
      const totalfineLoss = data.reduce((total: any, item: any) => total + item['fine_loss'], 0);

      const totalOutWeight = data.reduce((total: any, item: any) => total + item['total_out_weight'], 0);

      if (totalfineLoss !== 0 && totalOutWeight !== 0) {
        const totalPerKgLoss = (totalfineLoss / totalOutWeight) * 1000;
        if (totalPerKgLoss !== 0 && (totalPerKgLoss < -0.001 || totalPerKgLoss > 0.001)) {
          ObjToStoreLossReportTable.per_kg_loss = Number(totalPerKgLoss.toFixed(3));
          return totalPerKgLoss.toFixed(3);
        }
      } else {
        return '--';
      }
    }

    // per kg loss after recovery
    if (column === 'per_kg_loss_after_recovery') {
      const totalfineLoss = data.reduce((total: any, item: any) => total + item['fine_loss'], 0);
      const totalOutWeight = data.reduce((total: any, item: any) => total + item['total_out_weight'], 0);

      const totalRecoveredLoss = data.reduce((total: any, item: any) => total + item['recovered_loss'], 0);

      const diff = totalfineLoss - totalRecoveredLoss;
      if (diff !== 0 && totalOutWeight !== 0) {
        const totalkglossrecored = (diff / totalOutWeight) * 1000;
        if (totalkglossrecored !== 0 && (totalkglossrecored < -0.001 || totalkglossrecored > 0.001)) {
          ObjToStoreLossReportTable.per_kg_loss_after_recovery = Number(totalkglossrecored.toFixed(3));
          return totalkglossrecored.toFixed(3);
        }
      } else {
        ('--');
      }
    }
    // All other total values other than per kg
    const total = data.reduce((acc: number, item: any) => {
      return acc + item[column];
    }, 0);

    if (total !== 0 && (total < -0.001 || total > 0.001)) {
      ObjToStoreLossReportTable.uncrecoverable_loss = Number(total.toFixed(3));
      return total.toFixed(3);
    } else {
      return '--';
    }
  };

  const CalculateTotalOfReportItem = (column: string, data: any[]) => {
    const total = data.reduce((acc: number, item: any) => {
      // if (item[column] !== 0) {
      return acc + item[column];
      // }
    }, 0);
    if (total !== 0 && (total < -0.001 || total > 0.001)) {
      ObjToStoreLossReportItem.out_weight = Number(total.toFixed(3));
      return total.toFixed(3);
    } else {
      return '--';
    }
  };

  let totalUnrecoverableLoss = CalculateTotalOfLossReport('uncrecoverable_loss', reportLossData);
  let totalBalance = CalculateTotalOfReportItem('out_weight', reportLossItem);
  let difference_of_unrecoverableloss_and_outweight = 0;
  if (totalBalance === '--' && totalUnrecoverableLoss === '--') {
    difference_of_unrecoverableloss_and_outweight = 0;
  } else if (totalBalance === '--') {
    totalBalance = 0;
    difference_of_unrecoverableloss_and_outweight = parseFloat(totalUnrecoverableLoss) + parseFloat(totalBalance);
  } else if (totalUnrecoverableLoss === '--') {
    totalUnrecoverableLoss = 0;
    difference_of_unrecoverableloss_and_outweight = parseFloat(totalUnrecoverableLoss) + parseFloat(totalBalance);
  } else {
    difference_of_unrecoverableloss_and_outweight = parseFloat(totalUnrecoverableLoss) + parseFloat(totalBalance);
  }
  difference_of_unrecoverableloss_and_outweight = parseFloat(difference_of_unrecoverableloss_and_outweight.toFixed(3));
  let totalBalanceOFLossReportItem = CalculateTotalOfReportItem('balance', reportLossItem);

  useEffect(() => {
    getFinancialYearList();
    getLossReportFactoryFromAPI();
    const currentUrl = new URL(window.location.href);
    const queryParams = new URLSearchParams(currentUrl.search);
    const selectedFinancialYear = queryParams.get('financial_year');
    if (selectedFinancialYear) {
      getLossPeriodListAfterFinancialYear(selectedFinancialYear);
    } else {
      // If no financial year is selected
      setLossPeriodList([]);
    }
  }, []);

  useEffect(() => {
    getReportLossData();
    getReportLossItem();
    getPerKgLossVatav();
  }, [searchParams]);

  return {
    reportLossData,
    reportLossItem,
    lossPeriodList,
    selectedLossPeriodValue,
    setSelectedLossPeriodValue,
    handleLossPeriodValuesChange,
    handleFactoryValuesChange,
    getLossPeriodValueFromURL,
    getFactoryValueFromURL,
    handleTransferAPI,
    convertFunc,
    CalculateTotalOfReportItem,
    CalculateTotalOfLossReport,
    ObjToStoreLossReportTable,
    ObjToStoreLossReportItem,
    difference_of_unrecoverableloss_and_outweight,
    totalBalanceOFLossReportItem,
    factoryList,
    financialYearList,
    handleFinancialYearValuesChange,
    handleFinancialYearValuesChange1,
    getFinancialYearValueFromURL,
    perKgLossVatav,
  };
};

export default useReportLoss;
