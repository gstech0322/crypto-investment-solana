import React from 'react';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import LoginViewModel from './LoginViewModel';
import { observer } from 'mobx-react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

interface LoginFormViewProps {
  viewModel: LoginViewModel;
  history: any;
}

const LoginFormView = observer((props: LoginFormViewProps) => {
  const { viewModel, history } = props;
  return (
    <>
      {viewModel.loginModel.errorMessage !== '' && (
        <Alert severity="error">
          <AlertTitle>{viewModel.loginModel.errorMessage}</AlertTitle>
        </Alert>
      )}
      <h1>Login</h1>
      <Box
        sx={{
          width: 300,
          height: 300,
          borderRadius: '5%',
        }}
      >
        <div>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={viewModel.loginModel.email}
            onChange={viewModel.setEmail}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={viewModel.loginModel.password}
            onChange={viewModel.setPassword}
          />
          <p className="form_extra_font">
            <Link to="/register" className="link">
              Don't have an account?
            </Link>
          </p>
          <button
            disabled={viewModel.loginModel.isLoggingIn}
            type="submit"
            onClick={() => viewModel.logUserWithEmailAndPassword(history)}
          >
            Login
          </button>
        </div>
      </Box>
    </>
  );
});

export default LoginFormView;
