import React from 'react';
import { Card, Col, Row, Icon } from 'antd';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { requestService } from '../services';

class RequestCounts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      total: null,
      approved: null,
      pending: null,
      declined: null
    }
  }

  componentWillMount() {
    requestService.getRequestCounts(this.props.currentUser.UserID)
      .then(
        requestCounts => {
          this.setState({ total: requestCounts.Total, approved: requestCounts.Approved, pending: requestCounts.Pending, declined: requestCounts.Declined, inactive: requestCounts.InActive });
        },
        error => {
          console.log("Error while fetching Request Counts:", error);
        }
      );
  }

  render() {
    return (
      <div>
        <Row gutter={16}>
          <Col span={4}>
            <NavLink to="/total">
              <Card title="TOTAL" className="req-card" style={{ background: '#0000ff5c', cursor: 'pointer' }}>
                <span className="req-value">{this.state.total}<Icon type="swap" className="req-icon" /></span>
              </Card>
            </NavLink>
          </Col>
          <Col span={5}>
            <NavLink to="/approved">
              <Card title="APPROVED" className="req-card" style={{ background: '#318a315e', cursor: 'pointer' }}>
                <span className="req-value">{this.state.approved}<Icon type="check" className="req-icon" /></span>
              </Card>
            </NavLink>
          </Col>
          <Col span={5}>
            <NavLink to="/pending">
              <Card title="PENDING" className="req-card" style={{ background: '#f3ab249e', cursor: 'pointer' }}>
                <span className="req-value">{this.state.pending}<Icon type="warning" className="req-icon" /></span>
              </Card>
            </NavLink>
          </Col>
          <Col span={5}>
            <NavLink to="/declined">
              <Card title="DECLINED" className="req-card" style={{ background: '#ff9999', cursor: 'pointer' }}>
                <span className="req-value">{this.state.declined}<Icon type="dislike" className="req-icon" /></span>
              </Card>
            </NavLink>
          </Col>
          <Col span={5}>
            <NavLink to="">
              <Card title="INACTIVE" className="req-card" style={{ background: 'lightgrey', cursor: 'pointer' }}>
                <span className="req-value">{this.state.inactive}<Icon type="swap" className="req-icon" /></span>
              </Card>
            </NavLink>
          </Col>
        </Row>
      </div>
    )
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
)(RequestCounts);