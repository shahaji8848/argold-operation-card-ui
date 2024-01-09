'use client';
import OperationCardSearchMaster from '@/components/OperationCardSearch/OperationCardSearchMaster';

const Home = () => {
  return (
    <div>
      <div className="container-fulid">
        <div className="spacing-pd">
          <h4 className="spacing-mt search-heading">
            AR Gold Operation Card UI
          </h4>
          <OperationCardSearchMaster />
        </div>
      </div>
    </div>
  );
};

export default Home;
