// import useMeltingViewHook from '@/hooks/meltingViewHokks';
// import React from 'react';

// const ViewSalesOrder = ({ salesOrderData, formatDate, groupOrdersByDesign, bunchOrsalesOrder, title }: any) => {
//   const { funcToShowColName } = useMeltingViewHook();

//   const orderValue = salesOrderData[bunchOrsalesOrder] || [];
//   if (!salesOrderData || !orderValue || orderValue.length === 0) {
//     return <p>No Bunch Orders available</p>;
//   }

//   const arrayforColumnNames = [
//     { key: 'order date', value: true },
//     { key: 'delivery date', value: true },
//     { key: 'sales order', value: true },
//     { key: 'customer', value: true },
//     { key: 'description', value: funcToShowColName('description', bunchOrsalesOrder) },
//     { key: 'product category', value: true },
//     { key: 'machine size', value: funcToShowColName('machine_size', bunchOrsalesOrder) },
//     { key: 'design line', value: true },
//     { key: 'design', value: true },
//     { key: 'order weight', value: true },
//     { key: 'size', value: true },
//     { key: 'quantity', value: true },
//   ];
//   return (
//     <>
//       {orderValue.length > 0 && (
//         <>
//           <div className="mt-3">
//             <p className="p-0 m-0">{title}</p>
//           </div>
//           <div className="mt-1">
//             <table className="table table-bordered">
//               <thead className="card-listing-head">
//                 <tr>
//                   {arrayforColumnNames.map((val, index) => {
//                     return val?.value ? (
//                       <th className="thead-dark text-center" scope="col" key={index}>
//                         {val?.key}
//                       </th>
//                     ) : (
//                       <th className="thead-dark text-center d-none" scope="col" key={index}>
//                         {val?.key}
//                       </th>
//                     );
//                   })}
//                 </tr>
//               </thead>
//               <tbody>
//                 {orderValue &&
//                   orderValue?.map((ordersData: any, idx: any) => {
//                     const productCategory = ordersData?.item_group_data
//                       ? ordersData?.item_group_data[0]?.market_design_name_values?.[0]?.product_category
//                       : '--';
//                     const machineSize = ordersData?.item_group_data
//                       ? ordersData?.item_group_data[0]?.market_design_name_values?.[0]?.machine_size
//                       : '--';
//                     const designLine = ordersData?.item_group_data
//                       ? ordersData?.item_group_data[0]?.market_design_name_values?.[0]?.design_line
//                       : '--';
//                     const showDescription = arrayforColumnNames.find((col) => col.key === 'description')?.value;
//                     const showMachineSize = arrayforColumnNames.find((col) => col.key === 'machine size')?.value;
//                     return (
//                       <tr>
//                         <td className="text-center">
//                           {ordersData?.order_date !== ' ' && ordersData?.order_date !== null
//                             ? formatDate(ordersData?.order_date)
//                             : '--'}
//                         </td>
//                         <td className="text-center">
//                           {ordersData?.delivery_date !== ' ' && ordersData?.delivery_date !== null
//                             ? formatDate(ordersData?.delivery_date)
//                             : '--'}
//                         </td>
//                         <td className="text-center">
//                           {ordersData?.sales_order !== ' ' && ordersData?.sales_order !== null
//                             ? ordersData?.sales_order.split('-').pop()
//                             : '--'}
//                         </td>
//                         <td className="text-center">
//                           {ordersData?.customer !== '' && ordersData?.customer !== null ? ordersData?.customer : '--'}
//                         </td>
//                         {showDescription && (
//                           <td className="text-center">
//                             {ordersData?.description !== ' ' && ordersData?.description !== null ? ordersData?.description : '--'}
//                           </td>
//                         )}
//                         <td className="text-center">{productCategory || '--'}</td>
//                         {machineSize && (
//                           <td className="text-center">
//                             <td className="text-center">{machineSize || '--'}</td>
//                           </td>
//                         )}
//                         <td className="text-center">{designLine || '--'}</td>
//                         <td className="text-center">{ordersData?.design || '--'}</td>
//                         <td>
//                           {ordersData.item_group_data.map((itemGroupData: any) =>
//                             itemGroupData.market_design_name_values.map((e: any) => (
//                               <div className="text-center" key={e.soi_name}>
//                                 {e.order_weight?.toFixed(2) || '--'}
//                               </div>
//                             ))
//                           )}
//                         </td>

//                         <td>
//                           {ordersData.item_group_data.map((itemGroupData: any) =>
//                             itemGroupData.market_design_name_values.map((e: any) => (
//                               <div className="text-center" key={e.soi_name}>
//                                 {e.size?.toFixed(2) || '--'}
//                               </div>
//                             ))
//                           )}
//                         </td>

//                         <td>
//                           {ordersData.item_group_data.map((itemGroupData: any) =>
//                             itemGroupData.market_design_name_values.map((e: any) => (
//                               <div className="text-center" key={e.soi_name}>
//                                 {e.quantity?.toFixed(2) || '--'}
//                               </div>
//                             ))
//                           )}
//                         </td>
//                       </tr>
//                     );
//                   })}
//               </tbody>
//             </table>
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default ViewSalesOrder;
