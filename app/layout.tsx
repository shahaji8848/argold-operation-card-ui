import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapClient from '@/components/BootstrapClient';
import ReduxProvider from '@/store/ReduxProvider';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navbar } from 'react-bootstrap';
import { useParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import CustomNavbar from '@/components/Navbar/CustomNavbar';
import Error from './error';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';

const nunito = Nunito({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: 'ARG',
  description: 'Operation Card',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          integrity="sha512-Avb2QiuDEEvB4bZJYdft2mNjVShBftLdPG8FJ0V7irTLQ8Uo0qcPxh4Plq7G5tGm0rU+1SPhVotteLpBERwTkw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={nunito.className}>
        {/* <ErrorBoundary fallback={<Error />}> */}
        <ToastContainer
          position="top-right"
          autoClose={8000}
          hideProgressBar={false}
          newestOnTop={false}
          draggable={false}
          closeOnClick
          pauseOnHover
        />
        <ReduxProvider>
          <CustomNavbar />
          {children}
          <BootstrapClient />
        </ReduxProvider>
        {/* </ErrorBoundary> */}
      </body>
    </html>
  );
}
