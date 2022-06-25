import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/login/Login';
import Signup from './Pages/signup/Signup';
import Analysis from './Pages/analysis/Analysis';
import UserProfile from './Pages/userProfile/UserProfile';
import News from './Pages/news/News';
import Candidates from './Pages/candidates/Candidates';
import SingleCandidate from './Pages/singleCandidate/SingleCandidate';
import Elections from './Pages/elections/Elections';
import ElectionVoting from './Pages/electionVoting/ElectionVoting';
import ElectionAnalytics from './Pages/electionAnalytics/ElectionAnalytics';
import ChangePassword from './Pages/changePassword/ChangePassword';
import NotFound from './Pages/notFound/NotFound';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<Analysis />} />
          <Route path='login' element={<Login />} />

          <Route path='register' element={<Signup />} />

          {/* 
          OTP verification
          <Route path='verify-otp' element={<VerifyOTP />} />

          MetaMask wallet
          <Route path='metamask-wallet' element={<Wallet />} />
          
          */}

          <Route path='elections'>
            <Route index element={<Elections />} />
            <Route
              path='voting/:year/:electionId'
              element={<ElectionVoting />}
            />
            <Route
              path='analytics/:year/:electionId'
              element={<ElectionAnalytics />}
            />
          </Route>

          <Route path='candidates'>
            <Route index element={<Candidates />} />
            <Route path=':candidateId' element={<SingleCandidate />} />
          </Route>

          <Route path='profile' element={<UserProfile />} />
          <Route path='news' element={<News />} />

          <Route path='accounts/password/change' element={<ChangePassword />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
//
