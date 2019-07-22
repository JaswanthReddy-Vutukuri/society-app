import React from 'react';
import 'antd/dist/antd.css';
import { userService, roleService } from '../services';
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

  state = {
    confirmDirty: false,
    roles : []
  };

  componentWillMount() {
    roleService.getRoles()
      .then(
        roles => {
          this.setState({roles:roles});
        },
        error => {
          console.log("Error while fetching Roles:", error);
        }
      );
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', JSON.stringify(values));
        userService.createUser(values)
        .then(
          user => {
            message.success('User Created Successfully');
          },
          error => {
            console.log("Error while creating User:",error)
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
          })(<Input placeholder="Please input firstname" />)}
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
          })(<Input placeholder="Please input lastname" />)}
        </Form.Item>
        <Form.Item label="Role" hasFeedback>
          {getFieldDecorator('RoleID', {
            rules: [{ required: true, message: 'Please select role!' }],
          })(
            <Select placeholder="Please select a role">
              {this.state.roles.map(role =>
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
          })(<Input placeholder="Please input username" />)}
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
          })(<Input placeholder="Please input password" />)}
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

export default CreateUserWrapper;
