import React from 'react';
import {
    Form,
    Select,
    Divider, Rate, Button, message, Input
} from 'antd';
import { connect } from 'react-redux';
import _ from 'underscore';
import { commonService, requestService, userService } from '../services';

const { Option } = Select;
const { TextArea } = Input;

class EmpActions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            incharges: [],
            spinning: false,
            cantApprove: false
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

    validateEmployeeFeedback = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err || (err && _.keys(err).length <= 1)) {
                console.log('Received values of form: ', values);
                this.setState({
                    cantApprove: false
                })
                let reqObj = {}, Ratings = [], ratingValues = [];
                this.state.questions.forEach(question => {
                    let Obj = {};
                    Obj.QuestionID = question.QuestionID;
                    Obj.RatingValue = values[question.QuestionID]
                    ratingValues.push(values[question.QuestionID])
                    Ratings.push(Obj);
                })
                reqObj.Ratings = Ratings;
                reqObj.Description = values.Description ? values.Description : null;
                reqObj.RequestID = this.props.request.RequestID;

                console.log("reqObj:", reqObj)

                let ratingSum = ratingValues.reduce((a, b) => a + b, 0);
                let ratingsLength = ratingValues.length;
                let ratingAverage = (ratingsLength * 5) / 2;
                console.log("ratingSum,ratingsLength,ratingAverage:", ratingSum, ratingsLength, ratingAverage)
                if (ratingSum < ratingAverage) {
                    reqObj.FeedbackStatus = 'EMP_DECLINED';
                    reqObj.AssingedToInchargeID = null;
                    this.SaveEmployeeFeedback(reqObj);
                } else {
                    reqObj.FeedbackStatus = 'EMP_APPROVED';
                    if (values.AssingedToInchargeID) {
                        reqObj.AssingedToInchargeID = values.AssingedToInchargeID;
                        this.SaveEmployeeFeedback(reqObj);
                    } else {
                        this.setState({ cantApprove: true });
                    }
                }
            }
        });
    };

    SaveEmployeeFeedback = (reqObj) => {
        this.setState({ spinning: true });

        requestService.SaveEmployeeFeedback(reqObj)
        .then(
            response => {
                console.log(response)
                this.setState({ spinning: false })
                this.props.form.resetFields();
                this.props.handleOk();
                message.info(`Comments saved successfully!`);
            },
            error => {
                this.setState({ spinning: false })
                message.error('Sorry. Please try again!');
                console.log("Error while saving feedback:", error);
                this.props.form.resetFields();
                this.props.handleOk();
            }
        );
    }

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
            labelCol: { span: 12 },
            wrapperCol: { span: 10 },
        };
        let questionsArray = [];

        if (this.state.questions) {
            for (let i = 0; i < this.state.questions.length; i++) {
                questionsArray.push(
                    <Form.Item label={this.state.questions[i].QuestionName} style={{whiteSpace:'pre-wrap'}}>
                        {getFieldDecorator(JSON.stringify(this.state.questions[i].QuestionID), {
                            rules: [{ required: true, message: `Please provide Rating!` }]
                        })(<Rate />)}
                    </Form.Item>
                );
            }
        }

        const assignRepField = (
            <Form.Item label="Assign Incharge" hasFeedback>
                {getFieldDecorator('AssingedToInchargeID', {
                    rules: [{ required: false, message: 'Please select Incharge!' }],
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

        const addRemarksField = (
            <Form.Item label={<span>Remarks</span>}>
                {getFieldDecorator('Description', {
                    rules: [{ required: true, message: 'Please input your Remarks!', whitespace: true }],
                })(<TextArea rows={4} />)}
            </Form.Item>
        )

        return (
            <Form {...formItemLayout} className="employee-form" onSubmit={this.validateEmployeeFeedback}>
                {questionsArray}
                <Divider />
                {addRemarksField}
                <Divider />
                {assignRepField}
                <Divider />
                {this.state.cantApprove ? <h3 style={{color:'brown',textAlign:"center"}}>{"Please assign a incharge!"}</h3>: null}
                <Form.Item wrapperCol={{ span: 12, offset: 12 }}>
                    <Button type="secondary" style={{ marginRight: '15px' }} disabled={this.state.spinning} onClick={e => { this.props.form.resetFields(); this.props.handleCancel(); }}>
                        CANCEL
                    </Button>
                    <Button type="primary" htmlType="submit" loading={this.state.spinning} disabled={this.state.spinning}>
                        SUBMIT
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
