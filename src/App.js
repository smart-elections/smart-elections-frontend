import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// Styles
import './app.scss';
import './Styles/dark.scss';
import './Styles/colors.scss';
import 'react-toastify/dist/ReactToastify.css';
import { DarkModeContext } from './context/darkModeContext';

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
import ChangePassword from './Pages/changePassword/ChangePassword';
import NotFound from './Pages/notFound/NotFound';
import Sidebar from './components/sidebar/Sidebar';
import Navbar from './components/navbar/Navbar';

const App = () => {
  const { darkMode, dispatch } = useContext(DarkModeContext);
  const [componentMounted, setComponentMounted] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(localStorage.getItem('SmartElectionsProfile'))
      ?.isAuthenticated || false
  );

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('SmartElectionsProfile')) === null) {
      window.localStorage.setItem(
        'SmartElectionsProfile',
        JSON.stringify({ isAuthenticated: false })
      );
    }

    const userProfile = JSON.parse(
      window.localStorage.getItem('SmartElectionsProfile')
    );

    if (userProfile !== null) {
      if (userProfile.isAuthenticated) {
        setIsAuthenticated(true);
      }
    }
  }, [isAuthenticated]);

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
        <ToastContainer />
        {isAuthenticated && <Sidebar />}
        <div className='appContainer'>
          {isAuthenticated && <Navbar />}
          <div className='routesWrapper'>
            <Routes>
              <Route path='/'>
                <Route
                  element={<PrivateRoute isAuthenticated={isAuthenticated} />}
                >
                  <Route index element={<Analysis />} />
                </Route>

                <Route
                  element={<PublicRoute isAuthenticated={isAuthenticated} />}
                >
                  <Route path='login' element={<Login />} />
                </Route>

                <Route
                  element={<PublicRoute isAuthenticated={isAuthenticated} />}
                >
                  <Route path='register' element={<Signup />} />
                </Route>

                <Route path='elections'>
                  <Route
                    element={<PrivateRoute isAuthenticated={isAuthenticated} />}
                  >
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
                </Route>

                <Route path='candidates'>
                  <Route
                    element={<PrivateRoute isAuthenticated={isAuthenticated} />}
                  >
                    <Route index element={<Candidates />} />
                    <Route path=':candidateId' element={<SingleCandidate />} />
                  </Route>
                </Route>

                <Route
                  element={<PrivateRoute isAuthenticated={isAuthenticated} />}
                >
                  <Route path='profile' element={<UserProfile />} />
                </Route>

                <Route
                  element={<PrivateRoute isAuthenticated={isAuthenticated} />}
                >
                  <Route exact path='news' element={<News />} />
                </Route>

                <Route
                  element={<PrivateRoute isAuthenticated={isAuthenticated} />}
                >
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
