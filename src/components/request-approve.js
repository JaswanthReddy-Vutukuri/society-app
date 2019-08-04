import React from 'react';
import {
  Form,
  Select,
  Divider, Rate, Button, message

} from 'antd';
import { commonService } from '../services';
import { requestService } from '../services';
import { userService } from '../services';

const { Option } = Select;

class ReqApprove extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      representatives: [],
      spinning: false
    }
  }

  componentWillMount() {
    commonService.getQuestions()
      .then(
        response => {
          console.log("questions:", response)
          this.setState({ questions: response });
        },
        error => {
          console.log("Error while fetching questions:", error);
        }
      );
    userService.getUsersByRole('REPRESENTATIVE')
      .then(
        response => {
          console.log("representatives:", response)
          this.setState({ representatives: response });
        },
        error => {
          console.log("Error while fetching representatives:", error);
        }
      );
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({spinning:true})
        console.log('Received values of form: ', values);
        let reqObj = {};
        let Ratings = [];
        this.state.questions.forEach(question => {
          let Obj = {};
          Obj.QuestionID = question.QuestionID;
          Obj.RatingValue = values[question.QuestionID]
          Ratings.push(Obj);
        })
        reqObj.Ratings = Ratings;
        reqObj.AssingedToRepID = values.AssingedToRepID;
        reqObj.reqStatus = 'APPROVED'
        reqObj.RequestID = this.props.request.RequestID;

        console.log("reqObj:",reqObj)

        requestService.SaveEmployeeFeedback(reqObj)
          .then(
            response => {
              console.log(response)
              this.setState({spinning:false})
              this.props.handleOk();
              message.info('Request has been Approved by you!');
            },
            error => {
              this.setState({spinning:false})
              message.error('Sorry not able to Approve. Please try again!');
              console.log("Error while saving feedback:", error);
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
    let questionsArray = [];

    if (this.state.questions) {
      for (let i = 0; i < this.state.questions.length; i++) {
        questionsArray.push(
          <Form.Item label={this.state.questions[i].QuestionName}>
            {getFieldDecorator(JSON.stringify(this.state.questions[i].QuestionID), {
              rules: [{ required: true, message: `Please provide Rating!` }]
            })(<Rate />)}
          </Form.Item>
        );
      }
    }

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        {questionsArray}
        <Divider />
        <Form.Item label="Assign Representative" hasFeedback>
          {getFieldDecorator('AssingedToRepID', {
            rules: [{ required: true, message: 'Please select Representative!' }],
          })(
            <Select placeholder="Please select a representative">
              {this.state.representatives.map(representative =>
                <Option key={representative.UserId}
                  value={representative.UserId}>
                  {representative.FirstName + ' ' + representative.LastName}
                </Option>
              )}
            </Select>,
          )}
        </Form.Item>
        <Divider />
        <Form.Item wrapperCol={{ span: 12, offset: 12 }}>
          <Button type="secondary" style={{marginRight:'15px'}}  disabled={this.state.spinning} onClick={e => { this.props.form.resetFields(); this.props.handleCancel(); }}>
            CANCEL
          </Button>
          <Button type="primary" htmlType="submit" loading={this.state.spinning} disabled={this.state.spinning}>
            APPROVE
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const ReqApproveDetails = Form.create({ name: 'validate_other' })(ReqApprove);

export default ReqApproveDetails;