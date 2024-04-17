'use client';
import { CONSTANTS } from '@/services/config/api-config';
import { clearToken, get_access_token } from '@/store/slice/login-slice';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CustomNavbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);

  const router = useRouter();
  const dispatch = useDispatch();
  const params = useParams();
  const pathName = usePathname();

  const token: any = useSelector(get_access_token);

  const redirectToHome = () => {
    router.push(`${CONSTANTS.API_BASE_URL}app`);
  };

  useEffect(() => {
    if (pathName === '/login') {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [params]);

  const handleLogout = () => {
    setShowNavbar(false);
    router.push(`/login`);
    dispatch(clearToken());
  };

  return (
    <>
      {showNavbar ? (
        <div className="container-fluid  head-dark p-0">
          <div className="d-flex align-items-center justify-content-end  navbar-height spacing-pd">
            <div className="container-fluid ">
              <div className="">
                <Link href="/">
                  <Image src="/arc-logo.png" alt="ERPNext Logo" width={40} height={42} />
                </Link>
              </div>
            </div>

            <div className="d-flex align-items-center  pe-2">
              <button
                className=" btn-none"
                onClick={redirectToHome}
                style={{
                  background: 'none',
                  border: 'none',

                  color: '#030f27',
                }}
              >
                <Image
                  src="/erpnext-logo.png"
                  // src="https://erp.ar-gold.in/assets/erpnext/images/erpnext-logo.svg"
                  alt="ERPNext Logo"
                  width={24}
                  height={24}
                />
              </button>
            </div>
            <div className="d-flex align-items-center  ps-3 pe-3">
              <button className="btn-none  pt-1" onClick={handleLogout}>
                <i className="fa fa-sign-out light-grey" aria-hidden="true" style={{ fontSize: '20px' }}></i>{' '}
              </button>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default CustomNavbar;
