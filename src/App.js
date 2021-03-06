import React from "react";
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from './helpers';

import Dashboard from './containers/dashboard.js';
import Menubar from './containers/menubar.js';
import SideMenuBar from "./containers/side-menubar.js";
import ShowRequests from './components/show-requests';
import CreateRequest from './components/create-request.js';
import TrackRequest from './components/track-requests';
import PrivateRoute from './components/private-route';
import SignIn from './components/signin';
import PageNotFoundError from './components/404.js';
import CreateUser from './components/create-user.js';
import ShowUsers from './components/show-users.js';
import { getCurrentUser } from './actions';

import { Layout } from "antd";
import "antd/dist/antd.css";
import "./App.css";

const { Content } = Layout;

class App extends React.Component {

  componentDidMount() {
    this.props.getCurrentUser();
  }

  render() {
    return (
      <Router history={history}>
      <Layout>
      {this.props.currentUser && <Menubar />}
        <Layout>
          {this.props.currentUser && <SideMenuBar /> }
          <Layout style={{ padding: "0 24px 24px" }}>
            <Content style={{background: "#fff", padding: 18, margin: "16px 0px 0px 0px", minHeight: 280}}>
                <Switch>
                  <PrivateRoute exact path="/" roles={['USER','EMPLOYEE','INCHARGE','REPRESENTATIVE', 'ADMIN', 'SPONSORSHIP']} component={Dashboard} />
                  <PrivateRoute path="/total" roles={['EMPLOYEE','INCHARGE','REPRESENTATIVE', 'ADMIN', 'SPONSORSHIP']} component={ShowRequests} />
                  <PrivateRoute path="/declined" roles={['EMPLOYEE','INCHARGE','REPRESENTATIVE', 'ADMIN', 'SPONSORSHIP']} component={ShowRequests} />
                  <PrivateRoute path="/approved" roles={['EMPLOYEE','INCHARGE','REPRESENTATIVE', 'ADMIN', 'SPONSORSHIP']} component={ShowRequests} />
                  <PrivateRoute path="/pending" roles={['EMPLOYEE','INCHARGE','REPRESENTATIVE', 'ADMIN', 'SPONSORSHIP']} component={ShowRequests} />
                  <PrivateRoute path="/new-request" roles={['USER']} component={CreateRequest} />
                  <PrivateRoute path="/track-request" roles={['USER', 'ADMIN']} component={TrackRequest} />
                  <PrivateRoute path="/create-user" roles={['ADMIN']} component={CreateUser} />
                  <PrivateRoute path="/show-users" roles={['ADMIN']} component={ShowUsers} />
                  <Route path="/login" component={SignIn} />
                  <Route component={PageNotFoundError} />
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
