import React from 'react';

const OperationCardTable = ({ meltingLotList }: any) => {
  return (
    <div className="card py-2 px-2">
      <div className="d-flex justify-content-start">
        <span className="text-uppercase text-danger bold pe-2">ORD-910</span>
        <span>(purity: 92.00)</span>
        <span>(hook purity: 0.00)</span>
        <span>(balance order weight: 1000)</span>
      </div>
      <p className="text-uppercase text-success bold mt-1">box powder 0.255 (0)</p>

      <table className="table table-bordered">
        <thead className="card-listing-head">
          <tr>
            {[
              'chain',
              'type',
              'size',
              'design',
              'line',
              'chain making',
              'tone',
              'description',
              'weight',
              'pending wt',
              'split level',
              'current dept',
              'in weight',
              'out lot purity',
              'touch purity',
              'fire touch purity',
              'wastage',
              '',
            ].map((val: any, index: any) => (
              <th className="thead-dark text-center" scope="col" key={index}>
                {val}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="card-listing-body">
          {meltingLotList &&
            meltingLotList?.map((meltingData: any, idx: any) => {
              return (
                <tr>
                  <td>{meltingData?.category_one === '' ? '--' : meltingData?.category_one}</td>
                  <td>{meltingData?.type === '' ? '--' : meltingData?.type} </td>
                  <td>{meltingData?.machine_size === '' ? '--' : meltingData?.machine_size} </td>
                  <td>{meltingData?.design === '' ? '--' : meltingData?.design} </td>
                  <td>{meltingData?.line === '' ? '--' : meltingData?.line} </td>
                  <td>{meltingData?.cutting_process === '' ? '--' : meltingData?.cutting_process} </td>
                  <td>{meltingData?.tone === '' ? '--' : meltingData?.tone} </td>
                  <td>{meltingData?.description === '' ? '--' : meltingData?.description} </td>
                  <td className="text-end">{meltingData?.weight === 0 ? '--' : meltingData?.weight?.toFixed(3)} </td>
                  <td className="text-end">{meltingData?.balance_weight === '' ? '--' : meltingData?.balance_weight} </td>
                  <td>{meltingData?.split_level === '' ? '--' : meltingData?.split_level} </td>
                  <td>{meltingData?.current_dept === '' ? '--' : meltingData?.current_dept} </td>
                  <td>{meltingData?.in_weight === 0 ? '--' : meltingData?.in_weight}</td>
                  <td>{meltingData?.out_lot_purity === '' ? '--' : meltingData?.out_lot_purity} </td>
                  <td>{meltingData?.tounch_purity === '' ? '--' : meltingData?.tounch_purity} </td>
                  <td>{meltingData?.fire_tounch_purity === '' ? '--' : meltingData?.fire_tounch_purity} </td>
                  <td>{meltingData?.waistage === '' ? '--' : meltingData?.waistage} </td>
                  <td>
                    <button className="btn btn-blue btn-py  mt-1 px-3 ms-2">Edit</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default OperationCardTable;
