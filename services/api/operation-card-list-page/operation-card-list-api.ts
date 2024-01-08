import { CONSTANTS, callGetAPI } from '../../config/api-config';

const GETOperationCardFromParentLot = async (filtersData: any) => {
  const fields: string[] = [
    'name',
    'parent_melting_lot',
    'melting_lot',
    'product_purity',
    'product',
    'operation_department',
    'product_process_department',
    'machine_size',
    'design',
    'line_number',
    'karigar',
    'balance_weight',
    'balance_gross_weight',
    'balance_fine_weight',
  ];

  const filters: any = filtersData;

  const url = `${CONSTANTS.API_BASE_URL}/${
    CONSTANTS.STANDARD_API_PATH
  }/Operation Card?fields=${JSON.stringify(fields)}&filters=${JSON.stringify(
    filters
  )}&limit=None`;

  const getAPIResponse: any = await callGetAPI(url);
  return getAPIResponse;
};

const GETOperationCardFromMeltingLot = async (filtersData: string) => {
  const fields: string[] = [
    'name',
    'parent_melting_lot',
    'melting_lot',
    'product_purity',
    'product',
    'operation_department',
    'product_process_department',
    'machine_size',
    'design',
    'line_number',
    'karigar',
    'balance_weight',
    'balance_gross_weight',
    'balance_fine_weight',
  ];

  const filters: any = filtersData;

  const url = `${CONSTANTS.API_BASE_URL}/${
    CONSTANTS.STANDARD_API_PATH
  }/Operation Card?fields=${JSON.stringify(fields)}&filters=${JSON.stringify(
    filters
  )}&limit=None`;

  const getAPIResponse: any = await callGetAPI(url);
  return getAPIResponse;
};

const GETOperationCardListData = async (name: any, filters: any) => {
  console.log('filters', filters);
  let response: any;
  let filterArray = Object.entries(filters)
    .filter(([key, value]) => value !== '')
    .map(([key, value]) => [key, '=', value]);

  if (filterArray?.length !== 0) {
    const filtersDynamicData: any = [
      ...filterArray,
      ['parent_melting_lot', '=', `${name}`],
    ];
    response = await GETOperationCardFromParentLot(filtersDynamicData);
    if (response?.status === 200 && response?.data?.data?.length === 0) {
      const filtersDynamicData: any = [
        ...filterArray,
        ['melting_lot', '=', `${name}`],
      ];
      response = await GETOperationCardFromMeltingLot(filtersDynamicData);
    }
  } else {
    const filtersDynamicData: any = [['parent_melting_lot', '=', `${name}`]];
    response = await GETOperationCardFromParentLot(filtersDynamicData);
    if (response?.status === 200 && response?.data?.data?.length === 0) {
      const filtersDynamicData: any = [['melting_lot', '=', `${name}`]];
      response = await GETOperationCardFromMeltingLot(filtersDynamicData);
    }
  }
  return response;
};

export default GETOperationCardListData;
