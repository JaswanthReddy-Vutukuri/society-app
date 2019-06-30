
import React from 'react';
import {
  Form,
  Input,
  Rate,
  Divider
} from 'antd';

const { TextArea } = Input;

class ReqDeclineForm extends React.Component {
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
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="Rating 1">
          {getFieldDecorator('rate1', {
            initialValue: 3.5,
          })(<Rate />)}
        </Form.Item>
        <Form.Item label="Rating 2">
          {getFieldDecorator('rate2', {
            initialValue: 3.5,
          })(<Rate />)}
        </Form.Item>
        <Form.Item label="Rating 3">
          {getFieldDecorator('rate3', {
            initialValue: 3.5,
          })(<Rate />)}
        </Form.Item>
        <Form.Item label="Rating 4">
          {getFieldDecorator('rate4', {
            initialValue: 3.5,
          })(<Rate />)}
        </Form.Item>
        <Form.Item label="Rating 5">
          {getFieldDecorator('rate5', {
            initialValue: 3.5,
          })(<Rate />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Feedback
            </span>
          }
        >
          {getFieldDecorator('feedback', {
            rules: [{ required: true, message: 'Please input your Feedback!', whitespace: true }],
          })(<TextArea rows={4} />)}
        </Form.Item>
      </Form>
    );
  }
}

const ReqDecline = Form.create({ name: 'validate_other' })(ReqDeclineForm);

export default ReqDecline;