import React from 'react';

import './App.css';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { HomePage } from './layouts/HomePage/HomePage';
import { SearchBooksPage } from './layouts/SearchBooksPage/SearchBooksPage';
import { Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import { BookCheckoutPage } from './layouts/BookCheckoutPage/BookCheckoutPage';
import { oktaConfig } from './lib/oktaConfig';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { LoginCallback, SecureRoute, Security } from '@okta/okta-react';
import LoginWidget from './Auth/LoginWidget';
import { ReviewListPage } from './layouts/BookCheckoutPage/ReviewListPage/ReviewListPage';
import { RequiredAuth } from './Auth/RequiredAuth';
import { ShelfPage } from './layouts/ShelfPage/ShelfPage';
import { MessagesPage } from './layouts/MessagesPage/MessaagesPage';
import { ManageLibraryPage } from './layouts/ManageLibraryPage/ManageLibraryPage';
import { PaymentPage } from './layouts/PaymentPage/PaymentPage';



const oktaAuth = new OktaAuth(oktaConfig);

export const App = () => {
  const history = useNavigate();
  const customAuthHandler = () => {
    history('/login')
  }

  
  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history(toRelativeUrl(originalUri || '/', window.location.origin),{replace:true});
  };

  return (
    <div className = 'd-flex flex-column min-vh-100'>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
      <Navbar />
      <div className='flex-grow-1'>

      <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/search' element={<SearchBooksPage />} />
        <Route path='/reviewlist/:bookId' element={<ReviewListPage />} />
        <Route path='/checkout/:bookId' element={<BookCheckoutPage />} />
        <Route path='/login' element = {<LoginWidget config={oktaConfig}/>}/>
        <Route path='/login/callback' element = {<LoginCallback/>} />
        
        
        <Route element={<RequiredAuth  />}>
        {/* Nested Route for ShelfPage */}
        <Route path="/shelf" element={<ShelfPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path='/admin' element={<ManageLibraryPage />} />
        <Route path='/fees' element={<PaymentPage />} />
       
        {/* Add more protected routes here */}
      </Route>

      </Routes>

      </div>
      <Footer />
      </Security>
    </div>
  );
};