import React from 'react';
import { Button} from 'antd';
import { Input, Form, Checkbox } from 'antd';
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
      viewIncApproved: false
    }
  }

  componentWillMount() {
    this.fetchRequests(null, null, null);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.setState({viewIncApproved:false});
      this.fetchRequests(null, null, null);
    }
  }

  fetchRequests(TicketNumber, Status, Role) {
    let innerStatus = (this.props.location.pathname.slice(1)).toUpperCase();
    this.setState({ loading: true });
    requestService.getRequests({ reqStatus: innerStatus, TicketNumber, Status, Role})
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

  onCheckChange = (e) => {
    console.log(e.target.checked)
    if (e.target.checked) {
      this.setState({viewIncApproved:true});
      this.fetchRequests(null,'INC_APPROVED', 'INCHARGE');
    } else {
      this.setState({viewIncApproved:false});
      this.fetchRequests(null, null, null);
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
              {this.props.location.pathname.slice(1) == 'approved' && this.props.currentUser.Role == 'REPRESENTATIVE' ?
              <Checkbox onChange={this.onCheckChange}>Incharge Approved</Checkbox> : null}
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
