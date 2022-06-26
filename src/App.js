import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './app.scss';
import './Styles/dark.scss';
import './Styles/colors.scss';
import { DarkModeContext } from './context/darkModeContext';
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
import Sidebar from './components/sidebar/Sidebar';
import Navbar from './components/navbar/Navbar';

const App = () => {
  const { darkMode, dispatch } = useContext(DarkModeContext);
  const [componentMounted, setComponentMounted] = useState(false);

  useEffect(() => {
    const localTheme = window.localStorage.getItem('smartVotingTheme');
    if (localTheme) {
      dispatch({ type: localTheme });
    } else {
      dispatch({ type: 'LIGHT' });
      window.localStorage.setItem('smartVotingTheme', 'LIGHT');
    }
    setComponentMounted(true);
  }, [dispatch]);

  if (!componentMounted) {
    return <div />;
  }

  return (
    <BrowserRouter>
      <div className={darkMode ? 'app dark' : 'app'}>
        <Sidebar />
        <div className='appContainer'>
          <Navbar />
          <div className='routesWrapper'>
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

                <Route
                  path='accounts/password/change'
                  element={<ChangePassword />}
                />
              </Route>

              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
//
