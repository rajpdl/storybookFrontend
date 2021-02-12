import React, { Component } from "react";
import {  BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Home from "./book/Home";
import Login from "./Login";
import Detail from "./book/Detail";
import Private from "./book/Private";
import ProtectedRoute from "./../component/ProtectedRoute";
import SignUp from "./SignUp";
import EditBook from "./book/EditBook";
import Error from "./Error";
import CreateBook from "./book/CreateBook";

import AuthHome from './auth/Home';
import AdminEdit from "./auth/AdminEdit";
import AdminCreate from "./auth/AdminCreate";


class Dashboard extends Component {

  render() {
    return (
      <Router>
        <div className="container">          
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/private" component={Private} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={() => {
                localStorage.clear();
                return <Redirect to="/" />;
            }} />
            <Route path="/signup" component={SignUp} />
            <Route path='/detail/:id' component={Detail} />
            <ProtectedRoute path='/edit/:id' component={EditBook} />
            <ProtectedRoute path='/create' component={CreateBook} />
            <ProtectedRoute path='/admin' exact component={AuthHome} />
            <ProtectedRoute path='/admin/create' component={AdminCreate} />
            <ProtectedRoute path="/admin/edit/:id" component={AdminEdit} />
            <Route component={Error} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Dashboard;
