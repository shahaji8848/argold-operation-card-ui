'use client';
// import { useEffect } from 'react';
import OperationCardListingMaster from '@/components/CardListing/OperationCardListingMaster';
import io from 'socket.io-client';

const Page = () => {
  // useEffect(() => {
  //   const socket = io('http://localhost:5000/'); // Replace with your server URL
  //   // // Event listener for when the connection is established
  //   socket.on('connect', () => {
  //     console.log('Connected to WebSocket');
  //   });

  //   socket.on('serverData', (dataFromServer) => {
  //     console.log('Data received from server:', dataFromServer);
  //     // Handle the received data as needed in your React component
  //   });
  //   // // Event listener for receiving messages from the server
  //   // socket.on('message', (data) => {
  //   //   console.log('Received message:', data);
  //   // });
  // }, []);
  return (
    <>
      <OperationCardListingMaster />
    </>
  );
};

export default Page;
