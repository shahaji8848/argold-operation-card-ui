import Link from 'next/link';
import React from 'react';

const OperationCardListingTable = () => {
  return (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead className="card-listing-head">
          <tr>
            {[
              'parent melting lot',
              'Melting lot',
              'purity',
              'product',
              'process',
              'department',
              'karigar',
              'balance',
              'gross balance',
              'fine balance',
              'OC',
            ].map((val: any, index: any) => (
              <th className="thead-dark text-center" scope="col" key={index}>
                {val}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="card-listing-body">
          <tr>
            <td className="text-uppercase">p92rC4217</td>
            <td className="text-end">RC003</td>
            <td className="text-end">92.0</td>
            <td>rope chain</td>
            <td>Machine process</td>
            <td>Machine department</td>
            <td></td>
            <td className="text-end">666.55</td>
            <td className="text-end">284.634</td>
            <td className="text-end">284.631</td>
            <td>
              <Link href="">OP-Machine%20Deaprtment-0008</Link>
            </td>
          </tr>
          <tr>
            <td className="text-uppercase">p92RC4217</td>
            <td className="text-end">RC003</td>
            <td className="text-end">92.0</td>
            <td>rope chain</td>
            <td>Machine process</td>
            <td>Machine department</td>
            <td></td>
            <td className="text-end">666.55</td>
            <td className="text-end">284.634</td>
            <td className="text-end">284.631</td>
            <td>
              <Link href="">OP-Machine%20Deaprtment-0008</Link>
            </td>
          </tr>
          <tr>
            <td className="text-uppercase">p92RC4217</td>
            <td className="text-end">RC003</td>
            <td className="text-end">92.0</td>
            <td>rope chain</td>
            <td>Machine process</td>
            <td>Machine department</td>
            <td></td>
            <td className="text-end">666.55</td>
            <td className="text-end">284.634</td>
            <td className="text-end">284.631</td>
            <td>
              <Link href="">OP-Machine%20Deaprtment-0008</Link>
            </td>
          </tr>
          <tr>
            <td className="text-uppercase">p92RC4217</td>
            <td className="text-end">RC003</td>
            <td className="text-end">92.0</td>
            <td>rope chain</td>
            <td>Machine process</td>
            <td>Machine department</td>
            <td></td>
            <td className="text-end">666.55</td>
            <td className="text-end">284.634</td>
            <td className="text-end">284.631</td>
            <td>
              <Link href="">OP-Machine%20Deaprtment-0008</Link>
            </td>
          </tr>
          <tr>
            <td className="text-uppercase">p92RC4217</td>
            <td className="text-end">RC003</td>
            <td className="text-end">92.0</td>
            <td>rope chain</td>
            <td>Machine process</td>
            <td>Machine department</td>
            <td></td>
            <td className="text-end">666.55</td>
            <td className="text-end">284.634</td>
            <td className="text-end">284.631</td>
            <td>
              <Link href="">OP-Machine%20Deaprtment-0008</Link>
            </td>
          </tr>
          <tr>
            <td className="text-uppercase">p92RC4217</td>
            <td className="text-end">RC003</td>
            <td className="text-end">92.0</td>
            <td>rope chain</td>
            <td>Machine process</td>
            <td>Machine department</td>
            <td></td>
            <td className="text-end">666.55</td>
            <td className="text-end">284.634</td>
            <td className="text-end">284.631</td>
            <td>
              <Link href="">OP-Machine%20Deaprtment-0008</Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OperationCardListingTable;
