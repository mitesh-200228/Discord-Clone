import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Home from './pages/Home/Home'
import Navigation from './components/shared/Navigation/Navigation';
import Authenticate from './pages/authenticate/Authenticate';
import React from 'react';
import Activate from './pages/activate/Activate';
import Rooms from './pages/Rooms/Rooms';
import { useSelector } from 'react-redux';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation></Navigation>

        <Switch>
          <GuestRoute path="/" exact>
            <Home />
          </GuestRoute>
          <GuestRoute path="/authenticate">
            <Authenticate />
          </GuestRoute>
          <SemiProtectedRoute path="/activate">
            <Activate/>
          </SemiProtectedRoute>
          <ProtectedRoute path="/rooms">
            <Rooms/>
          </ProtectedRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

const GuestRoute = ({children,...rest}) => {
  const { isAuth}= useSelector((state) => state.auth);

  return(
    <Route {...rest}
      render={({location})=>{
        return isAuth ? 
        <Redirect to={
          {
            pathname: '/rooms',
            state: {from:location}
          }
        }/> : (
          children
        );
      }}>
    </Route>
  )
}

const SemiProtectedRoute = ({children, ...rest}) => {

  const { user,isAuth } = useSelector((state) => state.auth);

  return(
    <>
      <Route {...rest} 
      render={({location}) => {
        return (
          !isAuth ?
          (
          <Redirect to={{
            pathname: '/',
            state: { from: location }
          }}/> ) : (
            isAuth && !user.activated ? (
              children
            ) : (
              <Redirect 
                to={{
                  pathname: '/rooms',
                  state: { from:location}
                }}
              />
            )
          )
        )
      }}>
      </Route>
    </>
  )
}

const ProtectedRoute = ({children, ...rest}) => {

  const { isAuth, user }= useSelector((state) => state.auth);

  return(
    <>
      <Route {...rest} 
      render={({location}) => {
        return (
          !isAuth ?
          (
          <Redirect to={{
            pathname: '/',
            state: { from: location }
          }}/> ) : (
            isAuth && !user.activated ? (
              <Redirect
                to={{
                  pathname: '/activate',
                  state: { from:location}
                }}
              />
            ) : (
            children
            )
          )
        )
      }}>
      </Route>
    </>
  )
}

export default App;