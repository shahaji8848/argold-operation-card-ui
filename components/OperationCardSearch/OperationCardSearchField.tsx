import { CONSTANTS } from '@/services/config/api-config';
import { clearToken } from '@/store/slice/login-slice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
const OperationCardSearchField = () => {
  const focusRef = useRef<any>(null);
  const router = useRouter();

  const [searchField, setSearchField] = useState<string>('');
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      redirectToListPage();
    }
  };
  const redirectToListPage = () => {
    if (searchField === '') {
      router.push('');
    } else if (searchField.includes('OP') || searchField.includes('op')) {
      router.push(`/operation-card-detail?name=${searchField}`);
    } else {
      router.push(`/operation-card-list?search=${searchField}`);
    }
  };

  useEffect(() => {
    focusRef.current.focus();
  }, []);

  return (
    <>
      <div className="row mt-5 ">
        <div className="col-md-3">
          <p className="text-capitalize fs-14 light-grey">
            search melting lot / operation card no :
          </p>
        </div>
        <div className="col-md-6">
          <input
            type="text"
            ref={focusRef}
            style={{ boxShadow: 'none !important' }}
            className="form-control border-grey w-100 "
            value={searchField}
            onChange={(e: any) => setSearchField(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="col-md-3 mob-mt">
          <button
            className="btn btn-primary btn-blue px-4 py-2 fs-14"
            onClick={redirectToListPage}
          >
            Search
          </button>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-3"></div>
        <div className="col-md-9 text-capitalize">
          <Link href={`report/loss-report-list?loss_period=&factory=`}>
            view loss report
          </Link>
        </div>
      </div>
    </>
  );
};

export default OperationCardSearchField;
