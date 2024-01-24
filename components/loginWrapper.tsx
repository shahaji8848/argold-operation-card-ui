'use client';

import { get_access_token } from '@/store/slice/login-slice';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const LoginWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const login_token = useSelector(get_access_token);

  if (login_token?.token === '') {
    router.push('/login');
  }
  return <div>{children}</div>;
};

export default LoginWrapper;
