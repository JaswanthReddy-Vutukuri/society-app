import React from 'react';
import { Table, Modal, Divider, Button } from 'antd';
import RequestInfoDetails from './request-info';
import ReqApprove from './request-approve';
import ReqDecline from './request-decline';
import { connect } from 'react-redux';
import { getRequests } from '../actions';

class DataTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showRequestInfo: false,
      showRequestApprove: false,
      showRequestDecline: false,
      columns:[]
    }
  }

  componentWillMount() {
    this.props.getRequests({reqStatus:this.props.reqStatus});
  }

  columns = [
    {
      title: 'Ticket No.',
      width: 200,
      dataIndex: 'TicketNumber',
      key: 'TicketNumber',
      fixed: 'left',
    },
    {
      title: 'Benefits',
      dataIndex: 'IssueCategory',
      key: 'IssueCategory',
      width: 150,
    },
    {
      title: 'Description',
      dataIndex: 'Description',
      key: 'Description',
      width: 150,
    },
    {
      title: 'Budget',
      dataIndex: 'Estimatedbudget',
      key: 'Estimatedbudget',
      width: 150,
    },
    {
      title: 'Created By',
      dataIndex: 'EmailAddress',
      key: 'EmailAddress',
      width: 200,
    },
    {
      title: 'Constituency',
      dataIndex: 'Constituency',
      key: 'Constituency',
      width: 150,
    },
    {
      title: 'Created Date',
      dataIndex: 'CreatedDate',
      key: 'CreatedDate',
      width: 150,
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      render: () => (
        <span>
          <Button type="link" style={{ color: 'blue'}} onClick={()=>{ this.showReqInfoModal()}}> View </Button>
          { this.props.approve ? <React.Fragment><Divider type="vertical" /> <Button type="link" style={{ color: 'green'}} onClick={()=>{ this.showReqApproveModal()}}> Approve </Button> </React.Fragment>: null }
          { this.props.decline ? <React.Fragment><Divider type="vertical" /> <Button type="link" style={{ color: 'brown'}} onClick={()=>{ this.showReqDeclineModal()}}> Decline </Button> </React.Fragment>: null }
        </span>
      )
    }
  ];
  
  showReqInfoModal = () => {
    this.setState({
      showRequestInfo: true,
    });
  };
  showReqApproveModal = () => {
    this.setState({
      showRequestApprove: true,
    });
  };
  showReqDeclineModal = () => {
    this.setState({
      showRequestDecline: true,
    });
  };

  handleOk = e => {
    this.setState({
      showRequestInfo: false,
      showRequestApprove: false,
      showRequestDecline: false,
    });
  };

  handleCancel = e => {
    this.setState({
      showRequestInfo: false,
      showRequestApprove: false,
      showRequestDecline: false,
    });
  };

  render() {
    return (
      <React.Fragment>
        <Table columns={this.columns} dataSource={this.props.requests} scroll={{ x: 1500, y: 300 }} />
        <Modal
          title="Request Ticket : REQ 009"
          visible={this.state.showRequestInfo}
          footer={null}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <RequestInfoDetails />
        </Modal>
        <Modal
          title="Request Ticket : REQ 009"
          visible={this.state.showRequestApprove}
          footer={null}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <ReqApprove />
        </Modal>
        <Modal
          title="Request Ticket : REQ 009"
          visible={this.state.showRequestDecline}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <ReqDecline />
        </Modal>
      </React.Fragment>
    );
  }
};

const mapStateToProps = state => {
  return {
    requests: state.requests
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRequests: (reqParams) => {
      dispatch(getRequests(reqParams));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataTable);
