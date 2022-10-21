import React from 'react';
import { observable, action } from 'mobx';

import { RouteComponentProps } from 'react-router-dom';

import LoginModel from './LoginModel';

interface IAuthLogin {
  loginModel: LoginModel;
}

class LoginViewModel implements IAuthLogin {
  @observable loginModel: LoginModel;

  constructor() {
    this.loginModel = new LoginModel();
  }

  @action logUserWithEmailAndPassword = (
    history: RouteComponentProps['history']
  ): void => {
    this.loginModel.loginUser(history);
  };

  @action setEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.loginModel.email = event.target.value;
  };
  @action setPassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.loginModel.password = event.target.value;
  };
}

export default LoginViewModel;
