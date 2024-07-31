import { useRouter } from 'next/navigation';
import OperationCardInputField from './OperationCardInputField';
import Link from 'next/link';
import { CONSTANTS } from '@/services/config/api-config';
const OperationCardHeader = ({ operationCardDetailData, handleOperationCardSave, handleOperationCardApproval }: any) => {
  const router = useRouter();
  const redirectToHomepage = () => {
    router.push('/');
  };

  const redirectToHome = () => {
    router.push(`${CONSTANTS.API_BASE_URL}app`);
  };
  return (
    <div className="row spacing-mt p-0 ">
      <div className="col-md-5">
        <p className="mb-0 m-0 p-0 bold header-heading-mob">
          <Link
            href={`${CONSTANTS.API_BASE_URL}app/operation-card/${operationCardDetailData.name}`}
            style={{ textDecoration: 'none !important' }}
            className=""
          >
            {operationCardDetailData.name}
          </Link>
        </p>
      </div>
      <div className="col-md-7 text-end btn-actions-wrapper p-0 ">
        <div className="row w-100 ">
          <div
            className={`${
              operationCardDetailData?.balance_weight !== 0 && operationCardDetailData?.approve_operation_card === 1
                ? 'col-xxl-7 col-xl-7 col-lg-6 col-md-6'
                : 'col-xxl-7 col-xl-7 col-lg-5 col-md-4 '
            } btn-header-mob header-content-mob`}
          >
            <OperationCardInputField />
          </div>
          <div
            className={`${
              operationCardDetailData?.balance_weight !== 0 && operationCardDetailData?.approve_operation_card === 1
                ? 'col-xxl-5 col-xl-5 col-lg-6  col-md-6  '
                : 'col-xxl-5 col-xl-5 col-lg-7  col-md-8 '
            } text-end pe-0 btn-header-mob header-content-mob `}
          >
            {/* <div className="d-flex "> */}
            <button className="btn btn-grey px-4 px-1 btn-py " onClick={redirectToHomepage}>
              Back
            </button>
            <button className="btn btn-blue  px-4 ms-2 px-1 btn-py " onClick={handleOperationCardSave}>
              Save
            </button>
            {operationCardDetailData?.balance_weight !== 0 && operationCardDetailData?.approve_operation_card === 1 && (
              <button className="btn btn-blue px-4 ms-2 px-1 btn-py " onClick={handleOperationCardApproval}>
                Approve
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationCardHeader;
