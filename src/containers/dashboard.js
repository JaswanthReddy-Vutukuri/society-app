import React from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';

import RequestCounts from '../components/cards';
import {
  Icon
} from 'antd';

const Dashboard = ({ activeRoleId }) => {

    switch (activeRoleId) {
        case '0': return (
            <div>
                <h2 style={{color:'#8390ff'}}> About For The Society App </h2>
                <h3 style={{color:'#8390ff'}}>Behind this</h3>
                <p>
                    This is the application came from the thoughts of <span style={{color:'#8390ff',fontSize:'16px', fontWeight:'bold'}}>Sri. Magunta Sreenivasulu Reddy</span>, Present Lok Sabha Member of India.
                </p>
                <p>
                    He represents the Ongole constituency of Andhra Pradesh and is a member of the Yuvajana Sramika Rythu Congress Party(YSRCP).
                </p>
                <p>
                    <img src={require('../../src/magunta.jpg')}/>
                </p>
                <h3 style={{color:'#8390ff'}}>Motivation</h3>
                <p>
                    Goal of this project is to provide a better life to everyone with good responsive administration.
                </p>
                <h3 style={{color:'#8390ff'}}>How it works?</h3>
                <p>
                    From here any person from the constituency can raise a request which helps and solves the issues of his/her area on providing very basic data.
                </p>
                <p>
                    Regarding the issue, a ticket will be provided on successful submission of request which can be used to track the status.
                </p>
                <h2 style={{textAlign:'center',color:'#8390ff',marginTop:'30px'}}>
                    For Providing The Best Governance with <Icon type="heart" style={{color:'#0ca04c'}}/>
                </h2>
            </div>
        );
        case '1': return (
            <RequestCounts />
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