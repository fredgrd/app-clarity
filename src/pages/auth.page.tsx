import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './auth.page.css';
import AuthSignin from '../components/auth/auth-signin.component';

const IMAGES = {
  signin:
    'https://as1.ftcdn.net/v2/jpg/04/45/84/12/1000_F_445841242_nWV2CSjapdQtUVhlCnU6BPF3y0occCNg.jpg',
  signup:
    'https://as1.ftcdn.net/v2/jpg/04/45/84/12/1000_F_445841242_nWV2CSjapdQtUVhlCnU6BPF3y0occCNg.jpg',
};

const AuthPage: React.FC<{ mode: string }> = ({ mode }) => {
  const [email, setEmail] = useState<string>('');

  return (
    <div className="authpage">
      <section className="authpage__container">
        {mode === 'signin' ? (
          <AuthSignin />
        ) : (
          <div className="authpage__signup"></div>
        )}
      </section>
      <section className="authpage__image-container">
        <img
          className="authpage__image"
          src={mode === 'signin' ? IMAGES.signin : IMAGES.signup}
        />
      </section>
    </div>
  );
};

export default AuthPage;
