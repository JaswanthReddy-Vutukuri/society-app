import React from 'react';
import {
    Form,
    Input,
    Button,
    Divider,
    Slider
} from 'antd';
import { connect } from 'react-redux';

import { requestService } from '../services';
import ReqComments from './req-comments';

const marks = {
    0: "Open",
    33: "Verified",
    66: "In Progress",
    100: "Done"
};

class TrackRequestDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedRequest: {},
            ticket: ''
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.setState({ticket: values.TicketNumber});
                requestService.getRequests(values)
                    .then(
                        response => {
                            console.log("response:",response,values.TicketNumber)
                            this.setState({ selectedRequest: response.Results[0] });
                        },
                        error => {
                            console.log("Error while fetching request:", error);
                        }
                    );
            }
        });
    };

    normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    handleOk = e => {
        this.setState({
            selectedRequest: {},
            ticket: ''
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <React.Fragment>
                <h2>Track Request</h2>
                <Form layout="inline" onSubmit={this.handleSubmit} style={{ textAlign: 'center' }}>
                    <Form.Item label="Ticket Number" hasFeedback>
                        {getFieldDecorator('TicketNumber', {
                            rules: [{ required: true, message: 'Please input Ticket Number!' }],
                        })(
                            <Input placeholder="Input Ticket Number" autoComplete="off" />
                        )}
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 8, offset: 16 }}>
                        <Button type="primary" htmlType="submit">
                            SUBMIT
                        </Button>
                    </Form.Item>
                    <Divider />
                    {(this.state.ticket && this.props.currentUser.Role=== 'USER') ? <Slider marks={marks} defaultValue={66} style={{ width: '70%', margin: '15%' }} /> : null}
                    {(this.state.selectedRequest && this.props.currentUser.Role == 'ADMIN') ? <ReqComments request={this.state.selectedRequest} handleOk={this.handleOk} /> : null}
                    {(this.state.ticket && this.props.currentUser.Role=== 'USER') ? 
                    <Form.Item label="Estimated Completion">
                        <span className="ant-form-text">16.08.2019 Friday 12:00 PM</span>
                    </Form.Item> : null }
                </Form>
            </React.Fragment>
        );
    }
}

const TrackRequest = Form.create({ name: 'validate_other' })(TrackRequestDetails);

const mapStateToProps = state => {
    return {
      currentUser: state.currentUser
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {

    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(TrackRequest);