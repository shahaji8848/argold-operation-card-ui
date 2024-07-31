import Link from 'next/link';
import React from 'react';

const OperationCardFiltersOption = () => {
  return (
    <>
      <div className="row mt-3">
        <div className="col-12">
          <span className="bold pe-5 text-uppercase text-primary">KA Chain Orders</span>
          <button className="me-4 text-uppercase btn btn-blue btn-py">Add Ka Chain Order</button>
          <button className="me-4 text-uppercase btn btn-blue btn-py">Add Ka Chain Single Order</button>
          <button className="me-4 text-uppercase btn btn-blue btn-py">Add Ka Chain Dhoom Order</button>
        </div>
      </div>

      <div className="row">
        <div className="col-12 py-3">
          <div className="d-inline-block me-3">
            <div className="me-2 bold">Category One:</div>
            <select className="form-select d-inline w-auto">
              <option>All</option>
              <option>Anchor</option>
              <option>Basket Process</option>
              <option>Box</option>
              <option>CNC</option>
              <option>Curb, Spike, Double Curb</option>
              <option>Curb.Figgaro - Left Right</option>
              <option>Left Right</option>
              <option>Lock Link - Left</option>
              <option>Right</option>
              <option>Pipe</option>
              <option>Sisma</option>
            </select>
          </div>

          <div className="d-inline-block me-3">
            <div className="me-2 bold">Machine Size:</div>
            <select className="form-select d-inline w-auto">
              <option>All</option>
              <option>0.20</option>
              <option>0.21</option>
              <option>0.22</option>
              <option>0.25</option>
              <option>0.255</option>
              <option>0.26</option>
              <option>0.265</option>
              <option>0.30</option>
              <option>0.31</option>
              <option>0.335</option>
              <option>0.35</option>
              <option>0.355</option>
              <option>0.36</option>
              <option>0.38</option>
              <option>0.40</option>
              <option>0.45</option>
              <option>0.46</option>
              <option>0.50</option>
              <option>0.50 (Loose)</option>
              <option>0.52</option>
              <option>0.55</option>
              <option>0.57</option>
              <option>0.60</option>
              <option>0.60 (Loose)</option>
              <option>0.70</option>
              <option>0.75</option>
              <option>0.80</option>
              <option>0.85</option>
              <option>0.90</option>
              <option>0.95</option>
              <option>1.05</option>
              <option>1.10</option>
              <option>1.30</option>
              <option>1.40</option>
              <option>30</option>
              <option>40</option>
              <option>50</option>
            </select>
          </div>

          <div className="d-inline-block me-3">
            <div className="me-2 bold">Design Code:</div>
            <select className="form-select d-inline w-auto">
              <option>All</option>
              <option>Without Design Code</option>
              <option>With Design Code</option>
            </select>
          </div>

          <div className="d-inline-block me-3">
            <div className="me-2 bold">Chain Making:</div>
            <select className="form-select d-inline w-auto">
              <option>All</option>
              <option>Vishnu</option>
              <option>Hammering</option>
              <option>Laser</option>
              <option>Ashish</option>
              <option>Clipping</option>
            </select>
          </div>

          <div className="d-inline-block me-3">
            <div className="me-2 bold">Status:</div>
            <select className="form-select d-inline w-auto">
              <option>All</option>
              <option>Pending (Melting)</option>
              <option>Pending (Process)</option>
              <option>Completed</option>
            </select>
          </div>

          <div className="d-inline-block me-3">
            <div className="me-2 bold">Purity:</div>
            <select className="form-select d-inline w-auto">
              <option>All</option>
              <option>88+</option>
              <option>80 to 88</option>
              <option>70 to 80</option>
              <option>50 to 70</option>
              <option>40 to 50</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default OperationCardFiltersOption;
