import { useRouter } from 'next/navigation';
import OperationCardInputField from './OperationCardInputField';
import Link from 'next/link';
import { CONSTANTS } from '@/services/config/api-config';
const OperationCardHeader = ({
  operationCardDetailData,
  handleOperationCardSave,
}: any) => {
  const router = useRouter();
  const redirectToHomepage = () => {
    router.push('/');
  };

  const redirectToHome = () => {
    router.push(`${CONSTANTS.API_BASE_URL}`);
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
      <div className="col-md-7 text-end btn-actions-wrapper  p-0">
        <div className="row w-100 ">
          <div className="col-xxl-8 col-xl-7 col-md-6 btn-header-mob header-content-mob">
            <OperationCardInputField />
          </div>
          <div className="col-xxl-4 col-xl-5  col-md-6 text-end  pe-0 btn-header-mob header-content-mob">
            <button
              className="btn btn-grey px-4 px-1 btn-py "
              onClick={redirectToHomepage}
            >
              Back
            </button>
            <button
              className="btn btn-blue  px-4 ms-2 px-1 btn-py "
              onClick={handleOperationCardSave}
            >
              Save
            </button>
            <button
              className="btn btn-blue  px-4 px-1 ms-2 btn-py "
              onClick={redirectToHome}
            >
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationCardHeader;
