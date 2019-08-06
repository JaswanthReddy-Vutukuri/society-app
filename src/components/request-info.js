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

    const documentList = this.props.request.Documents.map((document) =>
      <li style={{color:'#1890ff',cursor:'pointer'}} key={document.name}>{document.name}</li>
    );

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="District">
          <span className="ant-form-text">{this.props.request.District}</span>
        </Form.Item>
        <Form.Item label="Constituency">
          <span className="ant-form-text">{this.props.request.District}</span>
        </Form.Item>
        <Form.Item label="Mandal">
          <span className="ant-form-text">{this.props.request.Mandal}</span>
        </Form.Item>
        <Form.Item label="Village">
          <span className="ant-form-text">{this.props.request.Village}</span>
        </Form.Item>
        <Form.Item label="Benefits">
          <span className="ant-form-text">{this.props.request.IssueCategory}</span>
        </Form.Item>
        <Form.Item label="Estimated Budget">
          <span className="ant-form-text">{this.props.request.Estimatedbudget} Rupees</span>
        </Form.Item>
        <Form.Item label="Request Description">
          <span className="ant-form-text">{this.props.request.Description}</span>
        </Form.Item>
        <Form.Item label="Request By">
          <span className="ant-form-text">{this.props.request.Createdby}</span>
        </Form.Item>
        <Form.Item label="Age">
          <span className="ant-form-text">{this.props.request.Age}</span>
        </Form.Item>
        <Form.Item label="Email ID">
          <span className="ant-form-text">{this.props.request.EmailAddress}</span>
        </Form.Item>
        <Form.Item label="Mobile">
          <span className="ant-form-text">{this.props.request.MobileNumber}</span>
        </Form.Item>
        <Form.Item label="Address">
          <span className="ant-form-text">{this.props.request.Address}</span>
        </Form.Item>
        <Form.Item label="Documents">
          <span className="ant-form-text">
            <ul style={{listStyleType:'none'}}>
              {this.props.request.Documents ? documentList : null}
            </ul>
          </span>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 4, offset: 20 }}>
          <Button type="primary" htmlType="submit" onClick={e => { this.props.handleOk(); }}>
            OK
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const RequestInfoDetails = Form.create({ name: 'validate_other' })(RequestInfo);

export default RequestInfoDetails;
