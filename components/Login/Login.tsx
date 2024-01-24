import React, { useState } from 'react';
import style from '../../styles/login.module.css';
import { GETLoginAPI } from '@/services/api/auth/login-api';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { storeToken } from '@/store/slice/login-slice';

const Login = () => {
  const [initialValues, setInitialValues] = useState({
    usr: '',
    pwd: '',
  });
  const [passwordHidden, setPasswordHidden] = useState(true);

  const dispatch = useDispatch();
  const router = useRouter();

  const handlePassword = (e: React.MouseEvent) => {
    e.preventDefault();
    setPasswordHidden(!passwordHidden);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInitialValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('initialValues', initialValues);
    const userLoginAPI: any = await GETLoginAPI(initialValues);
    if (
      userLoginAPI?.status === 200 &&
      userLoginAPI?.data?.message?.msg === 'success'
    ) {
      // dispatch(storeToken(userLoginAPI?.data?.message?.data?.access_token));
      router.push('/');
    }
  };

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

            <form onSubmit={handelSubmit}>
              <div className="form-group mt-2">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  name="usr"
                  placeholder="Enter Email"
                  className="form-control"
                  value={initialValues.usr}
                  onChange={handleOnChange}
                  required
                  onKeyDown={(e: React.KeyboardEvent) =>
                    e.key === 'Enter' && e.preventDefault()
                  }
                />
              </div>

              <div className="form-group mt-4">
                <label htmlFor="password">Password</label>
                <div className={` ${style.password_position}`}>
                  <input
                    type={passwordHidden ? 'password' : 'text'}
                    name="pwd"
                    placeholder="Enter Password"
                    className={`form-control `}
                    value={initialValues.pwd}
                    onChange={handleOnChange}
                    required
                    onKeyDown={(e: React.KeyboardEvent) =>
                      e.key === 'Enter' && e.preventDefault()
                    }
                  />
                  <button
                    className={`${style.password_icon} `}
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
                  className="btn btn-primary w-50 text-uppercase btn-blue py-2 fs-14"
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