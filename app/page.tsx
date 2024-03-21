'use client';
import Navbar from '@/components/Navbar/CustomNavbar';
import OperationCardSearchMaster from '@/components/OperationCardSearch/OperationCardSearchMaster';

const Home = () => {
  return (
    <div>
      <div className="container">
        <div className="spacing-pd">
          <OperationCardSearchMaster />
        </div>
      </div>
    </div>
  );
};

export default Home;
