import React from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';

import RequestCounts from '../components/cards';
import Clock from '../components/charts';

import {
  Icon
} from 'antd';

const Dashboard = ({ activeRoleId }) => {

    switch (activeRoleId) {
        case '0': return (
            <div>
                <h2 style={{color:'#435188'}}> About For The Society App </h2>
                <h3 style={{color:'#435188'}}>Behind this</h3>
                <p>
                    This is the application came from the thoughts of <span style={{color:'#435188',fontSize:'16px', fontWeight:500}}>Sri. Magunta Sreenivasulu Reddy</span>, Present Lok Sabha Member of India.
                </p>
                <p>
                    He represents the Ongole constituency of Andhra Pradesh and is a member of the Yuvajana Sramika Rythu Congress Party(YSRCP).
                </p>
                <p>
                    <img src={require('../../src/magunta.jpg')}/>
                </p>
                <h3 style={{color:'#435188'}}>Motivation</h3>
                <p>
                    Goal of this project is to provide a better life to everyone with good responsive administration.
                </p>
                <h3 style={{color:'#435188'}}>How it works?</h3>
                <p>
                    From here any person from the constituency can raise a request which helps and solves the issues of his/her area on providing very basic data.
                </p>
                <p>
                    Regarding the issue, a ticket will be provided on successful submission of request which can be used to track the status.
                </p>
                <h2 style={{textAlign:'center',color:'#435188',marginTop:'30px'}}>
                    For providing the best governance with <Icon type="heart"/>
                </h2>
            </div>
        );
        case '1': return (
            <div>
                <RequestCounts />
                <Clock />
            </div>
        );
        case '2': return (
            <div>
                <RequestCounts />
                <Clock />
            </div>
        );
        case '3': return (
            <div>
                <RequestCounts />
                <Clock />
            </div>
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