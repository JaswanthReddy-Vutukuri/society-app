import React from 'react';
import { Card, Col, Row, Icon } from 'antd';
import { connect } from 'react-redux';
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
          this.setState({ total: requestCounts.Total, approved: requestCounts.Approved, pending: requestCounts.Pending, declined: requestCounts.Declined });
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
          <Col span={6}>
            <Card title="TOTAL REQUESTS" className="req-card" style={{ background: '#0000ff5c' }}>
              <span className="req-value">{this.state.total}<Icon type="swap" className="req-icon" /></span>
            </Card>
          </Col>
          <Col span={6}>
            <Card title="APPROVED REQUESTS" className="req-card" style={{ background: '#318a315e' }}>
              <span className="req-value">{this.state.approved}<Icon type="check" className="req-icon" /></span>
            </Card>
          </Col>
          <Col span={6}>
            <Card title="PENDING REQUESTS" className="req-card" style={{ background: '#f3ab249e' }}>
              <span className="req-value">{this.state.pending}<Icon type="warning" className="req-icon" /></span>
            </Card>
          </Col>
          <Col span={6}>
            <Card title="DECLINED REQUESTS" className="req-card" style={{ background: '#ff9999' }}>
              <span className="req-value">{this.state.declined}<Icon type="dislike" className="req-icon" /></span>
            </Card>
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