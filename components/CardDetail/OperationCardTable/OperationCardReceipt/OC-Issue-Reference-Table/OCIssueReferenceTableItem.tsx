import { CONSTANTS } from '@/services/config/api-config';
import Link from 'next/link';

const OCIssueReferenceTable = ({ issueReferenceTable }: any) => {
  const doctypesName: any = {
    'Refining Process': 'refining-process',
    'Melting Lot': 'melting-lot',
    'Material Issue': 'material-issue',
  };
  return (
    <>
      <div>
        <div className="row">
          <div className="col-12 ">
            <span className="bold">Issue Reference :</span>
          </div>
        </div>
        <div className="table-responsive mt-1">
          <table className="table table-bordered">
            <thead>
              <tr className="table-text">
                {['Doctype', 'Docname', 'Item', 'Weight'].map((val, i: any) => (
                  <th className="thead-dark text-center" scope="col" key={i}>
                    {val}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {issueReferenceTable?.length > 0 &&
                issueReferenceTable?.map((data: any, i: any) => (
                  <>
                    <tr className="table-text" key={i}>
                      <td>{data.doctype}</td>
                      <td className="text-end">
                        <Link
                          href={`${CONSTANTS.API_BASE_URL}app/${doctypesName[data?.doctype]}/${data?.docname}`}
                          target="_blank"
                        >
                          {data?.docname}
                        </Link>
                      </td>
                      <td className="text-end">{data?.item}</td>
                      <td className="text-end">{data?.weight}</td>
                    </tr>
                  </>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default OCIssueReferenceTable;
