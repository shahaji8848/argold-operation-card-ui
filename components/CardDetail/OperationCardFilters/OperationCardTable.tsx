import React from 'react';

const OperationCardTable = () => {
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
          <tr>
            <td>box</td>
            <td>powder</td>
            <td>0.255</td>
            <td></td>
            <td>2</td>
            <td>Laser</td>
            <td>Single tone</td>
            <td></td>
            <td>1000.0000</td>
            <td>1000.0000</td>
            <td>tarpatta</td>
            <td>--</td>
            <td>--</td>
            <td>--</td>
            <td>--</td>
            <td>--</td>
            <td>--</td>
            <td>
              <button className="btn btn-blue btn-py  mt-1 px-3 ms-2">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OperationCardTable;
