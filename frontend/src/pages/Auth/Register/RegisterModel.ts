import { observable, action, makeAutoObservable } from 'mobx';
import { RouteComponentProps } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../config/firebase';

class RegisterModel {
  @observable email: string = '';
  @observable password: string = '';
  @observable isRegistering: boolean = false;
  @observable errorMessage: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  @action registerUser = (history: RouteComponentProps['history']): void => {
    if (this.errorMessage !== '') this.errorMessage = '';
    this.isRegistering = true;
    createUserWithEmailAndPassword(auth, this.email, this.password)
      .then((user) => {
        history.push('/login');
      })
      .catch((error) => {
        this.isRegistering = false;
        const errorCode = error.code;
        if (errorCode === 'auth/weak-password') {
          this.errorMessage = 'Password should be at least 6 characters.';
        } else if (errorCode === 'auth/email-already-in-use') {
          this.errorMessage = 'The email is already in use.';
        } else if (errorCode === 'auth/invalid-email') {
          this.errorMessage = 'The email is invalid.';
        }
      });
  };
}

export default RegisterModel;
