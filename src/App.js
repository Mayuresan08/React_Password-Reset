import './App.css';
import React from "react";
import { BrowserRouter,Switch,Route,Redirect } from 'react-router-dom';

import Login from './pages/login/login';
import ForgotPassWord from './pages/forgotPassword/forgotPassword';
import Register from './pages/register/register';
import Protected from './pages/protected/protected';
import ChangePassword from './pages/changePassword/changePassword';


export const AppContext=React.createContext()

function App() {
const [log,setLog]= React.useState(false)
  return (
    <div className="App">
        <BrowserRouter>
        <Switch>
          <AppContext.Provider value={[log,setLog]}>
          <Route path="/protected" component={Protected} />
          <Route exact path="/login" component={Login}/>
          <Route exact path="/forgot" component={ForgotPassWord}/>
          <Route path="/register" component={Register}/>
          <Route path="/resetPassword/:id/:token" component={ChangePassword}/>
          <Route exact path="/" >
            <Redirect to="/login"/>
          </Route>
          </AppContext.Provider>
        </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
