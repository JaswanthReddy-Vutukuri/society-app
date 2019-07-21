import React from 'react';
import 'antd/dist/antd.css';
import { userService } from '../services';
import { connect } from 'react-redux';
import {
  Form,
  Input,
  Select,
  Divider,
  Button,
  message
} from 'antd';

const { Option } = Select;

class CreateUser extends React.Component {
  
  constructor(props) {
    super(props);
  }

  state = {
    confirmDirty: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', JSON.stringify(values));
        // this.props.createUser(values);
        userService.createUser(values)
        .then(
          user => {
            console.log(user)
            message.success('User Created Successfully');
          },
          error => {
            console.log("ERROR:",error)
          }
        );
      }
    });
  };

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

  render() {
    const roles = [
      {
        "RoleID": 1,
        "RoleName": "ADMIN"
      },
      {
        "RoleID": 2,
        "RoleName": "EMPLOYEE"
      },
      {
        "RoleID": 3,
        "RoleName": "INCHARGE"
      },
      {
        "RoleID": 4,
        "RoleName": "REPRESENTATIVE"
      },
      {
        "RoleID": 5,
        "RoleName": "USER"
      }
    ]
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
          span: 12,
          offset: 12,
        },
      },
    };

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <h2> Create User</h2>
        <Divider />
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
        <Form.Item label="Role" hasFeedback>
          {getFieldDecorator('RoleID', {
            rules: [{ required: true, message: 'Please select role!' }],
          })(
            <Select placeholder="Please select a role">
              {roles.map(role =>
                <Option key={role.RoleID} 
                  value={role.RoleID}>
                  {role.RoleName}
                </Option>
              )}
            </Select>,
          )}
        </Form.Item>
        <Form.Item
          label={
            <span>
              User Name
            </span>
          }
        >
          {getFieldDecorator('Username', {
            rules: [{ required: true, message: 'Please input username!', whitespace: true }],
          })(<Input />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Password
            </span>
          }
        >
          {getFieldDecorator('Password', {
            rules: [{ required: true, message: 'Please input password!', whitespace: true }],
          })(<Input />)}
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

const CreateUserWrapper = Form.create({ name: 'validate_other' })(CreateUser);

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    createUser: (reqData) => {
      // dispatch(createUser(reqData));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUserWrapper);
