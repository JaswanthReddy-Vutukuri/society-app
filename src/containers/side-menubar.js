import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu, Icon } from "antd";
import { connect } from 'react-redux';

const { Sider } = Layout;

class SideMenuBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const siderOne = (
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
        const siderTwo = (
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
        )

        const siderThree = (
            <Sider width={200} style={{ background: "#fff" }}>
                <Menu mode="inline" defaultSelectedKeys={["0"]} className="main-menu">
                    <Menu.Item key="0">
                        <NavLink to="/create-user">
                            <span>
                                <Icon type="dashboard" />
                                    Create User
                                </span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="1">
                        <NavLink to="/show-users">
                            <span>
                                <Icon type="unordered-list" />
                                    Show Users
                                </span>
                        </NavLink>
                    </Menu.Item>
                </Menu>
            </Sider>
        )
        console.log(this.props.currentUser)

        switch (this.props.currentUser.Role) {
            case 'USER': return (<React.Fragment>{ siderOne }</React.Fragment>);
            case 'EMPLOYEE': return (<React.Fragment>{ siderTwo }</React.Fragment>);
            case 'INCHARGE': return (<React.Fragment>{ siderTwo }</React.Fragment>);
            case 'REPRESENTATIVE': return (<React.Fragment>{ siderTwo }</React.Fragment>);
            case 'ADMIN': return (<React.Fragment>{ siderThree }</React.Fragment>);
            default : return (<h1>I will be no where!</h1>);
        }
    }
}


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
