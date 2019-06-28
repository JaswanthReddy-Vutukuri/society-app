import React from 'react';
import { connect } from 'react-redux';

const Dashboard = ({ activeRoleId }) => {

    switch (activeRoleId) {
        case '0': return (
            <h2> About Society App </h2>
        );
        case '1': return (
            <h2> Employee </h2>
        );
        case '2': return (
            <h2> Incharge </h2>
        );
        case '3': return (
            <h2> Representative </h2>
        );
        default: return (
            <h2> User </h2>
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
)(Dashboard);