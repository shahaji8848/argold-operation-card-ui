import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
const OperationCardSearchField = () => {
  const router = useRouter();
  const [searchField, setSearchField] = useState<string>('');
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      redirectToListPage();
    }
  };
  const redirectToListPage = () => {
    if (searchField.includes('OP') || searchField.includes('op')) {
      router.push(`/operation-card-detail?name=${searchField}`);
    } else {
      router.push(`/operation-card-list?search=${searchField}`);
    }
  };
  return (
    <div className="row mt-5 pt-5">
      <div className="col-md-3">
        <p className="text-capitalize fs-14 light-grey">
          search melting lot / operation card no :
        </p>
      </div>
      <div className="col-md-6">
        <input
          type="text"
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
  );
};

export default OperationCardSearchField;
