import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import './custom.css'
import Dashboard from './components/Dashboard';
import AddStudent from "./components/AddStudent";

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route path="/dashboard" component={Dashboard} />
        <Route path='/add-student' component={AddStudent} />
      </Layout>
    );
  }
}
