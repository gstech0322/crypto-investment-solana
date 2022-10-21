import React from 'react';
import LoginViewModel from './LoginViewModel';
import LoginFormView from './LoginFormView';
import { useHistory } from 'react-router-dom';
import Header from '../../../components/LandingPageNavBar/LandingPageHeader';

interface Props {}

const Login: React.FC<Props> = () => {
  const loginViewModel = new LoginViewModel();

  return (
    <>
      <Header />
      <div className="App">
        <header className="App-header">
          <LoginFormView viewModel={loginViewModel} history={useHistory()} />
        </header>
      </div>
    </>
  );
};

export default Login;
