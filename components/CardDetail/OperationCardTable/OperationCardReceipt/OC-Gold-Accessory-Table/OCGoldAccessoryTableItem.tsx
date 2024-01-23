const OCGoldAccessoryTableItem = ({ goldAccessoryTable }: any) => {
  console.log('goldAccessoryTable component', goldAccessoryTable);
  return (
    <div>
      <div className="row">
        <div className="col-12 ">
          <span className="bold">Gold Accessory :</span>
        </div>
      </div>
      <div className="table-responsive ">
        <table className="table table-bordered">
          <thead>
            <tr className="table-text">
              {[
                'Item',
                'In Wt',
                'Gross Purity',
                'Gross Wt',
                'Fine Purity',
                'Fine Weight',
              ].map((val, i: any) => (
                <th className="thead-dark text-center" scope="col" key={i}>
                  {val}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {goldAccessoryTable?.length > 0 &&
              goldAccessoryTable?.map((data: any, i: any) => (
                <tr className="table-text" key={i}>
                  <td>{data.item}</td>
                  <td className="text-end">
                    {data?.in_weight === 0 ? '--' : data?.in_weight.toFixed(3)}
                  </td>
                  {/* <td className="text-end">
                    {data?.in_gross_purity === 0
                      ? '--'
                      : data?.in_gross_purity.toFixed(3)}
                  </td> */}
                  <td className="text-end">
                    {data?.in_gross_purity === 0
                      ? '--'
                      : Number(
                          (data?.in_gross_weight / data?.in_weight) * 100
                        ).toFixed(3)}
                  </td>
                  <td className="text-end">
                    {data?.in_gross_weight === 0
                      ? '--'
                      : data?.in_gross_weight.toFixed(3)}
                  </td>
                  {/* <td className="text-end">
                    {data?.in_fine_purity === 0
                      ? '--'
                      : data?.in_fine_purity.toFixed(3)}
                  </td> */}
                  <td className="text-end">
                    {data?.in_fine_purity === 0
                      ? '--'
                      : Number(
                          (data?.in_fine_weight / data?.in_gross_weight) * 100
                        ).toFixed(3)}
                  </td>
                  <td className="text-end">
                    {data?.in_fine_weight === 0
                      ? '--'
                      : data?.in_fine_weight.toFixed(3)}
                  </td>
                </tr>
              ))}
            {/* <tr className="table-text">
          <td className="font-weight-bold ">Total</td>
          {[
            'in_weight',
            'in_gross_purity',
            'in_gross_weight',
            'in_fine_purity',
            'in_fine_weight',
            'reference',
          ].map((data: any, i: any) => (
            <td className="font-weight-bold text-end" key={i}>
              {CalculateTotal(data)}
            </td>
          ))}
        </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OCGoldAccessoryTableItem;
