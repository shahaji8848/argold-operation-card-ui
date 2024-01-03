import Link from 'next/link';
import React from 'react';

const OperationCardListingTable = () => {
  return (
    <div className="container-fuild mt-5">
      <div className="px-5">
        <table className="table table-bordered">
          <thead className="card-listing-head">
            <tr>
              <th>parent melting lot</th>
              <th>Melting lot</th>
              <th>purity</th>
              <th>product</th>
              <th>process</th>
              <th>department</th>
              <th>karigar</th>
              <th>balance</th>
              <th>gross balance</th>
              <th>fine balance</th>
              <th>OC</th>
            </tr>
          </thead>
          <tbody className="card-listing-body">
            <tr>
              <td className="text-uppercase">p92rC4217</td>
              <td>RC003</td>
              <td>92.0</td>
              <td>rope chain</td>
              <td>Machine process</td>
              <td>Machine department</td>
              <td></td>
              <td>666.55</td>
              <td>284.634</td>
              <td>284.631</td>
              <td>
                <Link href="">OP-Machine%20Deaprtment-0008</Link>
              </td>
            </tr>
            <tr>
              <td className="text-uppercase">p92RC4217</td>
              <td>RC003</td>
              <td>92.0</td>
              <td>rope chain</td>
              <td>Machine process</td>
              <td>Machine department</td>
              <td></td>
              <td>666.55</td>
              <td>284.634</td>
              <td>284.631</td>
              <td>
              <Link href="">OP-Machine%20Deaprtment-0008</Link>
              </td>
            </tr>
            <tr>
              <td className="text-uppercase">p92RC4217</td>
              <td>RC003</td>
              <td>92.0</td>
              <td>rope chain</td>
              <td>Machine process</td>
              <td>Machine department</td>
              <td></td>
              <td>666.55</td>
              <td>284.634</td>
              <td>284.631</td>
              <td>
               <Link href="">OP-Machine%20Deaprtment-0008</Link>
              </td>
            </tr>
            <tr>
              <td className="text-uppercase">p92RC4217</td>
              <td>RC003</td>
              <td>92.0</td>
              <td>rope chain</td>
              <td>Machine process</td>
              <td>Machine department</td>
              <td></td>
              <td>666.55</td>
              <td>284.634</td>
              <td>284.631</td>
              <td>
               <Link href="">OP-Machine%20Deaprtment-0008</Link>
              </td>
            </tr>
            <tr>
              <td className="text-uppercase">p92RC4217</td>
              <td>RC003</td>
              <td>92.0</td>
              <td>rope chain</td>
              <td>Machine process</td>
              <td>Machine department</td>
              <td></td>
              <td>666.55</td>
              <td>284.634</td>
              <td>284.631</td>
              <td>
               <Link href="">OP-Machine%20Deaprtment-0008</Link>
              </td>
            </tr>
            <tr>
              <td className="text-uppercase">p92RC4217</td>
              <td>RC003</td>
              <td>92.0</td>
              <td>rope chain</td>
              <td>Machine process</td>
              <td>Machine department</td>
              <td></td>
              <td>666.55</td>
              <td>284.634</td>
              <td>284.631</td>
              <td>
               <Link href="">OP-Machine%20Deaprtment-0008</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OperationCardListingTable;
