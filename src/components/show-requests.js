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
      showIncApproved: false
    }
  }

  componentWillMount() {
    this.fetchRequests();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.fetchRequests();
    }
  }

  fetchRequests() {
    let status = (this.props.location.pathname.slice(1)).toUpperCase();
    this.setState({ loading: true })
    requestService.getRequests({ reqStatus: status })
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

  onCheckChange() {
    this.setState({showIncApproved:!this.state.showIncApproved})
    console.log(this.state.showIncApproved)
  }  

  render() {
    return (
      <React.Fragment>
        <h2 style={{ textTransform: 'capitalize' }}>{(this.props.location.pathname.slice(1))} Requests 
        <Button type="primary" shape="circle" icon="reload" style={{marginLeft:'15px'}} onClick={e => { this.fetchRequests();}}/>
        </h2>
        <ReqsSearchForm />
        <div style={{ textAlign: 'right', margin: '10px 0px' }}>
          <Form layout="inline">
            <Form.Item>
              <Checkbox>Incharge Approved</Checkbox>
            </Form.Item>
            <Form.Item label="Count">
              <span className="ant-form-text">{this.props.requestsCount}</span>
            </Form.Item>
            <Form.Item label="Search">
              <Search
                placeholder="Search Request"
                onSearch={value => console.log(value)}
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
        <DataTable requests={this.props.requests} loading={this.state.loading} />
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
