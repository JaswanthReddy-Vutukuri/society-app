import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from "antd";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const { Sider } = Layout;

class SideMenuBar extends React.Component {

    static propTypes = {
        location: PropTypes.object.isRequired
    }

    render() {
        const { location } = this.props;
        const siderOne = (
            <Sider width={200} style={{ background: "#fff" }}>
                <Menu mode="inline" defaultSelectedKeys={['/']} selectedKeys={[location.pathname]} className="main-menu">
                    <Menu.Item key="/">
                        <NavLink to="/">
                            <span>
                                <Icon type="history" />
                                About
                            </span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/new-request">
                        <NavLink to="/new-request">
                            <span>
                                <Icon type="form" />
                                Create Request
                            </span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/track-request">
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
                <Menu mode="inline" defaultSelectedKeys={['/']} selectedKeys={[location.pathname]} className="main-menu">
                    <Menu.Item key="/">
                        <NavLink to="/">
                            <span>
                                <Icon type="dashboard" />
                                Dashboard
                            </span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/total">
                        <NavLink to="/total">
                            <span>
                                <Icon type="unordered-list" />
                                Total Requests
                            </span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/approved">
                        <NavLink to="/approved">
                            <span>
                                <Icon type="check-circle" />
                                Approved Requests
                            </span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/declined">
                        <NavLink to="/declined">
                            <span>
                                <Icon type="dislike" />
                                Declined Requests
                            </span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/pending">
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
                <Menu mode="inline" defaultSelectedKeys={['/']} selectedKeys={[location.pathname]} className="main-menu">
                    <Menu.Item key="/">
                        <NavLink to="/">
                            <span>
                                <Icon type="dashboard" />
                                Dashboard
                                </span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/total">
                        <NavLink to="/total">
                            <span>
                                <Icon type="unordered-list" />
                                Total Requests
                            </span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/approved">
                        <NavLink to="/approved">
                            <span>
                                <Icon type="check-circle" />
                                Approved Requests
                            </span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/declined">
                        <NavLink to="/declined">
                            <span>
                                <Icon type="dislike" />
                                Declined Requests
                            </span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/pending">
                        <NavLink to="/pending">
                            <span>
                                <Icon type="exclamation-circle" />
                                Pending Requests
                            </span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/create-user">
                        <NavLink to="/create-user">
                            <span>
                                <Icon type="edit" />
                                Create User
                                </span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/show-users">
                        <NavLink to="/show-users">
                            <span>
                                <Icon type="unordered-list" />
                                Users List
                                </span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/track-request">
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

        switch (this.props.currentUser.Role) {
            case 'USER': return (<React.Fragment></React.Fragment>);
            case 'EMPLOYEE': return (<React.Fragment>{siderTwo}</React.Fragment>);
            case 'INCHARGE': return (<React.Fragment>{siderTwo}</React.Fragment>);
            case 'REPRESENTATIVE': return (<React.Fragment>{siderTwo}</React.Fragment>);
            case 'SPONSORSHIP': return (<React.Fragment>{siderTwo}</React.Fragment>);
            case 'ADMIN': return (<React.Fragment>{siderThree}</React.Fragment>);
            default: return (<h1>I will be no where!</h1>);
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
)(withRouter(SideMenuBar));
