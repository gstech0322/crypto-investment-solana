import { Alert, AlertTitle } from '@mui/material';

interface Props {
  isPhantomFound: boolean;
  walletAddress: string;
}

const DisplayAlert: React.FC<Props> = (props) => {
  const { isPhantomFound, walletAddress } = props;
  return (
    <>
      {isPhantomFound && !walletAddress && (
        <Alert severity="success">
          <AlertTitle>Look at you, you got Phantom! Very cool.</AlertTitle>
        </Alert>
      )}
      {!isPhantomFound && !walletAddress && (
        <Alert severity="error">
          <AlertTitle>
            Hmm...seems that you don't have Phantom!{' '}
            <a
              href="https://phantom.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Install here
            </a>
          </AlertTitle>
        </Alert>
      )}
    </>
  );
};
export default DisplayAlert;
