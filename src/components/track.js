import React from 'react';
import {
    Form,
    Input,
    Button,
    Divider,
    Slider
} from 'antd';

const marks = {
    0: "Open",
    20: "Verified",
    40: "Issued",
    60: "Proposed",
    80: "Locked",
    100: "Completed"
};

class TrackRequestDetails extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
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

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <React.Fragment>
                <h2>Track Request</h2>
                <Form layout="inline" onSubmit={this.handleSubmit} style={{ textAlign: 'center' }}>
                    <Form.Item label="Ticket Number" hasFeedback>
                        {getFieldDecorator('ticket-number', {
                            rules: [{ required: true, message: 'Please input Ticket Number!' }],
                        })(
                            <Input placeholder="Input Ticket Number" />
                        )}
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 8, offset: 16 }}>
                        <Button type="primary" htmlType="submit">
                            SUBMIT
                        </Button>
                    </Form.Item>
                    <Divider />
                    <Slider marks={marks} defaultValue={40} style={{ width: '70%', margin: '15%' }} />
                    <Form.Item label="Estimated Completion">
                        <span className="ant-form-text">16.07.2019 Tuesday 12:00 PM</span>
                    </Form.Item>
                </Form>
            </React.Fragment>
        );
    }
}

const TrackRequest = Form.create({ name: 'validate_other' })(TrackRequestDetails);

export default TrackRequest;