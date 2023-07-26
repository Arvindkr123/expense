import React from 'react';
import './App.css';
import Authentication from './components/Authentication/Authentication';
import { Fragment, Suspense } from 'react';
import WelcomeScreen from './components/Pages/WelcomeScreen';
import { Route, Routes } from 'react-router-dom';
import ForgotPassword from './components/Pages/forgotPassword/ForgotPassword';
import { useSelector } from 'react-redux';

function App() {

  const isAuth = useSelector(state => state.auth.isAthenticated);
  const theme = useSelector(state => state.theme.theme);
  const CompleteProfile = React.lazy(() => import('./components/Pages/CompleteProfile/CompleteProfile'))
  return (
    <Fragment>
      <Suspense fallback={<div style={{ "position": "fixed", "top": "50%" }} className='text-center'>Loading...</div>}>
        <div className={theme ? 'dark' : ''}>
          <Routes>
            <Route path='/' element={!isAuth ? <Authentication /> : <WelcomeScreen />} />
            <Route path='/completeprofile' element={!isAuth ? <Authentication /> : <CompleteProfile />} />
            <Route path='/forgotPassword' element={<ForgotPassword />} />
          </Routes>
        </div>
      </Suspense>
    </Fragment>
  );
}

export default App;


