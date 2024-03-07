import { useRouter } from 'next/navigation';
const OperationCardHeader = ({
  operationCardDetailData,
  handleOperationCardSave,
}: any) => {
  const router = useRouter();
  const redirectToHomepage = () => {
    router.push('/');
  };
  return (
    <div className="row spacing-mt p-0 ">
      <div className="col-md-7">
        <p className="mb-0 m-0 p-0 ">
          Operation Card:{' '}
          <span className="bold header-heading-mob">
            {operationCardDetailData.name}
          </span>
        </p>
      </div>
      <div className="col-md-5 text-end btn-actions-wrapper">
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
          onClick={redirectToHomepage}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default OperationCardHeader;
