import React from 'react';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '../../../config/firebase';
import { useHistory } from 'react-router-dom';

const ProtectedRoute: React.FC<{}> = (props) => {
  const { children } = props;

  const history = useHistory();

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        history.push('/login');
      } else {
        user.getIdToken().then((token) => {
          localStorage.setItem('user', token);
        });
      }
    });
  }, [history]);

  return <div>{children}</div>;
};

export default ProtectedRoute;
