import { observable, action, makeAutoObservable } from 'mobx';
import { RouteComponentProps } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../config/firebase';

class LoginModel {
  @observable email: string = '';
  @observable password: string = '';
  @observable isLoggingIn: boolean = false;
  @observable errorMessage: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  @action loginUser = (history: RouteComponentProps['history']): void => {
    if (this.errorMessage !== '') this.errorMessage = '';
    this.isLoggingIn = true;
    signInWithEmailAndPassword(auth, this.email, this.password)
      .then((user) => {
        history.push('/cryptocurrencies');
      })
      .catch((error) => {
        this.isLoggingIn = false;
        const errorCode = error.code;
        if (
          errorCode === 'auth/wrong-password' ||
          errorCode === 'auth/invalid-email' ||
          errorCode === 'auth/user-not-found'
        ) {
          this.errorMessage = 'Email / Password is invalid.';
        }
      });
  };
}

export default LoginModel;
