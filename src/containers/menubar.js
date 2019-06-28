import React from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Dropdown, Icon } from "antd";
import { setActiveRole } from '../actions';

const { Header } = Layout;

const Menubar = ({ activeRoleId, onRoleChange }) => {

    const handleMenuClick = (e) => {
        onRoleChange(e.key);
    };

    const menu = (
        <Menu onClick={handleMenuClick}>
        <Menu.Item key="0">
            <span> User </span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">
            <span> Employee </span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2">
            <span> Incharge </span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">
            <span> Representative </span>
        </Menu.Item>
        </Menu>
    );

    const roleMap = {
        '0': 'User',
        '1': 'Employee',
        '2': 'Incharge',
        '3': 'Representative',
    }
    return (
        <Header className="header">
        <div className="logo" />
        <Dropdown.Button
          className="user-btn"
          overlay={menu}
          icon={<Icon type="user" />}
        >
          {roleMap[activeRoleId]}
        </Dropdown.Button>
        <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px" }} />
      </Header>
    )
}

const mapStateToProps = state => {
  return {
    activeRoleId: state.activeRoleId
  };
};

const mapDispatchToProps = dispatch => {
    return {
        onRoleChange: activeRoleId => {
            dispatch(setActiveRole(activeRoleId));
        }
    };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menubar);