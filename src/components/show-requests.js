import React from 'react';
import { Button} from 'antd';
import { Input, Form, Checkbox, Radio } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { requestService } from '../services';
import { setRequests, setRequestsCount } from '../actions';
import DataTable from './data-table';
import ReqsSearchForm from './filter-requests';

const { Search } = Input;

class ShowRequests extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      viewIncApproved: false,
      showReqByStatus: 'active'
    }
  }

  componentWillMount() {
    this.fetchRequests(null, null, null, false);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.setState({viewIncApproved:false});
      this.setState({showReqByStatus: 'active'});
      this.fetchRequests(null, null, null, false);
    }
  }

  fetchRequests(TicketNumber, Status, Role, Inactive) {
    let innerStatus = (this.props.location.pathname.slice(1)).toUpperCase();
    this.setState({ loading: true });
    requestService.getRequests({ reqStatus: innerStatus, TicketNumber, Status, Role, InActive: Inactive})
      .then(
        response => {
          this.props.setRequests(response.Results);
          this.props.setRequestsCount(response.RecordCount);
          this.setState({ loading: false });
        },
        error => {
          console.log("Error while fetching requests:", error);
          this.setState({ loading: false })
        }
      );
  }

  onIncApproved = (e) => {
    if (e.target.checked) {
      this.setState({viewIncApproved:true});
      this.fetchRequests(null,'INC_APPROVED', 'INCHARGE', this.state.showReqByStatus === 'active'? false : true);
    } else {
      this.setState({viewIncApproved:false});
      this.fetchRequests(null, null, null, this.state.showReqByStatus === 'active'? false : true);
    }
  }
  
  // onShowInactive = (e) => {
  //   if (e.target.checked) {
  //     this.setState({viewInactive:true});
  //     this.fetchRequests(null, this.state.viewIncApproved?'INC_APPROVED':null, this.state.viewIncApproved?'INCHARGE':null, true);
  //   } else {
  //     this.setState({viewInactive:false});
  //     this.fetchRequests(null, this.state.viewIncApproved?'INC_APPROVED':null, this.state.viewIncApproved?'INCHARGE':null, false);
  //   }
  // }

  toggleShow = (e) => {
    this.setState({showReqByStatus: e.target.value});
    if(e.target.value == 'active') {
      this.fetchRequests(null, this.state.viewIncApproved?'INC_APPROVED':null, this.state.viewIncApproved?'INCHARGE':null, false);
    } else {
      this.fetchRequests(null, this.state.viewIncApproved?'INC_APPROVED':null, this.state.viewIncApproved?'INCHARGE':null, true);
    }
  }

  render() {
    return (
      <React.Fragment>
        <h2 style={{ textTransform: 'capitalize' }}>{(this.props.location.pathname.slice(1))} Requests 
        <Button type="link" size={"large"} icon="reload" style={{marginLeft:'15px'}} onClick={e => { this.fetchRequests(null, null, null);}}/>
        </h2>
        <ReqsSearchForm />
        <div style={{ textAlign: 'right', margin: '10px 0px' }}>
          <Form layout="inline">
            <Form.Item>
              <Radio.Group value={this.state.showReqByStatus} buttonStyle="solid" onChange={this.toggleShow}>
                <Radio.Button value="active">All</Radio.Button>
                <Radio.Button value="inactive">InActive</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              {this.props.location.pathname.slice(1) == 'approved' && this.props.currentUser.Role == 'REPRESENTATIVE' ?
              <Checkbox onChange={this.onIncApproved}>Incharge Approved</Checkbox> : null}
            </Form.Item>
            <Form.Item label="Count">
              <span className="ant-form-text">{this.props.requestsCount}</span>
            </Form.Item>
            <Form.Item label="Search">
              <Search
                placeholder="Search Ticket"
                onSearch={TicketNumber => this.fetchRequests(TicketNumber, null, null)}
                style={{ width: 200 }}
              />
            </Form.Item>
            {/* <ButtonGroup>
                <Button>PDF</Button>
                <Button>CSV</Button>
                <Button>EXCEL</Button>
                </ButtonGroup> */}
          </Form>
        </div>
        <DataTable requests={this.props.requests} loading={this.state.loading} viewIncApproved={this.state.viewIncApproved} />
      </React.Fragment>
    );
  }
};


const mapStateToProps = state => {
  return {
    requests: state.requests,
    requestsCount: state.requestsCount,
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setRequests: requests => {
      dispatch(setRequests(requests));
    },
    setRequestsCount: requestsCount => {
      dispatch(setRequestsCount(requestsCount));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ShowRequests));
