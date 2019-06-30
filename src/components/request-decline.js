
import React from 'react';
import {
    Form,
    Select,
    Input,
    InputNumber,
    Switch,
    Radio,
    Slider,
    Button,
    Upload,
    Icon,
    Rate,
    Checkbox,
    Row,
    Col,
    Divider,
  } from 'antd';
  
  const { Option } = Select;
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