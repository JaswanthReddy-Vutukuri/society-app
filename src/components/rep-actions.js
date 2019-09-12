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

class RepActions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      incharges: [],
      spinning: false
    }
  }

  componentWillMount() {
    userService.getUsersByRole('INCHARGE')
      .then(
        response => {
          console.log("incharges:", response)
          this.setState({ incharges: response });
        },
        error => {
          console.log("Error while fetching incharges:", error);
        }
      );
  }

  SaveRepFeedback = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err || (err && _.keys(err).length <= 1)) {
        this.setState({spinning:true})
        console.log('Received values of form: ', values);
        let reqObj = {};
        reqObj.AssignedToInchargeID = values.AssignedToInchargeID ? values.AssignedToInchargeID : null;
        reqObj.FeedbackStatus       = 'REP_'+this.props.action.toUpperCase()+'D';;
        reqObj.RequestID            = this.props.request.RequestID;
        reqObj.Remarks              = values.Remarks;

        console.log("reqObj:",reqObj)

        requestService.SaveRepresentativeFeedback(reqObj)
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

    const assignInchargeForm = (
        <Form.Item label="Assign Incharge" hasFeedback>
        {getFieldDecorator('AssignedToInchargeID', {
          rules: [{ required: true, message: 'Please select Incharge!' }],
        })(
          <Select placeholder="Please select a Incharge">
            {this.state.incharges.map(incharge =>
              <Option key={incharge.UserId}
                value={incharge.UserId}>
                {incharge.FirstName + ' ' + incharge.LastName}
              </Option>
            )}
          </Select>,
        )}
      </Form.Item>
    )
    return (
      <Form {...formItemLayout} className="rep-form" onSubmit={this.SaveRepFeedback}>
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
        {this.props.action === 'approve' ? assignInchargeForm : null}
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

const RepActionsDetails = Form.create({ name: 'validate_other' })(RepActions);

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
)(RepActionsDetails);
