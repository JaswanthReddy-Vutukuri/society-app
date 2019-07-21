import React from 'react';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { getMandals, getVillages } from '../actions';
import { requestService } from '../services';

import {
  Form,
  Input,
  InputNumber,
  Upload,
  Radio,
  Icon,
  Select,
  Divider,
  Checkbox,
  Button,
  message
} from 'antd';

const { TextArea } = Input;
const { Option } = Select;

class CreateRequest extends React.Component {

  state = {
    confirmDirty: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.MobileNumber = '+'+values.prefix+values.MobileNumber;
        values.Status = 'New';
        requestService.createRequest(values)
        .then(
          ticketNumber => {
            console.log("ticketNumber:",ticketNumber)
            message.success(`Request raised Created Successfully. Your Ticket Number: ${ticketNumber}`);
          },
          error => {
            console.log("ERROR:",error)
          }
        );
      }
    });
  };

  onDistrictChange = (districtId) => {
    this.props.getMandals(districtId);
  }

  onMandalChange = (mandalId) => {
    this.props.getVillages(mandalId);
  }

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
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
      labelCol: {
        lg: { span: 4 },
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        lg: { span: 10 },
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 4,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '91',
    })(
      <Select style={{ width: 70 }}>
        <Option value="91">+91</Option>
        <Option value="97">+97</Option>
      </Select>,
    );

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <h2> Request Form</h2>
        <Divider />
        <Form.Item label="District" hasFeedback>
          {getFieldDecorator('DistrictID', {
            rules: [{ required: true, message: 'Please select district!' }],
          })(
            <Select placeholder="Please select a district" onChange={this.onDistrictChange}>
              {this.props.districts.map(district =>
                <Option key={district.DistrictID} 
                  value={district.DistrictID}>
                  {district.Name}
                </Option>
              )}
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="Constituency" hasFeedback>
          {getFieldDecorator('ConstituencyID', {
            rules: [{ required: true, message: 'Please select constituency!' }],
          })(
            <Select placeholder="Please select a constituency">
              {this.props.constituencies.map(constituency =>
                <Option key={constituency.ConstituencyID} value={constituency.ConstituencyID}>{constituency.Name}</Option>
              )}
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="Mandal" hasFeedback>
          {getFieldDecorator('MandalID', {
            rules: [{ required: true, message: 'Please select mandal!' }],
          })(
            <Select placeholder="Please select a mandal" onChange={this.onMandalChange}>
              {this.props.mandals.map(mandal =>
                <Option key={mandal.MandalID} value={mandal.MandalID}>{mandal.Name}</Option>
              )}
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="Village" hasFeedback>
          {getFieldDecorator('VillageID', {
            rules: [{ required: true, message: 'Please select village!' }],
          })(
            <Select placeholder="Please select a village">
              {this.props.villages.map(village =>
                <Option key={village.VillageID} value={village.VillageID}>{village.Name}</Option>
              )}
            </Select>,
          )}
        </Form.Item>
        <Form.Item
          label={
            <span>
              First Name
            </span>
          }
        >
          {getFieldDecorator('FirstName', {
            rules: [{ required: true, message: 'Please input your firstname!', whitespace: true }],
          })(<Input />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Last Name
            </span>
          }
        >
          {getFieldDecorator('LastName', {
            rules: [{ required: true, message: 'Please input your lastname!', whitespace: true }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Gender">
          {getFieldDecorator('Gender')(
            <Radio.Group>
              <Radio value="Male">Male</Radio>
              <Radio value="Female">Female</Radio>
            </Radio.Group>,
          )}
        </Form.Item>
        <Form.Item label="Age">
                {getFieldDecorator('Age', {rules: [{ required: true, message: 'Please provide Age!' }] })(<InputNumber />)}
                <span className="ant-form-text"> Years </span>
        </Form.Item>
        <Form.Item label="Phone Number">
          {getFieldDecorator('MobileNumber', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
        </Form.Item>
        <Form.Item label="E-mail">
          {getFieldDecorator('EmailAddress', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Address
            </span>
          }
        >
          {getFieldDecorator('Address', {
            rules: [{ required: true, message: 'Please input your address!', whitespace: true }],
          })(<TextArea rows={4} />)}
        </Form.Item>
        <Form.Item label="Benefits">
          {getFieldDecorator('IssueCategory', {
            rules: [{ required: true, message: 'Please input beneficiaries!' }],
          })(
            <Radio.Group>
              <Radio value="Person">Person</Radio>
              <Radio value="People">People</Radio>
            </Radio.Group>,
          )}
        </Form.Item>
        <Form.Item label="Estimated Budget">
                {getFieldDecorator('Estimatedbudget', {rules: [{ required: true, message: 'Please provide Budget!' }] })(<InputNumber />)}
                <span className="ant-form-text"> Rupees </span>
        </Form.Item>
        <Form.Item
          label={
            <span>
              Brief Description
            </span>
          }
        >
          {getFieldDecorator('Description', {
            rules: [{ required: true, message: 'Please input your description!', whitespace: true }],
          })(<TextArea rows={4} />)}
        </Form.Item>
        <Form.Item label="Upload Relevant Docs">
          <div className="dropbox">
            {getFieldDecorator('Documents', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
            })(
              <Upload.Dragger name="files" action="http://api.magunta.in/api/Requests/PostFormData">
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Supports single or bulk upload</p>
              </Upload.Dragger>,
            )}
          </div>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('Agreed', {
            valuePropName: 'checked',
          })(
            <Checkbox>
              I confirm all the above information provided is true upto my knowledge
            </Checkbox>,
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            SUBMIT
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const NewReqFormWrapper = Form.create({ name: 'validate_other' })(CreateRequest);

const mapStateToProps = state => {
  return {
    districts: state.districts,
    constituencies: state.constituencies,
    mandals: state.mandals,
    villages: state.villages
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMandals: (districtId) => {
      dispatch(getMandals(districtId));
    },
    getVillages: (mandalId) => {
      dispatch(getVillages(mandalId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewReqFormWrapper);
