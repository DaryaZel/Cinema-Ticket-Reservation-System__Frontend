import React from 'react';
import { useState, useEffect } from 'react';
import { handleResponse } from './utilities/ResponseHandler';
import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage/LandingPage';
import { MoviePage } from './pages/MoviePage/MoviePage';
import './App.css';

export const UserContext = React.createContext();
export const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
export const defaultCityValue = 'Minsk';
export const defaultCinemaValue = 'All cinemas';
export const defaultDayValue = 'Whole calender';
export const tokenStorageKey = 'AUTH_TOKEN';


function App() {
  const [auth, setAuth] = useState(null);
  const value = {
    user: auth,
    setUserState: setAuth
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem(tokenStorageKey);
        if (token) {
          const response = await fetch('https://cinematicketbooking.herokuapp.com/auth/user', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          handleResponse(response,
            (error) => {
              alert(error);
            },
            (result) => {
              setAuth(result);
            }
          )
        }
      } catch (error) {
        alert(error);
      }
    }
    fetchData()
  }, []);

  return (
    <UserContext.Provider value={value}>
      <div className="App">
        <Routes>
          <Route path='/' element={<LandingPage />} exact />
          <Route path='/movie/:id' element={<MoviePage />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
