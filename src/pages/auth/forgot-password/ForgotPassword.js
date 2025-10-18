import React from 'react';
import './ForgotPassword.scss';
import Input from '../../../components/input/Input';
import Button from '../../../components/button/Button';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import backgroundImage from '../../../assets/images/background.jpg';

export const ForgotPassword = () => {
  return (
    <div className="container-wrapper" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="environment">DEV</div>
      <div className="container-wrapper-auth">
        <div className="tabs forgot-password-tabs">
          <div className="tabs-auth">
            <ul className="tab-group">
              <li className="tab">
                <div className="login forgot-password">Forgot Password</div>
              </li>
            </ul>

            <div className="tab-item">
              <div className="auth-inner">
                {/* <div className="alerts" role="alert">
                    Error message
                </div> */}
                <form className="forgot-password-form">
                  <div className="form-input-container">
                    <Input
                      id="email"
                      name="email"
                      type="text"
                      value="tester@test.com"
                      labelText="Email"
                      placeholder="Enter Email"
                      handleChange={() => {}}
                    />
                  </div>
                  <Button label={'SIGNIN'} className="auth-button button" disavled={true} />

                  <Link to={'/'}>
                    <span className="login">
                      <FaArrowLeft className="arrow-left" /> back to Login
                    </span>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
