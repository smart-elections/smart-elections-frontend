import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// TODO: CHECK WHETHER THE USER IS AUTHENTICATED OR NOT
// either use localStorage or use redux
// let isAuthenticated = false;

// if (localStorage.getItem('SmartElectionsProfile')) {
//   const userProfile = localStorage.getItem('SmartElectionsProfile');
//   if (JSON.parse(userProfile).isAuthenticated) {
//     isAuthenticated = true;
//   }
// }

export const PrivateRoute = ({ isAuthenticated }) => {
  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
};

export const PublicRoute = ({ isAuthenticated }) => {
  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />;
};
