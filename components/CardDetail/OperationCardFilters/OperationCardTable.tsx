import React from 'react';

const OperationCardTable = ({ meltingLotList }: any) => {
  return (
    <div className="card py-2 px-2">
      {meltingLotList &&
        meltingLotList?.map((meltingData: any, idx: any) => {
          return (
            <div>
              <span className="text-uppercase text-danger bold pe-2">{meltingData?.id}</span>
              <span>(purity: {meltingData?.purity}) &nbsp;</span>
              <span>(hook purity: {meltingData?.hook_purity}) &nbsp;</span>
              <span>(balance order weight: ) &nbsp;</span>
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
                  <tr>
                    <td>
                      {meltingData?.product_category === '' || meltingData?.product_category === null
                        ? '--'
                        : meltingData?.product_category}
                    </td>
                    <td>{meltingData?.type === '' || meltingData?.type === null ? '--' : meltingData?.type} </td>
                    <td>
                      {meltingData?.machine_size === '' || meltingData?.machine_size === null ? '--' : meltingData?.machine_size}{' '}
                    </td>
                    <td>{meltingData?.design === '' || meltingData?.design === null ? '--' : meltingData?.design} </td>
                    <td>{meltingData?.line === '' || meltingData?.line === null ? '--' : meltingData?.line} </td>
                    <td>
                      {meltingData?.cutting_process === '' || meltingData?.cutting_process === null
                        ? '--'
                        : meltingData?.cutting_process}{' '}
                    </td>
                    <td>{meltingData?.tone === '' || meltingData?.tone === null ? '--' : meltingData?.tone} </td>
                    <td>
                      {meltingData?.description === '' || meltingData?.description === null ? '--' : meltingData?.description}{' '}
                    </td>
                    <td className="text-end">
                      {meltingData?.weight === 0 || meltingData?.weight === null ? '--' : meltingData?.weight?.toFixed(3)}{' '}
                    </td>
                    <td className="text-end">
                      {meltingData?.balance_weight === '' || meltingData?.balance_weight === null
                        ? '--'
                        : meltingData?.balance_weight}{' '}
                    </td>
                    <td>
                      {meltingData?.split_level === '' || meltingData?.split_level === null ? '--' : meltingData?.split_level}{' '}
                    </td>
                    <td>
                      {meltingData?.current_dept === '' || meltingData?.current_dept === null ? '--' : meltingData?.current_dept}{' '}
                    </td>
                    <td>{meltingData?.in_weight === 0 || meltingData?.in_weight === null ? '--' : meltingData?.in_weight}</td>
                    <td>
                      {meltingData?.out_lot_purity === '' || meltingData?.out_lot_purity === null
                        ? '--'
                        : meltingData?.out_lot_purity}{' '}
                    </td>
                    <td>
                      {meltingData?.tounch_purity === '' || meltingData?.tounch_purity === null
                        ? '--'
                        : meltingData?.tounch_purity}{' '}
                    </td>
                    <td>
                      {meltingData?.fire_tounch_purity === '' || meltingData?.fire_tounch_purity === null
                        ? '--'
                        : meltingData?.fire_tounch_purity}{' '}
                    </td>
                    <td>{meltingData?.waistage === '' || meltingData?.waistage === null ? '--' : meltingData?.waistage} </td>
                    <td>
                      <button className="btn btn-blue btn-py  mt-1 px-3 ms-2">Edit</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
    </div>
  );
};

export default OperationCardTable;
