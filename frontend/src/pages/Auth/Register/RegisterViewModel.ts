import React from 'react';
import { observable, action } from 'mobx';
import { RouteComponentProps } from 'react-router-dom';
import RegisterModel from './RegisterModel';

interface IAuthRegister {
  registerModel: RegisterModel;
}

class RegisterViewModel implements IAuthRegister {
  @observable registerModel: RegisterModel;

  constructor() {
    this.registerModel = new RegisterModel();
  }

  @action registerUserWithEmailAndPassword = (
    history: RouteComponentProps['history']
  ): void => {
    this.registerModel.registerUser(history);
  };

  @action setEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.registerModel.email = event.target.value;
  };
  @action setPassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.registerModel.password = event.target.value;
  };
}

export default RegisterViewModel;
