import React from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Dropdown, Icon } from "antd";
import { authenticationService } from '../services';
import { history } from '../helpers';
import { logOut } from '../actions';

const { Header } = Layout;

class Menubar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    const handleMenuClick = (e) => {
      if (e.key === '0') {
        authenticationService.logout();
        history.push('/login');
        this.props.logOut();
      }
    };

    const menu = (
      <Menu onClick={handleMenuClick}>
        <Menu.Item key="0">
          <span> Log Out </span>
        </Menu.Item>
      </Menu>
    );

    return (
      <Header className="header">
        <div className="logo" />
        <Dropdown.Button
          className="user-btn"
          overlay={menu}
          icon={<Icon type="user" />}
        >
          {this.props.currentUser.firstName}
        </Dropdown.Button>
        <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px" }} />
      </Header>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => {
      dispatch(logOut());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menubar);