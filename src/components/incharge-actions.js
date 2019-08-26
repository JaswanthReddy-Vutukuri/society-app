import React from 'react';
import {
  Form,
  Select,
  Divider, Button, message, Input
} from 'antd';
import { connect } from 'react-redux';
import _ from 'underscore';
import { requestService, userService } from '../services';

const { Option } = Select;
const { TextArea } = Input;

class InchargeActions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      spinning: false
    }
  }

  componentWillMount() {}

  SaveInchargeFeedback = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({spinning:true})
        console.log('Received values of form: ', values);
        let reqObj = {};
        reqObj.AssignedToRepresentativeID = this.props.request.RepresentativeFeedbacks[0].CreatedUserID;
        reqObj.FeedbackStatus       = 'INC_'+this.props.action.toUpperCase()+'D';;
        reqObj.RequestID            = this.props.request.RequestID;
        reqObj.Remarks              = values.Remarks;

        console.log("reqObj:",reqObj)

        requestService.SaveInchargeFeedback(reqObj)
          .then(
            response => {
              console.log(response)
              this.setState({spinning:false})
              this.props.form.resetFields();
              this.props.handleOk();
              message.info(`Request has been ${this.props.action}d by you!`);
            },
            error => {
              this.setState({spinning:false})
              message.error('Sorry not able to Approve. Please try again!');
              console.log("Error while saving feedback:", error);
              this.props.form.resetFields();
              this.props.handleOk();
            }
          );
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
      <Form {...formItemLayout} className="rep-form" onSubmit={this.SaveInchargeFeedback}>
        <Form.Item label="Requested By">
          <span className="ant-form-text">{this.props.request && this.props.request.RepresentativeFeedbacks.length?this.props.request.RepresentativeFeedbacks[0].CreatedUser:''}</span>
        </Form.Item>
        <Form.Item
          label={
            <span>
              Remarks
            </span>
          }
        >
          {getFieldDecorator('Remarks', {
            rules: [{ required: true, message: 'Please input your Remarks!', whitespace: true }],
          })(<TextArea rows={4} />)}
        </Form.Item>
        <Divider />
        <Form.Item wrapperCol={{ span: 12, offset: 12 }}>
          <Button type="secondary" style={{marginRight:'15px'}}  disabled={this.state.spinning} onClick={e => { this.props.form.resetFields(); this.props.handleCancel(); }}>
            CANCEL
          </Button>
          <Button type="primary" htmlType="submit" loading={this.state.spinning} disabled={this.state.spinning}>
            {this.props.action.toUpperCase()}
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

const InchargeActionsDetails = Form.create({ name: 'validate_other' })(InchargeActions);

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InchargeActionsDetails);
