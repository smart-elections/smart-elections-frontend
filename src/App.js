import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// Styles
import './app.scss';
import './Styles/dark.scss';
import './Styles/colors.scss';
import 'react-toastify/dist/ReactToastify.css';

// State Context
import useAppStateContext from './hooks/useAppStateContext';

// Routes
import { PrivateRoute, PublicRoute } from './Routes/Routes';

// Pages
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
import ElectionCandidates from './Pages/electionCandidates/ElectionCandidates';
import ChangePassword from './Pages/changePassword/ChangePassword';
import NotFound from './Pages/notFound/NotFound';
import Sidebar from './components/sidebar/Sidebar';
import Navbar from './components/navbar/Navbar';

const App = () => {
  const { appState, dispatch } = useAppStateContext();

  const [componentMounted, setComponentMounted] = useState(false);

  if (JSON.parse(localStorage.getItem('SmartElectionsProfile')) === null) {
    window.localStorage.setItem(
      'SmartElectionsProfile',
      JSON.stringify({ isAuthenticated: false })
    );
  }

  useEffect(() => {
    const userProfile = JSON.parse(
      window.localStorage.getItem('SmartElectionsProfile')
    );

    if (userProfile !== null) {
      if (userProfile.isAuthenticated) {
        delete userProfile.isAuthenticated;
        dispatch({ type: 'Login', payload: userProfile });
      }
    }
  }, [dispatch]);

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
      <div className={appState?.isDarkMode ? 'app dark' : 'app'}>
        <ToastContainer />
        {appState?.isAuthenticated && <Sidebar />}
        <div className='appContainer'>
          {appState?.isAuthenticated && <Navbar />}
          <div className='routesWrapper'>
            <Routes>
              <Route path='/'>
                <Route element={<PrivateRoute />}>
                  <Route index element={<Analysis />} />
                </Route>

                <Route element={<PublicRoute />}>
                  <Route path='login' element={<Login />} />
                </Route>

                <Route element={<PublicRoute />}>
                  <Route path='register' element={<Signup />} />
                </Route>

                <Route path='elections'>
                  <Route element={<PrivateRoute />}>
                    <Route index element={<Elections />} />
                    <Route
                      path='voting/:electionYear/:electionRound/:electionType'
                      element={<ElectionVoting />}
                    />
                    <Route
                      path='analytics/:electionYear/:electionRound/:electionType'
                      element={<ElectionAnalytics />}
                    />
                    <Route
                      path='candidates/:electionYear/:electionRound/:electionType'
                      element={<ElectionCandidates />}
                    />
                  </Route>
                </Route>

                <Route path='candidates'>
                  <Route element={<PrivateRoute />}>
                    <Route index element={<Candidates />} />
                    <Route path=':candidateId' element={<SingleCandidate />} />
                  </Route>
                </Route>

                <Route element={<PrivateRoute />}>
                  <Route path='profile' element={<UserProfile />} />
                </Route>

                <Route element={<PrivateRoute />}>
                  <Route exact path='news' element={<News />} />
                </Route>

                <Route element={<PrivateRoute />}>
                  <Route
                    path='accounts/password/change'
                    element={<ChangePassword />}
                  />
                </Route>
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
