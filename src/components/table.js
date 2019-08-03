import React from 'react';
import { Table, Modal, Divider, Button } from 'antd';
import RequestInfoDetails from './request-info';
import ReqApprove from './request-approve';
import ReqDecline from './request-decline';
import { connect } from 'react-redux';
import { requestService } from '../services';

class DataTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showRequestInfo: false,
      showRequestApprove: false,
      showRequestDecline: false,
      columns:[],
      requests:[]
    }
  }

  componentWillMount() {
    requestService.getRequests({reqStatus:this.props.reqStatus})
    .then(
      requests => {
        this.setState({requests:requests});
      },
      error => {
        console.log("Error while fetching requests:", error);
      }
    );
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
      width: 120,
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
      render: Constituency => (
      <span>{Constituency.Name}</span> )
    },
    {
      title: 'Created Date',
      dataIndex: 'CreatedOn',
      key: 'CreatedOn',
      width: 200,
      render: CreatedOn => (
        <span>{(new Date(CreatedOn)).toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ")}</span> )
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
        <Table 
          columns={this.columns} 
          dataSource={this.state.requests} 
          scroll={{ x: 1500, y: 300 }} 
          pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '15', '20', '30']}} 
        />
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
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataTable);
