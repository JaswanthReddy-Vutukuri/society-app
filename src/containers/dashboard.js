import React from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';

import RequestCounts from '../components/request-counts';
import Clock from '../components/charts';
import About from '../components/about';

const Dashboard = ({ currentUser }) => {

    switch (currentUser.Role) {
        case 'USER': return (
            <About />
        );
        case 'EMPLOYEE': return (
            <div>
                <RequestCounts />
                <Clock />
            </div>
        );
        case 'INCHARGE': return (
            <div>
                <RequestCounts />
                <Clock />
            </div>
        );
        case 'REPRESENTATIVE': return (
            <div>
                <RequestCounts />
                <Clock />
            </div>
        );
        case 'ADMIN': return (
            <h2> Admin </h2>
        );
        default: return (
            <h2> Default </h2>
        );
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
)(Dashboard);