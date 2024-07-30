import Link from 'next/link';
import React from 'react';

const OperationCardFilters = () => {
  return (
    <>
      <div className="row mt-3">
        <div className="col-12">
          <span className="bold pe-5 text-uppercase">KA Chain Orders</span>
          <button className="me-4 text-uppercase">Add Ka Chain Order</button>
          <button className="me-4 text-uppercase"> Add Ka Chain Single Order</button>
          <button className="me-4 text-uppercase">Add Ka Chain Dhoom Order</button>
        </div>
      </div>
      <hr />
      <div className="d-flex justify-content-between">
        <span className="text-capitalize">Category one:</span>
        <span className="text-capitalize text-decoration-underline bold">All</span>
        <span className="text-capitalize">
          <Link href="">Anchor</Link>
        </span>
        <span className="text-capitalize">
          {' '}
          <Link href="">Basket Process</Link>
        </span>
        <span className="text-capitalize">
          <Link href="">Box</Link>
        </span>
        <span className="text-uppercase">
          <Link href="">CNC</Link>
        </span>
        <span className="text-capitalize">
          <Link href="">Curb,Spike,Double Curb</Link>
        </span>
        <span className="text-capitalize">
          <Link href="">Curb.Figgaro - Left Right</Link>
        </span>
        <span className="text-uppercase">
          <Link href="">Left right</Link>
        </span>
        <span className="text-uppercase">
          <Link href="">Lock link - left</Link>
        </span>
        <span className="text-uppercase">
          <Link href="">right</Link>
        </span>
        <span className="text-capitalize">
          <Link href="">pipe</Link>
        </span>
        <span className="text-capitalize">
          <Link href="">sisma</Link>
        </span>
      </div>

      <div className="d-flex justify-content-between">
        <span className="text-capitalize">Machine size:</span>
        <span className="text-capitalize text-decoration-underline bold">All</span>
        <span className="text-capitalize">
          <Link href="">0.20</Link>
        </span>
        <span className="text-capitalize">
          <Link href="">0.21</Link>
        </span>
        <span className="text-capitalize">
          <Link href="">0.22</Link>
        </span>
        <span className="text-uppercase">
          <Link href="">0.25</Link>
        </span>
        <span className="text-capitalize">
          <Link href="">0.255</Link>
        </span>
        <span className="text-capitalize">
          <Link href="">0.26</Link>
        </span>
        <span className="text-capitalize">
          <Link href="">0.265</Link>
        </span>
        <span className="text-capitalize">
          <Link href="">0.30</Link>
        </span>
        <span className="text-capitalize">
          <Link href="">0.31</Link>
        </span>
        <span className="text-capitalize">
          <Link href="">0.335</Link>
        </span>
        <span className="text-capitalize">
          <Link href="">0.35</Link>
        </span>
        <span className="text-capitalize">
          <Link href="">0.335</Link>
        </span>
        <span className="text-capitalize">
          <Link href="">0.35</Link>
        </span>
        <span className="text-capitalize">
          <Link href="">0.355</Link>
        </span>
      </div>

      <div className="d-flex justify-content-between">
        <span className="text-capitalize">Design code:</span>
        <span className="text-capitalize text-decoration-underline bold">All</span>
        <span className="text-capitalize">
          <Link href="">without Design code</Link>
        </span>
        <span className="text-capitalize">
          <Link href="">with Design code</Link>
        </span>
      </div>

      <div className="d-flex justify-content-between">
        <span className="text-capitalize">Chain Making:</span>
        <span className="text-capitalize text-decoration-underline bold">All</span>
        <span className="text-capitalize">
          <Link href="">vishnu</Link>
        </span>
        <span className="text-capitalize">
          <Link href="">hammering</Link>
        </span>
        <span className="text-capitalize">
          <Link href="">laser</Link>
        </span>
        <span className="text-capitalize">
          <Link href="">ashish</Link>
        </span>
        <span className="text-capitalize">
          <Link href="">clipping</Link>
        </span>
      </div>

      <div className="d-flex justify-content-between">
        <span className="text-capitalize">status:</span>
        <span className="text-capitalize text-decoration-underline bold">All</span>
        <span className="text-capitalize">
          <Link href="">pending(Melting)</Link>
        </span>
        <span className="text-capitalize">
          <Link href="">pending(Process)</Link>
        </span>
        <span className="text-capitalize">
          <Link href="">completed</Link>
        </span>
      </div>

      <div className="d-flex justify-content-between ">
        <span className="text-capitalize">purity:</span>
        <span className="text-capitalize text-decoration-underline bold">All</span>
        <span className="text-capitalize">
          <Link href="">88+</Link>
        </span>
        <span className="text-capitalize">
          {' '}
          <Link href="">80 t0 88</Link>
        </span>
        <span className="text-capitalize">
          <Link href="">70 to 80</Link>
        </span>
        <span className="text-uppercase">
          <Link href="">50 to 70</Link>
        </span>
        <span className="text-uppercase">
          <Link href="">40 to 50</Link>
        </span>
      </div>
    </>
  );
};

export default OperationCardFilters;
