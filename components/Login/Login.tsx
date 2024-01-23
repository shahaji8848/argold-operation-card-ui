import React, { useState } from 'react';
import style from '../../styles/login.module.css';

const Login = () => {
  const [passwordHidden, setPasswordHidden] = useState(true);
  const handlePassword = (e: React.MouseEvent) => {
    e.preventDefault();
    setPasswordHidden(!passwordHidden);
  };
  const handelSubmit = () => {};

  return (
    <div
      className={`bg-white overflow-hidden ${style.login_wrapper} shadow-lg`}
    >
      <div className="row">
        <div className="col-md-12">
          <div className="bg-white-2 h-100 p-5">
            <div className="text-center mb-2 mt-2">
              <h5 className="bold">User Log In</h5>
            </div>

            <form>
              <div className="form-group mt-2">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group mt-4">
                <label htmlFor="password">Password</label>
                <div className={` ${style.password_position}`}>
                  <input
                    type={passwordHidden ? 'password' : 'text'}
                    placeholder="Enter password"
                    className={`form-control `}
                    required
                  />
                  <button
                    className={`${style.password_icon}`}
                    onClick={(e: React.MouseEvent) => handlePassword(e)}
                  >
                    {passwordHidden ? (
                      <i className="fas fa-eye-slash"></i>
                    ) : (
                      <i className="fas fa-eye"></i>
                    )}
                  </button>
                </div>
              </div>

              <div className="form-group mb-8 text-center mt-5">
                <button
                  type="submit"
                  // onClick={handelSubmit}
                  className="btn btn-primary w-50 text-uppercase"
                >
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
