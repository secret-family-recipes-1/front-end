import React from 'react';
import { Route, Switch } from "react-router-dom";
import './App.scss';
// importing components
import SignupForm from './components/SignupForm'
import LoginForm from './components/LoginForm'
import UserDashboard from "./components/UserDashboard"
import PrivateRoute from './components/PrivateRoute'
import Navbar from './components/Navbar'
import AddRecipeForm from './components/AddRecipeForm';
// import EditRecipe from './components/EditRecipe';
// import Loader from "react-loader-spinner"; // saving this for the login for isLoading animation

// import Loader from "react-loader-spinner"; // saving this for the login for isLoading animation

function App() {
  /*****************************************************************\
                        squeeky clean
  \*****************************************************************/

  return (
    <div>
      <Navbar  />
      <Switch>
        <Route exact path='/' >
          <LoginForm />
        </Route>

        <Route path='/signup'>
          <SignupForm />
        </Route>

        {/* start of private routes */}
        <PrivateRoute path='/userdashboard/' component={UserDashboard} />
        <PrivateRoute path='/addrecipe' component={AddRecipeForm}/>
        {/* <PrivateRoute path='/editrecipe/:id' component={EditRecipe}/>  */}
      </Switch>

    </div>
  );
}

export default App;