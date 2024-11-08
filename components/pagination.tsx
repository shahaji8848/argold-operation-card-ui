import { useSearchParams, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import styles from '@/styles/pagination.module.css';

const PaginationComponent = ({ handlePageChange, meltingLotList }: any) => {
  const searchParams: any = useSearchParams();
  const pathname = usePathname();

  const totalCount: any = meltingLotList?.total_count;
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  useEffect(() => {
    if (!searchParams.get('page')) {
      const params = new URLSearchParams(searchParams);
      params.set('page', '1');
      window.history.replaceState({}, '', `${pathname}?${params}`);
    }
  }, [searchParams, pathname]);

  return (
    <>
      {totalCount > 0 && (
        <div className="mt-2">
          <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            breakLabel={'...'}
            pageCount={totalCount / 25}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            onPageChange={handlePageChange}
            forcePage={currentPage - 1}
            containerClassName={styles.pagination}
            pageClassName={styles.paginationItem}
            pageLinkClassName={styles.paginationLink}
            activeClassName={styles.active}
            breakClassName={styles.paginationItem}
            breakLinkClassName={styles.paginationLink}
            previousClassName={styles.paginationItem}
            nextClassName={styles.paginationItem}
            disabledClassName={styles.disabled}
          />
        </div>
      )}
    </>
  );
};

export default PaginationComponent;
