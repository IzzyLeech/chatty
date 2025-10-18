import React from 'react';
import './ForgotPassword.scss';
import Input from '../../../components/input/Input';
import Button from '../../../components/button/Button';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const ForgotPassword = () => {
  return (
    <div className="auth-inner">
      {/* <div className="alerts" role="alert">
        Error message
      </div> */}
      <form className="auth-form">
        <div className="form-input-container">
          <Input
            id="username"
            name="username"
            type="text"
            value="my value"
            labelText="Username"
            placeholder="Enter Username"
            handleChange={() => {}}
          />
          <Input
            id="password"
            name="password"
            type="password"
            value="my value"
            labelText="Password"
            placeholder="Enter Password"
            handleChange={() => {}}
          />
        </div>
        <Button label={'SIGNIN'} className="auth-button button" disavled={true} />

        <Link to={'/'}>
          <span className="forgot-password">
            <FaArrowLeft className="arrow-left" /> back to Login
          </span>
        </Link>
      </form>
    </div>
  );
};

export default ForgotPassword;
