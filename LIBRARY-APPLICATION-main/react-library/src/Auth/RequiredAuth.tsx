import React, { useEffect, ReactNode } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { toRelativeUrl } from '@okta/okta-auth-js';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { ShelfPage } from '../layouts/ShelfPage/ShelfPage';
import { MessagesPage } from '../layouts/MessagesPage/MessaagesPage';
import { ManageLibraryPage } from '../layouts/ManageLibraryPage/ManageLibraryPage';
import { PaymentPage } from '../layouts/PaymentPage/PaymentPage';

interface RequiredAuthProps {
  children?: ReactNode; // Make children prop optional
}

export const RequiredAuth: React.FC<RequiredAuthProps> = ({ children }) => {
  const { oktaAuth, authState } = useOktaAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authState) {
      return;
    }

    if (!authState.isAuthenticated) {
      const originalUri = toRelativeUrl(window.location.href, window.location.origin);
      oktaAuth.setOriginalUri(originalUri);
      oktaAuth.signInWithRedirect();
    } else {
      const originalUri = oktaAuth.getOriginalUri();
      if (originalUri) {
        navigate(originalUri);
      }
    }
  }, [oktaAuth, authState, navigate]);

  if (!authState || !authState.isAuthenticated) {
    return <Navigate to='/login' />;
  }

  return (
    <Routes>
      <Route path="/shelf" element={<ShelfPage />} />
      <Route path="/messages" element={<MessagesPage />} />
      <Route path='/admin' element={<ManageLibraryPage />} />
      <Route path='/fees' element={<PaymentPage />} />
      {children}
    </Routes>
  );
};
