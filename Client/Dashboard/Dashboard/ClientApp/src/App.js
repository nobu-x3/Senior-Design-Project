import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import './custom.css'
import Dashboard from './components/Dashboard';
import AddStudent from "./components/AddStudent";
import {Redirect} from "react-router-dom";

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
          <Route exact path='/' render={() => { return(<Redirect to='/dashboard' />)}} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path='/add-student' component={AddStudent} />
      </Layout>
    );
  }
}
