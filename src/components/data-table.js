import React from 'react';
import { Table, Modal, Divider, Button, Spin } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import RequestInfoDetails from './request-info';
import EmpActionsDetails from './employee-actions';
import RepActionsDetails from './rep-actions';
import InchargeActionsDetails from './incharge-actions';
import ReqComments from './req-comments';
import RepTodosDetails from './rep-todos';

class DataTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showRequestInfo: false,
      showRequestComments: false,
      showRepTodos: false,
      actionsView: false,
      columns:[],
      approveAction: false,
      declineAction: false,
      selectedRequest: {},
      action: ''
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
      title: 'Actions',
      key: 'action',
      render: (text,record) => (
        <span>
          <Button type="link" icon="eye" style={{fontSize:'20px'}} onClick={()=>{ this.showReqInfoModal(record)}}></Button>
          <React.Fragment><Divider type="vertical" /> <Button type="link" icon="message" style={{fontSize:'20px'}} onClick={()=>{ this.showReqCommentsModal(record)}}></Button></React.Fragment>
          { (this.state.approveAction) ? <React.Fragment><Divider type="vertical" /> <Button type="link" style={{fontSize:'20px'}} icon="like" onClick={()=>{ this.showActionsModal(record, 'approve')}}></Button> </React.Fragment>: null }
          { (this.state.declineAction) ? <React.Fragment><Divider type="vertical" /> <Button type="link" style={{fontSize:'20px'}} icon="dislike" onClick={()=>{ this.showActionsModal(record, 'decline')}}></Button> </React.Fragment>: null }
          { (this.props.currentUser.Role === 'REPRESENTATIVE' && this.props.viewIncApproved) ? <React.Fragment><Divider type="vertical" /> <Button type="link" style={{fontSize:'20px'}} icon="plus-square" onClick={()=>{ this.showExclusiveRepModal(record, 'decline')}}></Button> </React.Fragment>: null }
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

  showReqCommentsModal = (record) => {
    this.setState({
      showRequestComments: true,
      selectedRequest: record
    });
  };

  showExclusiveRepModal = (record) => {
    this.setState({
      showRepTodos: true,
      selectedRequest: record
    });
  };

  showActionsModal = (selectedRequest, action) => {
    this.setState({
      selectedRequest,
      action,
      actionsView: true
    });
  };

  handleOk = e => {
    this.setState({
      showRequestInfo: false,
      showRequestComments: false,
      showRepTodos: false,
      actionsView: false
    });
    setTimeout(() => {window.location.reload();}, 3000);
  };

  handleCancel = e => {
    this.setState({
      showRequestInfo: false,
      showRequestComments: false,
      showRepTodos: false,
      actionsView: false
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
          onCancel={this.handleCancel}
        >
          <RequestInfoDetails request={this.state.selectedRequest} handleOk={this.handleOk}/>
        </Modal>
        <Modal
          title={`${this.state.selectedRequest.TicketNumber}`}
          visible={this.state.showRequestComments}
          footer={null}
          width={800}
          onCancel={this.handleCancel}
        >
          <ReqComments request={this.state.selectedRequest} handleOk={this.handleOk}/>
        </Modal>
        <Modal
          title={`${this.state.selectedRequest.TicketNumber}`}
          visible={this.state.showRepTodos}
          footer={null}
          width={800}
          onCancel={this.handleCancel}
        >
          <RepTodosDetails request={this.state.selectedRequest} handleOk={this.handleOk}/>
        </Modal>
        <Modal
          title={`${this.state.selectedRequest.TicketNumber}`}
          visible={this.state.actionsView}
          footer={null}
          onCancel={this.handleCancel}
        >
          {this.props.currentUser.Role === 'EMPLOYEE' ? 
            <EmpActionsDetails action={this.state.action} request={this.state.selectedRequest} handleOk={this.handleOk} handleCancel={this.handleCancel}/> :
            this.props.currentUser.Role === 'REPRESENTATIVE' ?
            <RepActionsDetails action={this.state.action} request={this.state.selectedRequest} handleOk={this.handleOk} handleCancel={this.handleCancel}/> :
            <InchargeActionsDetails action={this.state.action} request={this.state.selectedRequest} handleOk={this.handleOk} handleCancel={this.handleCancel}/>
          }
        </Modal>
      </React.Fragment>
    );
  }
};

const mapStateToProps = state => {
  return {
    requests: state.requests,
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DataTable));
