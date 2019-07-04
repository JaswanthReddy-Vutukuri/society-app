import React from "react";
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from './helpers';

import Dashboard from './containers/dashboard.js';
import Menubar from './containers/menubar.js';
import SideMenuBar from "./containers/side-menubar.js";
import TotalReqs from './components/total.js';
import ApprovedReqs from './components/approved.js';
import PendingReqs from './components/pending.js';
import DeclinedReqs from './components/declined.js';
import CreateRequest from './components/create.js';
import TrackRequest from './components/track.js';
import PrivateRoute from './components/private-route';
import SignIn from './components/sign-in';
import Error from './components/error.js';
import { getCurrentUser, logOut } from './actions';

import { Layout } from "antd";
import "antd/dist/antd.css";
import "./App.css";

const { Content } = Layout;

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getCurrentUser();
  }

  logout() {
    this.props.logOut();
    history.push('/login');
  }

  render() {
    return (
      <Router  history={history}>
      <Layout>
      {this.props.currentUser && <Menubar />}
        <Layout>
          {this.props.currentUser && <SideMenuBar /> }
          <Layout style={{ padding: "0 24px 24px" }}>
            <Content style={{background: "#fff", padding: 24, margin: "16px 0px 0px 0px", minHeight: 280}}>
                <Switch>
                  <PrivateRoute exact path="/" roles={['Admin','User','Employee','Incharge','Representative']} component={Dashboard} />
                  <PrivateRoute path="/all" roles={['Admin','Employee','Incharge','Representative']} component={TotalReqs} />
                  <PrivateRoute path="/declined" roles={['Admin','Employee','Incharge','Representative']} component={DeclinedReqs} />
                  <PrivateRoute path="/approved" roles={['Admin','Employee','Incharge','Representative']} component={ApprovedReqs} />
                  <PrivateRoute path="/pending" roles={['Admin','Employee','Incharge','Representative']} component={PendingReqs} />
                  <PrivateRoute path="/new-request" roles={['User']} component={CreateRequest} />
                  <PrivateRoute path="/track-request" roles={['User']} component={TrackRequest} />
                  <Route path="/login" component={SignIn} />
                  <Route component={Error} />
                </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCurrentUser: () => {
      dispatch(getCurrentUser());
    },
    logOut: () => {
      dispatch(logOut());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
