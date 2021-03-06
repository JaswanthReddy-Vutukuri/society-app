import React from "react";
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { authenticationService } from '../services';
import { setCurrentUser } from '../actions';
import { connect } from 'react-redux';

class SignInForm extends React.Component {
  constructor(props) {
    super(props);

    // redirect to home if already logged in
    if (this.props.currentUser) {
      this.props.history.push('/');
    }
  }

  state = {
    spinning: false
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.setState({ spinning: true })
        authenticationService.login(values.username, values.password)
          .then(
            user => {
              this.props.setCurrentUser(user);
              this.setState({ spinning: false })
              const { from } = this.props.location.state || { from: { pathname: "/" } };
              this.props.history.push(from);
            },
            error => {
              console.log("ERROR:", error)
              this.setState({ spinning: false })
              if (error === 'Bad Request') {
                message.error('Invalid Username or Password');
              } else {
                message.error('Sorry not able to login. Please try again!');
              }
            }
          );
      }
    });
  };

  loginAsUser = () => {
    let dummyUser = {
      "Username": "user@magunta.in",
      "FirstName": "USER",
      "LastName": "1",
      "Password": "",
      "RoleID": 5,
      "Role": "USER",
      "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InVzZXJAbWFndW50YS5pbiIsIm5iZiI6MTU2ODU0MDYxOSwiZXhwIjoxNTY5MTQ1NDE5LCJpYXQiOjE1Njg1NDA2MjAsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAxOTEiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUwMTkxIn0.LD-6LzZXl4qCikjJTxJmo0RzGcb42jn17kQ2ihSeXAU",
      "UserID": 8
    }
    authenticationService.loginAsUser(dummyUser);
    this.props.setCurrentUser(dummyUser);
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    this.props.history.push('/new-request');
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        <div style={{ textAlign: "center" }}>
          <img src={require('../../src/logo.svg')} alt="logo" style={{ width: '20%' }} />
        </div>
        <div style={{ textAlign: "center" }}>
          <Form onSubmit={this.handleSubmit} className="login-form" style={{ display: 'inline-block' }}>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                  autoComplete="off"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox className="login-form-remember">Remember me</Checkbox>)}
              <span className="login-form-forgot" >
                Forgot password
          </span>
              <Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.spinning} disabled={this.state.spinning}>
                Log in
          </Button>
            </Form.Item>
          </Form>
        </div>
        <div style={{ textAlign: "center" }}>
        Or
        <br></br>
              
          <Button type="link" className="login-form-button" onClick={() => { this.loginAsUser() }}>
            Continue without Login
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

const SignIn = Form.create({ name: 'normal_login' })(SignInForm);

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser: currentUser => {
      dispatch(setCurrentUser(currentUser));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
