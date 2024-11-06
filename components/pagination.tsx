'use client'
import { useSearchParams, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import ReactPaginate from 'react-paginate';


const PaginationComponent = ({ itemsPerPage, handlePageChange }: any) => {
    const searchParams: any = useSearchParams();
    const pathname = usePathname();
  
    // Get the current page from the URL, defaulting to 1
    const currentPage = parseInt(searchParams.get('page') || '1', 10);
  
    useEffect(() => {
      // Ensure the page parameter stays in the URL on initial load or when manually updated
      if (!searchParams.get('page')) {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        window.history.replaceState({}, '', `${pathname}?${params}`);
      }
    }, [searchParams, pathname]);
  
    return (
      <>
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          pageCount={6} // Total number of pages
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          forcePage={currentPage - 1} // Sync the current page with URL
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </>
    );
  };
  
  export default PaginationComponent;
