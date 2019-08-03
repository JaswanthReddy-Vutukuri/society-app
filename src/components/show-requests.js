import React from 'react';
import { Button, Input, Form } from 'antd';
import DataTable from './table';
import ReqsSearchForm from './search';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

class ShowRequests extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const urlLocation = this.props.location;
    return (
        <React.Fragment>
            <h2>Approved Requests</h2>
            <ReqsSearchForm />
            <div style={{ textAlign: 'right', margin: '10px 0px' }}>
            <Form layout="inline">
                <Form.Item label="Count">
                <span className="ant-form-text">20</span>
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
            <DataTable approve={false} reqStatus={(urlLocation.pathname.slice(1)).toUpperCase()}/>
        </React.Fragment>
    );
  }
};


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
)(withRouter(ShowRequests));
