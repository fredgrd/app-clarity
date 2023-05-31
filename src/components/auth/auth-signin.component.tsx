import React, { useEffect, useState } from 'react';
import './auth-signin.component.css';
import MainIpunt from '../input/main-input.component';
import { isValidEmail } from '../../helpers/email.helper';
import { isValidPassword } from '../../helpers/password.helper';
import MainButton from '../button/main-button.component';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setToast } from '../../app/slices/notification.slice';
import {
  signinWithCredentials,
  singinWithToken,
} from '../../app/slices/user.slice';
import { useParams } from 'react-router-dom';

const AuthSignin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { token } = useParams();
  const loadingState = useAppSelector((state) => state.user.loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const signinToken = async (token: string) => {
      try {
        const user = await dispatch(singinWithToken(token)).unwrap();

        if (user) {
          // Navigate to dashboard
          console.log('NAVIGATE TO DASHBOARD');
        }
      } catch (error) {
        const errorText = error as string;
        dispatch(setToast(errorText));
      }
    };

    if (token) {
      console.log(loadingState);
      console.log('token', token);
      signinToken(token);
    }
  }, [token]);

  const onClick = async () => {
    if (loadingState === 'pending') return;

    if (
      !email.length ||
      !password.length ||
      !isValidEmail(email) ||
      !isValidPassword(password)
    ) {
      dispatch(setToast('Fill in all the fields to proceed.'));
      return;
    }

    try {
      const user = await dispatch(
        signinWithCredentials({ email, password })
      ).unwrap();

      if (user) {
        // Navigate to dashboard
        console.log('NAVIGATE TO DASHBOARD');
      }
    } catch (error) {
      const errorText = error as string;
      dispatch(setToast(errorText));
    }
  };

  return (
    <div className="authsignin">
      <div>
        <MainIpunt
          value={email}
          onChange={setEmail}
          options={{
            label: 'Email',
            shouldFocus: true,
            validationHandler: (email) => isValidEmail(email),
            errorMessage: 'Please insert a valid email address',
          }}
        />
      </div>
      <div style={{ marginTop: '20px' }}>
        <MainIpunt
          value={password}
          onChange={setPassword}
          options={{
            label: 'Password',
            type: 'password',
            validationHandler: (pass) => isValidPassword(pass),
            errorMessage: 'Please fill this field',
          }}
        />
      </div>
      <div className="authsignin__forgot-password-container">
        <button className="authsignin__forgot-password-button">
          Forgot password?
        </button>
      </div>
      <div className="authsignin__signin-button">
        <MainButton
          onClick={onClick}
          enabled={loadingState === 'idle'}
          options={{ title: 'Sign in' }}
        />
      </div>
    </div>
  );
};

export default AuthSignin;
