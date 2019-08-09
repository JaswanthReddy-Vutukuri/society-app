import React from "react";
import {
    Form,
    Select,
    Divider, Button, Input, Upload, Icon
} from 'antd';
import apiUrl from '../config';

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
                console.log("values:", values)
                this.props.form.resetFields();
                this.props.handleOk();
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
                        {getFieldDecorator('Status', {
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
                        {getFieldDecorator('Remarks', {
                            rules: [{ required: false, message: 'Please input your Remarks!', whitespace: true }],
                        })(<TextArea rows={2} />)}
                    </Form.Item>
                    <Form.Item label="Documents">
                        {getFieldDecorator('upload', {
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
                        <Button type="secondary" style={{ marginRight: '15px' }} onClick={e => { this.props.form.resetFields(); this.props.handleOk(); }}>
                            CANCEL
                        </Button>
                        <Button type="primary" htmlType="submit">
                            ADD
                        </Button>
                    </Form.Item>
                </Form>
                <Divider />
                <h3 style={{textAlign:'center'}}>----  No Prior Actions Available  ----</h3>
            </React.Fragment>
        )
    }
}

const RepTodosDetails = Form.create({ name: 'validate_other' })(RepTodos);

export default RepTodosDetails;