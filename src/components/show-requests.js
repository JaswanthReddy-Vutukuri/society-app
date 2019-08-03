import React from 'react';
import { Button, Input, Form } from 'antd';
import DataTable from './table';
import ReqsSearchForm from './search';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { requestService } from '../services';

class ShowRequests extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      requests:[],
      loading: false,
      count: 0
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
    this.setState({loading:true})
    requestService.getRequests({reqStatus:status})
    .then(
      response => {
        this.setState({requests:response.Results,count:response.RecordCount,loading:false});
      },
      error => {
        console.log("Error while fetching requests:", error);
        this.setState({loading:false})
      }
    );
  }

  render() {
    return (
        <React.Fragment>
            <h2 style={{textTransform:'capitalize'}}>{(this.props.location.pathname.slice(1))} Requests</h2>
            <ReqsSearchForm />
            <div style={{ textAlign: 'right', margin: '10px 0px' }}>
            <Form layout="inline">
                <Form.Item label="Count">
                <span className="ant-form-text">{this.state.count}</span>
                </Form.Item>
                <Form.Item label="Search">
                {(<Input />)}
                </Form.Item>
                {/* <ButtonGroup>
                <Button>PDF</Button>
                <Button>CSV</Button>
                <Button>EXCEL</Button>
                </ButtonGroup> */}
            </Form>
            </div>
            <DataTable approve={false} requests={this.state.requests} loading={this.state.loading}/>
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
)(withRouter(ShowRequests));
