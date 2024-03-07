// import React from 'react';
// import styles from '../../styles/operationDetail.module.css';
// import Modal from 'react-bootstrap/Modal';

// const OperationCardModal = ({ show }) => {
//   return (
//     <>
//       <Modal show={show} onHide={handleClose} size="lg">
//         <Modal.Header closeButton>
//           {' '}
//           <h6 className="">Item: {itemName}</h6>
//         </Modal.Header>
//         <Modal.Body>
//           {' '}
//           <div className="d-flex justify-content-between "></div>
//           <div className="modal-body">
//             <div className="row">
//               {getValues?.length > 0 &&
//                 getValues?.map((val: any, i: any) => (
//                   <div className="col-md-6">
//                     <div className="form-group row d-flex mt-2">
//                       <label
//                         htmlFor="staticEmail"
//                         className={`${styles.labelFlex} col-sm-2 col-form-label dark-blue`}
//                       >
//                         Weight:
//                       </label>
//                       <div
//                         className={`col-sm-10 text-left ${styles.inputFlex}`}
//                       >
//                         <input
//                           type="text"
//                           className="form-control inputFields dark-blue"
//                           id={val}
//                           placeholder={
//                             val.charAt(0).toUpperCase() +
//                             val
//                               .slice(1)
//                               .split('_')
//                               .filter(
//                                 (val: any) =>
//                                   val !== 'set' && val !== 'readonly'
//                               )
//                               .join(' ')
//                           }
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           </div>
//           {getValues?.length > 0 ? (
//             <div className="d-flex justify-content-start">
//               <button
//                 type="button"
//                 className={`btn btn-blueColor ${styles.submit_btn}`}
//                 onClick={handleClose}
//               >
//                 Submit
//               </button>
//             </div>
//           ) : (
//             ''
//           )}
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// };

// export default OperationCardModal;
