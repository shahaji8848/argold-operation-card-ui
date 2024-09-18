import { CONSTANTS, callGetAPI } from '@/services/config/api-config';

const GETMeltingPlanReferenceFromLot = async (melting_lot: any, token: any) => {
  const url = `${CONSTANTS.API_BASE_URL}/api/method/custom_app.custom_app.doctype.operation_card.operation_card_api.get_melting_plan_reference_from_lot?melting_lot=${melting_lot}`;
  const getResponse: any = await callGetAPI(url, token);
  return getResponse;
};

export default GETMeltingPlanReferenceFromLot;
