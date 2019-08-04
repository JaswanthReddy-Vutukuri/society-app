import React from 'react';
import { Table, Modal, Divider, Button, Spin } from 'antd';
import RequestInfoDetails from './request-info';
import ReqApprove from './request-approve';
import ReqDecline from './request-decline';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class DataTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showRequestInfo: false,
      showRequestApprove: false,
      showRequestDecline: false,
      columns:[],
      approveAction: false,
      declineAction: false,
      selectedRequest: {}
    }
  }

  componentWillMount() {
    this.setActions();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.setActions();
    }
  }

  setActions() {
    let status = (this.props.location.pathname.slice(1)).toUpperCase();

    switch(status) {
      case 'TOTAL'    : {this.setState({approveAction: false, declineAction: false}); break;}
      case 'APPROVED' : {this.setState({approveAction: false, declineAction: false}); break;}
      case 'DECLINED' : {this.setState({approveAction: true, declineAction: false}); break;}
      case 'PENDING'  : {this.setState({approveAction: true, declineAction: true}); break;}
      default         : {this.setState({approveAction: false, declineAction: false}); break;}
    }
  }

  columns = [
    {
      title: 'Ticket No.',
      dataIndex: 'TicketNumber',
      key: 'TicketNumber'
    },
    {
      title: 'Benefits',
      dataIndex: 'IssueCategory',
      key: 'IssueCategory'
    },
    {
      title: 'Description',
      dataIndex: 'Description',
      key: 'Description'
    },
    {
      title: 'Budget',
      dataIndex: 'Estimatedbudget',
      key: 'Estimatedbudget'
    },
    {
      title: 'Created By',
      dataIndex: 'EmailAddress',
      key: 'EmailAddress'
    },
    {
      title: 'Constituency',
      dataIndex: 'Constituency',
      key: 'Constituency'
    },
    {
      title: 'Created Date',
      dataIndex: 'CreatedOn',
      key: 'CreatedOn',
      render: CreatedOn => (
        <span>{(new Date(CreatedOn)).toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ")}</span> )
    },
    {
      title: 'Action',
      key: 'action',
      render: (text,record) => (
        <span>
          <Button type="link" style={{ color: 'blue'}} onClick={()=>{ this.showReqInfoModal(record)}}> View </Button>
          { this.state.approveAction ? <React.Fragment><Divider type="vertical" /> <Button type="link" style={{ color: 'green'}} onClick={()=>{ this.showReqApproveModal(record)}}> Approve </Button> </React.Fragment>: null }
          { this.state.declineAction ? <React.Fragment><Divider type="vertical" /> <Button type="link" style={{ color: 'brown'}} onClick={()=>{ this.showReqDeclineModal(record)}}> Decline </Button> </React.Fragment>: null }
        </span>
      )
    }
  ];
  
  showReqInfoModal = (record) => {
    this.setState({
      showRequestInfo: true,
      selectedRequest: record
    });
  };
  showReqApproveModal = (record) => {
    this.setState({
      showRequestApprove: true,
      selectedRequest: record
    });
  };
  showReqDeclineModal = (record) => {
    this.setState({
      showRequestDecline: true,
      selectedRequest: record
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
        <Spin size="large" spinning={this.props.loading}>
          <Table 
            columns={this.columns} 
            dataSource={this.props.requests} 
            pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '15', '20', '30']}} 
          />
        </Spin>
        <Modal
          title={`${this.state.selectedRequest.TicketNumber}`}
          visible={this.state.showRequestInfo}
          footer={null}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <RequestInfoDetails request={this.state.selectedRequest} />
        </Modal>
        <Modal
          title={`${this.state.selectedRequest.TicketNumber}`}
          visible={this.state.showRequestApprove}
          footer={null}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <ReqApprove request={this.state.selectedRequest} handleOk={this.handleOk}/>
        </Modal>
        <Modal
          title={`${this.state.selectedRequest.TicketNumber}`}
          visible={this.state.showRequestDecline}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <ReqDecline request={this.state.selectedRequest} />
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
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DataTable));
