import Link from 'next/link';
import React from 'react';

const OperationCardFilters = () => {
  return (
    <>
      <div className="row mt-3">
        <div className="col-12">
          <span className="bold pe-5 text-uppercase  text-primary">KA Chain Orders</span>
          <button className="me-4 text-uppercase btn btn-blue btn-py">Add Ka Chain Order</button>
          <button className="me-4 text-uppercase btn btn-blue btn-py"> Add Ka Chain Single Order</button>
          <button className="me-4 text-uppercase btn btn-blue btn-py">Add Ka Chain Dhoom Order</button>
        </div>
      </div>
      {/* <hr /> */}

      <div className=" my-3  ">
        <div className="row">
          <div className="col-12">
            <span className="text-capitalize bold">Category one:</span>
            <span className="text-capitalize text-decoration-underline bold px-3">All</span>
            <span className="text-capitalize px-3">
              <Link href="">Anchor</Link>
            </span>
            <span className="text-capitalize px-3">
              {' '}
              <Link href="">Basket Process</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">Box</Link>
            </span>
            <span className="text-uppercase px-3">
              <Link href="">CNC</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">Curb,Spike,Double Curb</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">Curb.Figgaro - Left Right</Link>
            </span>
            <span className="text-uppercase px-3">
              <Link href="">Left right</Link>
            </span>
            <span className="text-uppercase px-3">
              <Link href="">Lock link - left</Link>
            </span>
            <span className="text-uppercase px-3">
              <Link href="">right</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">pipe</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">sisma</Link>
            </span>
          </div>
        </div>
      </div>

      <div className=" my-3  ">
        <div className="row">
          <div className="col-12">
            <span className="text-capitalize bold ">Machine_Size:</span>

            <span className="text-capitalize text-decoration-underline bold px-3">All</span>
            <span className="text-capitalize px-3">
              <Link href="">0.20</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">0.21</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">0.22</Link>
            </span>
            <span className="text-uppercase px-3">
              <Link href="">0.25</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">0.255</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">0.26</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">0.265</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">0.30</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">0.31</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">0.335</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">0.35</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">0.335</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">0.35</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">0.355</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">0.36</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">0.38</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">0.40</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">0.45</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">0.46</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">0.50</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">0.50(Loose)</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">0.52</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">0.55</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">0.57</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">0.60</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">0.60(loose)</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">0.70</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">0.75</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">0.80</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">0.85</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">0.90</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">0.95</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">1.05</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">1.10</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">1.30</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">1.40</Link>
            </span>
            <span className="text-capitalize ">
              <Link href="">30</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">40</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">50</Link>
            </span>
          </div>
        </div>
      </div>

      <div className=" my-3 ">
        <div className="row ">
          <div className="col-12 ">
            <span className="text-capitalize bold">Design code:</span>
            <span className="text-capitalize text-decoration-underline bold px-3">All</span>
            <span className="text-capitalize px-3">
              <Link href="">without Design code</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">with Design code</Link>
            </span>
          </div>
        </div>
      </div>

      <div className=" my-3">
        <div className="row ">
          <div className="col-12">
            <span className="text-capitalize bold">Chain Making:</span>
            <span className="text-capitalize text-decoration-underline bold px-3">All</span>
            <span className="text-capitalize px-3">
              <Link href="">vishnu</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">hammering</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">laser</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">ashish</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">clipping</Link>
            </span>
          </div>
        </div>
      </div>

      <div className=" my-3  ">
        <div className="row">
          <div className="col-12">
            <span className="text-capitalize bold">status:</span>
            <span className="text-capitalize text-decoration-underline bold px-3">All</span>
            <span className="text-capitalize px-3">
              <Link href="">pending(Melting)</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">pending(Process)</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">completed</Link>
            </span>
          </div>
        </div>
      </div>

      <div className="my-3  ">
        <div className="row">
          <div className="col-12">
            <span className="text-capitalize bold">purity:</span>
            <span className="text-capitalize text-decoration-underline bold px-3">All</span>
            <span className="text-capitalize px-3">
              <Link href="">88+</Link>
            </span>
            <span className="text-capitalize px-3">
              {' '}
              <Link href="">80 t0 88</Link>
            </span>
            <span className="text-capitalize px-3">
              <Link href="">70 to 80</Link>
            </span>
            <span className="text-uppercase px-3">
              <Link href="">50 to 70</Link>
            </span>
            <span className="text-uppercase px-3">
              <Link href="">40 to 50</Link>
            </span>
          </div>
        </div>
      </div>

      {/* <hr /> */}
    </>
  );
};

export default OperationCardFilters;
