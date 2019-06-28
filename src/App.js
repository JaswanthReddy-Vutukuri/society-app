import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Layout } from "antd";

import Dashboard from './containers/dashboard.js';
import Menubar from './containers/menubar.js';

import TotalReqs from './components/total.js';
import ApprovedReqs from './components/approved.js';
import PendingReqs from './components/pending.js';
import DeclinedReqs from './components/declined.js';

import CreateRequest from './components/create.js';

import SideMenuBar from "./components/side-menubar.js";
import Error from './components/error.js';

import "antd/dist/antd.css";
import "./App.css";

const { Content } = Layout;

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <BrowserRouter>
      <Layout>
        <Menubar />
        <Layout>
          <SideMenuBar />
          <Layout style={{ padding: "0 24px 24px" }}>
            <Content style={{background: "#fff", padding: 24, margin: "16px 0px 0px 0px", minHeight: 280}}>
                <Switch>
                  <Route path="/" component={Dashboard} exact />
                  <Route path="/transactions" component={Transactions} />
                  <Route path="/profile" component={Profile} />
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

export default App;
