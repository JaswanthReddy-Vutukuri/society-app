import React from 'react';
import {
  Form,
  Input,
  Rate,
  Divider,
  Button, message
} from 'antd';
import { commonService } from '../services';
import { requestService } from '../services';

const { TextArea } = Input;

class ReqDeclineForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
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
        reqObj.Description = values.Description;
        reqObj.reqStatus = 'DECLINED'
        reqObj.RequestID = this.props.request.RequestID;

        console.log("reqObj:",reqObj)

        requestService.SaveEmployeeFeedback(reqObj)
          .then(
            response => {
              console.log(response)
              this.setState({spinning:true})
              this.props.handleOk();
              message.info('Request has been Declined by you!');
            },
            error => {
              this.setState({spinning:true})
              this.props.handleOk();
              message.error('Sorry not able to Decline. Please try again!');
              console.log("Error while saving feedback:", error);
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
        <Form.Item
          label={
            <span>
              Remarks
            </span>
          }
        >
          {getFieldDecorator('Description', {
            rules: [{ required: true, message: 'Please input your Remarks!', whitespace: true }],
          })(<TextArea rows={4} />)}
        </Form.Item>
        <Divider />
        <Form.Item wrapperCol={{ span: 12, offset: 12 }}>
        <Button type="secondary" style={{marginRight:'15px'}}  disabled={this.state.spinning} onClick={e => { this.props.form.resetFields(); this.props.handleCancel(); }}>
            CANCEL
          </Button>
          <Button type="primary" htmlType="submit" loading={this.state.spinning} disabled={this.state.spinning}>
            DECLINE
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const ReqDecline = Form.create({ name: 'validate_other' })(ReqDeclineForm);

export default ReqDecline;