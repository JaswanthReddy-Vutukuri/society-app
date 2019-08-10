import React from "react";
import {
    Form,
    Select,
    Divider, Button, Input, Upload, Icon, message
} from 'antd';
import apiUrl from '../config';
import { requestService } from '../services';

const { Option } = Select;
const { TextArea } = Input;

class RepTodos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({ spinning: true })
                console.log('Received values of form: ', values);
                values.RequestID = this.props.request.RequestID;
                requestService.SaveRepresentativeComments(values)
                    .then(
                        response => {
                            console.log(response)
                            this.setState({ spinning: false })
                            this.props.handleOk();
                            message.info(`Added Status!`);
                        },
                        error => {
                            this.setState({ spinning: false })
                            message.error('Sorry not able to Act. Please try again!');
                            console.log("Error while saving comments:", error);
                            this.props.handleOk();
                        }
                    );
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 14 },
        };

        return (
            <React.Fragment>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="Request Status" hasFeedback>
                        {getFieldDecorator('RequestStatus', {
                            rules: [{ required: false, message: 'Please select status!' }],
                        })(
                            <Select placeholder="Please select a status">
                                <Option key="To Do" value="To Do"> To Do </Option>
                                <Option key="In Progress" value="In Progress"> In Progress </Option>
                                <Option key="Done" value="Done"> Done </Option>
                            </Select>,
                        )}
                    </Form.Item>
                    <Form.Item label="Remarks">
                        {getFieldDecorator('Comment', {
                            rules: [{ required: false, message: 'Please input your Remarks!', whitespace: true }],
                        })(<TextArea rows={2} />)}
                    </Form.Item>
                    <Form.Item label="Documents">
                        {getFieldDecorator('Documents', {
                            valuePropName: 'fileList',
                            getValueFromEvent: this.normFile,
                        })(
                            <Upload name="logo" action={`${apiUrl}/Requests/PostFormData`}>
                                <Button>
                                    <Icon type="upload" /> Click to upload
                                </Button>
                            </Upload>
                        )}
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 6, offset: 18 }}>
                        <Button type="secondary" style={{ marginRight: '15px' }} disabled={this.state.spinning} onClick={e => { this.props.form.resetFields(); this.props.handleOk(); }}>
                            CANCEL
                        </Button>
                        <Button type="primary" htmlType="submit" loading={this.state.spinning} disabled={this.state.spinning}>
                            ADD
                        </Button>
                    </Form.Item>
                </Form>
                <Divider />
                <h3 style={{ textAlign: 'center' }}>----  No Prior Actions Available  ----</h3>
            </React.Fragment>
        )
    }
}

const RepTodosDetails = Form.create({ name: 'validate_other' })(RepTodos);

export default RepTodosDetails;