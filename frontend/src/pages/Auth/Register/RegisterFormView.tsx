import React from 'react';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import RegisterViewModel from './RegisterViewModel';
import { observer } from 'mobx-react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

interface RegisterFormViewProps {
  viewModel: RegisterViewModel;
  history: any;
}

const RegisterFormView = observer((props: RegisterFormViewProps) => {
  const { viewModel, history } = props;
  return (
    <>
      {viewModel.registerModel.errorMessage !== '' && (
        <Alert severity="error">
          <AlertTitle>{viewModel.registerModel.errorMessage}</AlertTitle>
        </Alert>
      )}
      <h1>Register</h1>
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
            value={viewModel.registerModel.email}
            onChange={viewModel.setEmail}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={viewModel.registerModel.password}
            onChange={viewModel.setPassword}
          />
          <p className="form_extra_font">
            <Link to="/login" className="link">
              Already have an account?
            </Link>
          </p>
          <button
            disabled={viewModel.registerModel.isRegistering}
            type="submit"
            onClick={() => viewModel.registerUserWithEmailAndPassword(history)}
          >
            Register
          </button>
        </div>
      </Box>
    </>
  );
});

export default RegisterFormView;
