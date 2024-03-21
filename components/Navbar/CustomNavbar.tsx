'use client';
import { CONSTANTS } from '@/services/config/api-config';
import { clearToken, get_access_token } from '@/store/slice/login-slice';
import Image from 'next/image';
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
  console.log('loginUser', token);

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
                {/* <img
          src="https://erp.ar-gold.in/assets/erpnext/images/erpnext-logo.svg"
          style={{ width: '24px' }}
        /> */}
                <Image
                  src="/arc-logo.png"
                  alt="ERPNext Logo"
                  width={40}
                  height={42}
                />
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
                {/* Home */}
                {/* <i
            className="fa fa-home me-2 light-grey"
            aria-hidden="true"
            style={{ fontSize: '17px' }}
          >
            {' '}
          </i> */}
                <Image
                  // src="/arc-logo.png"
                  src="https://erp.ar-gold.in/assets/erpnext/images/erpnext-logo.svg"
                  alt="ERPNext Logo"
                  width={24}
                  height={24}
                />

                {/* <span className="light-grey ps-2 " style={{ fontSize: '14px' }}>
            Home
          </span> */}
              </button>

              {/* <Link href="" className="   " onClick={handleLogout}>
          Logout
        </Link> */}
            </div>
            <div className="d-flex align-items-center  ps-3 pe-3">
              <button className="btn-none  pt-1" onClick={handleLogout}>
                <i
                  className="fa fa-sign-out light-grey"
                  aria-hidden="true"
                  style={{ fontSize: '20px' }}
                ></i>{' '}
              </button>
              {/* <div className="dropdown ">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{
              background: 'none',
              border: 'none',
              marginTop: '6px',
              color: '#030f27',
            }}
          >
            <i
              className="fa fa-user-circle me-2 "
              aria-hidden="true"
              style={{ fontSize: '20px' }}
            ></i>
            {token?.username?.split('@')[0]}
          </button>
          <ul
            className="dropdown-menu px-2"
            aria-labelledby="dropdownMenuButton1"
          >
            <li className="py-1">
              <span>{token?.username}</span>
            </li>
            <li className="py-1">
              <Link href="" className="" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </ul>
        </div> */}
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
