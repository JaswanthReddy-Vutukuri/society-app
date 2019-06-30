import React from 'react';
import {
  Form,
  Button
} from 'antd';

class RequestInfo extends React.Component {
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
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="District">
          <span className="ant-form-text">Prakasam</span>
        </Form.Item>
        <Form.Item label="Constituency">
          <span className="ant-form-text">Darsi</span>
        </Form.Item>
        <Form.Item label="Mandal">
          <span className="ant-form-text">Mundlamuru</span>
        </Form.Item>
        <Form.Item label="Village">
          <span className="ant-form-text">Polavaram</span>
        </Form.Item>
        <Form.Item label="Benefits">
          <span className="ant-form-text">People</span>
        </Form.Item>
        <Form.Item label="Estimated Budget">
          <span className="ant-form-text">10000 Rupees</span>
        </Form.Item>
        <Form.Item label="Request Description">
          <span className="ant-form-text">Water Supply Improvement</span>
        </Form.Item>
        <Form.Item label="Request By">
          <span className="ant-form-text">Venu</span>
        </Form.Item>
        <Form.Item label="Age">
          <span className="ant-form-text">25</span>
        </Form.Item>
        <Form.Item label="Email ID">
          <span className="ant-form-text">venu@gmail.com</span>
        </Form.Item>
        <Form.Item label="Mobile">
          <span className="ant-form-text">9876655455</span>
        </Form.Item>
        <Form.Item label="Address">
          <span className="ant-form-text">Ongole</span>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 4, offset: 20 }}>
          <Button type="primary" htmlType="submit">
            OK
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const RequestInfoDetails = Form.create({ name: 'validate_other' })(RequestInfo);

export default RequestInfoDetails;
