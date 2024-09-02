import React from 'react';

const MPReferenceModal = ({ MPReferenceList }: any) => {
  return (
    <div className="row mt-2">
      <div className="col-md-12">
        <div className="table-responsive mt-2">
          <table className="table table-bordered">
            <thead>
              <tr className="table-text">
                <th className="thead-dark text-center" scope="col"></th>
                <th className="thead-dark text-center" scope="col">
                  MP Reference ID
                </th>
                <th className="thead-dark text-center" scope="col">
                  Customer Name
                </th>
                <th className="thead-dark text-center" scope="col">
                  Quantity
                </th>
                <th className="thead-dark text-center" scope="col">
                  Weight
                </th>
              </tr>
            </thead>
            <tbody>
              {MPReferenceList?.length > 0 &&
                MPReferenceList.map((MPReferenceData: any, index: any) => {
                  return (
                    <tr className="table-text" key={index}>
                      <td className="text-center">{MPReferenceData.name}</td>
                      <td className="text-center">{MPReferenceData.customer_name}</td>
                      <td className="text-center">{MPReferenceData.quatity}</td>
                      <td className="text-center">{MPReferenceData.weight}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MPReferenceModal;
