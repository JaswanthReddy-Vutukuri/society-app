import React from 'react';
import {
    Form,
    Select,
    Divider, Rate, Button, message, Input
} from 'antd';
import { connect } from 'react-redux';
import { commonService, requestService, userService } from '../services';

const { Option } = Select;
const { TextArea } = Input;

class EmpActions extends React.Component {

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

    SaveEmployeeFeedback = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log("error:",err)
            if (!err) {
                this.setState({ spinning: true });
                console.log('Received values of form: ', values);
                let reqObj = {}, Ratings = [];
                this.state.questions.forEach(question => {
                    let Obj = {};
                    Obj.QuestionID  = question.QuestionID;
                    Obj.RatingValue = values[question.QuestionID]
                    Ratings.push(Obj);
                })
                reqObj.Ratings         = Ratings;
                reqObj.AssingedToRepID = values.AssingedToRepID ? values.AssingedToRepID : null;
                reqObj.Description     = values.Description ? values.Description : null;
                reqObj.FeedbackStatus  = 'EMP_'+this.props.action.toUpperCase()+'D';
                reqObj.RequestID       = this.props.request.RequestID;

                console.log("reqObj:", reqObj)

                requestService.SaveEmployeeFeedback(reqObj)
                    .then(
                        response => {
                            console.log(response)
                            this.setState({ spinning: false })
                            this.props.handleOk();
                            message.info(`Request has been ${this.props.action}d by you!`);
                        },
                        error => {
                            this.setState({ spinning: false })
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

        const assignRepField = (
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
        )

        const addRemarksField = (
            <Form.Item label={<span>Remarks</span>}>
                {getFieldDecorator('Description', {
                    rules: [{ required: true, message: 'Please input your Remarks!', whitespace: true }],
                })(<TextArea rows={4} />)}
            </Form.Item>
        )

        return (
            <Form {...formItemLayout} className="employee-form" onSubmit={this.SaveEmployeeFeedback}>
                {questionsArray}
                <Divider />
                {this.props.action == 'approve' ? assignRepField : addRemarksField}
                <Divider />
                <Form.Item wrapperCol={{ span: 12, offset: 12 }}>
                    <Button type="secondary" style={{ marginRight: '15px' }} disabled={this.state.spinning} onClick={e => { this.props.form.resetFields(); this.props.handleCancel(); }}>
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

const EmpActionsDetails = Form.create({ name: 'validate_other' })(EmpActions);

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
)(EmpActionsDetails);
