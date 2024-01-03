'use client';
import BalanceData from '@/components/CardDetail/OperationCardDataSummary/BalanceData';
import MeltingLotData from '@/components/CardDetail/OperationCardDataSummary/MeltingLotData';
import ProductData from '@/components/CardDetail/OperationCardDataSummary/ProductData';

const Page = () => {
  return (
    <div className="">
      <div className="container">
        <h4 className="">Operation Card Detail</h4>
        <div className="row ">
          <MeltingLotData />
          <ProductData />
          <BalanceData />
        </div>
      </div>
    </div>
  );
};

export default Page;
