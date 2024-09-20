'use client';
import { useEffect } from 'react';
import OperationCardListingMaster from '@/components/CardListing/OperationCardListingMaster';
import io from 'socket.io-client';

const Page = () => {
  // useEffect(() => {
  //   const socket = io('http://localhost:9000/', {
  //     withCredentials: true,
  //     extraHeaders: {
  //       Authorization: 'token bdc2fa70ccc6931:4927847bf304801',
  //     },
  //   }); // Replace with your server URL
  //   // const socket = io('https://erp.ar-gold.in/'); // Replace with your server URL
  //   // // Event listener for when the connection is established
  //   socket.on('connect', () => {
  //
  //   });

  //   socket.on('serverData', (dataFromServer) => {
<<<<<<< HEAD
=======
  //
>>>>>>> 907b2788dd7cc1384c5278d3fe714303e6b7fd09
  //     // Handle the received data as needed in your React component
  //   });
  //   // // Event listener for receiving messages from the server
  //   // socket.on('message', (data) => {
<<<<<<< HEAD
=======
  //   //
>>>>>>> 907b2788dd7cc1384c5278d3fe714303e6b7fd09
  //   // });
  // }, []);
  return (
    <>
      <OperationCardListingMaster />
    </>
  );
};

export default Page;
