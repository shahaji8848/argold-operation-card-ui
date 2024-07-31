import { CONSTANTS } from '@/services/config/api-config';
import Link from 'next/link';

const ProductData = ({ operationCardDetailData }: any) => {
  return (
    <div className="me-2">
      <div className={`row align-items-baseline border py-2 rounded-3 p-0 m-0 summary-height`}>
        <div className="col-md-4 p-0 m-0 mob-reverse-content">
          <div className="fs-14 bold mob-text-start">{operationCardDetailData?.product}</div>
          <div className="fs-14 mob-px">Product</div>
        </div>
        <div className="col-md-4 p-0 m-0 mob-reverse-content">
          <div className="fs-14 bold mob-text-start ">{operationCardDetailData?.product_process.split('-')[0]}</div>
          <div className="fs-14 mob-px">Process</div>
        </div>
        <div className="col-md-4 p-0 m-0 mob-reverse-content">
          <div className="fs-14 bold mob-text-start">
            <Link
              href={`${CONSTANTS.API_BASE_URL}app/product-process-department/${operationCardDetailData?.product_process_department}`}
              target="_blank"
              style={{ textDecoration: 'none' }}
            >
              {operationCardDetailData?.operation_department}
            </Link>
          </div>
          <div className="fs-14 mob-px">Department</div>
        </div>
        <div className="col-md-4 mt-1 mob-reverse-content p-0 m-0">
          <span className="fs-14 mob-px bold p-0 m-0 ">
            {operationCardDetailData?.next_product_process_department === 0 ||
            operationCardDetailData?.next_product_process_department === '' ||
            !operationCardDetailData?.next_product_process_department
              ? '--'
              : operationCardDetailData?.next_product_process_department?.split('-')[0]}
          </span>
          <div className="fs-14 mob-px">Next Department</div>
        </div>
      </div>
    </div>
    //   </div>
    // </div>
  );
};

export default ProductData;
