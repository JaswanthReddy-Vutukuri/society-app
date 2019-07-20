import React from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';

import RequestCounts from '../components/cards';
import Clock from '../components/charts';
import About from '../components/about';

const Dashboard = ({ currentUser }) => {

    switch (currentUser.Role) {
        case 'User': return (
            <About />
        );
        case 'Employee': return (
            <div>
                <RequestCounts />
                <Clock />
            </div>
        );
        case 'Incharge': return (
            <div>
                <RequestCounts />
                <Clock />
            </div>
        );
        case 'Representative': return (
            <div>
                <RequestCounts />
                <Clock />
            </div>
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