import React, { useEffect, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axiosInstance from '../utils/axiosInstance';
import { useSelector, useDispatch } from 'react-redux';
import { authUser } from '../actions/authActions';
import { showCreateReviewModal } from '../actions/modalActions';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './LoginForm.css'; 
const CLIENT_ID = "caff724c0888235e5fe8";


const LoginForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [code, setCode] = useState(true);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParams = urlParams.get("code");
    setCode(codeParams);
  }, []);

  useEffect(() => {
    if (code && code.length === 20) {
      sendCode().then(() => {
        window.history.replaceState(null, null, '/');
      });
    }
  }, [code]);
  

  const sendCode = async () => {
    try {
      const res = await axiosInstance.post('/api/auth/github', { code });
      const { user } = res.data;
      dispatch(authUser(user));
    } catch (error) {
      console.log('Authentication error:', error);
    }
  };

  const handleOpenCreateReview = () => {
    dispatch(showCreateReviewModal());
  };

  const loginWithGitHub = () => {
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID + "&scope=user:email");
  };

  const responseGoogle = async (response) => {
    if (response.error) {
      console.log('Google Sign-In error:', response.error);
      return;
    }

    const tokenId = response.credential;

    try {
      const res = await axiosInstance.post('/api/auth/google', { tokenId });
      const { user } = res.data;

      dispatch(authUser(user));
    } catch (error) {
      console.log('Authentication error:', error);
    }
  };

  return (
    <form className="p-3">
      <>
        {user ? (
          <div>
            <Button className="create-review-btn" variant="info" onClick={handleOpenCreateReview}>{t('createReview')}</Button>
          </div>
          
        ) : (
          <>
            <h2>{t('review')}</h2>
            <div className="mb-3">
              <Button variant="info" onClick={loginWithGitHub}>
                {t('loginGitHub')}
              </Button>
            </div>
            <GoogleLogin
              onSuccess={responseGoogle}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </>
        )}
      </>
    </form>
  );

};

export default LoginForm;
