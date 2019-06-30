import React from 'react';
import {
  Form,
  Select,
  Divider, Rate, Button

} from 'antd';

const { Option } = Select;

class ReqApprove extends React.Component {
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
        <Divider />
        <Form.Item label="Assign Incharge" hasFeedback>
          {getFieldDecorator('select', {
            rules: [{ required: true, message: 'Please select your Incharge!' }],
          })(
            <Select placeholder="Please select a Incharge">
              <Option value="china">Incharge1</Option>
              <Option value="usa">Incharge2</Option>
            </Select>,
          )}
        </Form.Item>
        <Divider />
        <Form.Item wrapperCol={{ span: 8, offset: 16 }}>
          <Button type="primary" htmlType="submit">
            SUBMIT
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const ReqApproveDetails = Form.create({ name: 'validate_other' })(ReqApprove);

export default ReqApproveDetails;