import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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

import SignIn from './components/sign-in';

import Error from './components/error.js';

import { authenticationService } from './services';
import { PrivateRoute } from './components/private-route';

import { Layout } from "antd";
import "antd/dist/antd.css";
import "./App.css";

const { Content } = Layout;

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      isAdmin: false
    };
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe(x => this.setState({
      currentUser: x,
      isAdmin: x && x.role === 'Admin'
    }));
  }

  logout() {
    authenticationService.logout();
    history.push('/login');
  }

  render() {
    const { currentUser, isAdmin } = this.state;
    console.log("isAdmin:",currentUser,isAdmin)
    return (
      <BrowserRouter  history={history}>
      <Layout>
      {currentUser && <Menubar />}
        <Layout>
          {currentUser && <SideMenuBar /> }
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
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
      activeRoleId: state.activeRoleId
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
