import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu, Icon } from "antd";
import { connect } from 'react-redux';

const { Sider } = Layout;

const SideMenuBar = ({ currentUser }) => {
    if (currentUser.Role == 'User') {
        return (
            <Sider width={200} style={{ background: "#fff" }}>
                <Menu mode="inline" defaultSelectedKeys={["0"]} className="main-menu">
                    <Menu.Item key="0">
                        <NavLink to="/">
                            <span>
                                <Icon type="history" />
                                About
                            </span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="1">
                        <NavLink to="/new-request">
                            <span>
                                <Icon type="form" />
                                Create Request
                            </span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <NavLink to="/track-request">
                            <span>
                                <Icon type="form" />
                                Track Request
                            </span>
                        </NavLink>
                    </Menu.Item>
                </Menu>
            </Sider>
        )
    } else {
        return (
            <Sider width={200} style={{ background: "#fff" }}>
                <Menu mode="inline" defaultSelectedKeys={["0"]} className="main-menu">
                    <Menu.Item key="0">
                        <NavLink to="/">
                            <span>
                                <Icon type="dashboard" />
                                Dashboard
                            </span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="1">
                        <NavLink to="/all">
                            <span>
                                <Icon type="unordered-list" />
                                Total Requests
                            </span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <NavLink to="/approved">
                            <span>
                                <Icon type="check-circle" />
                                Approved Requests
                            </span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <NavLink to="/declined">
                            <span>
                                <Icon type="dislike" />
                                Declined Requests
                            </span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <NavLink to="/pending">
                            <span>
                                <Icon type="exclamation-circle" />
                                Pending Requests
                            </span>
                        </NavLink>
                    </Menu.Item>
                </Menu>
            </Sider>
        );

    }
};


const mapStateToProps = state => {
    return {
        currentUser: state.currentUser
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SideMenuBar);
