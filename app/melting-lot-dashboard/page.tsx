// import OperationCardFiltersMaster from '@/components/CardDetail/OperationCardFilters/OperationCardFiltersMaster';
'use client';
import MeltingLotDashboardMaster from '@/components/MeltingLotDashboard/OperationCardFiltersMaster';
import useMeltingLot from '@/hooks/meltingLothook';
import React from 'react';

const page = () => {
  return (
    <>
      <MeltingLotDashboardMaster />
    </>
  );
};

export default page;
