import React from 'react';
import './Register.scss';
import Input from '../../../components/input/Input';
import Button from '../../../components/button/Button';

export const Register = () => {
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
            id="email"
            name="email"
            type="text"
            value="tester@test.com"
            labelText="Email"
            placeholder="Enter Email"
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
        <Button label={'SIGNUP'} className="auth-button button" disavled={true} />
      </form>
    </div>
  );
};

export default Register;
