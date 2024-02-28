import { useRouter } from 'next/navigation';
import style from '@/styles/report-list.module.css';
import React from 'react';

const LossReport = ({ lossPeriodList, setSelectedLossPeriodValue }: any) => {
  const router = useRouter();
  const redirectToHomepage = () => {
    router.push('/');
  };
  console.log('lossPeriodList', lossPeriodList);
  return (
    <>
      <div
        className={` ${style.d_flex_report} blue text-uppercase fw-semibold fs-14 my-3  `}
      >
        <div>Loss Report</div>
        {lossPeriodList?.length > 0 && (
          <div className="ms-3">
            <select
              onChange={(e: any) => setSelectedLossPeriodValue(e.target.value)}
            >
              <option value=""></option>
              {lossPeriodList?.length > 0 &&
                lossPeriodList?.map((loss_period_data: any, index: number) => {
                  return (
                    <>
                      <option value={loss_period_data?.name}>
                        {loss_period_data?.name}
                      </option>
                    </>
                  );
                })}
            </select>
          </div>
        )}

        <div className="ms-auto">
          <button
            className="btn btn-grey px-4 px-1 btn-py"
            onClick={redirectToHomepage}
          >
            Back
          </button>
        </div>
      </div>
    </>
  );
};

export default LossReport;
