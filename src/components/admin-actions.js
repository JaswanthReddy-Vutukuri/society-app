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

class AdminActions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sponsors: [],
            spinning: false
        }
    }

    componentWillMount() {
        userService.getUsersByRole('SPONSORSHIP')
            .then(
                response => {
                    console.log("sponsors:", response)
                    this.setState({ sponsors: response });
                },
                error => {
                    console.log("Error while fetching sponsors:", error);
                }
            );
    }

    validateAdminFeedback = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                let reqObj = {};
                reqObj.SponsorUserID = values.SponsorUserID;
                reqObj.RequestID = this.props.request.RequestID;
                this.SaveAdminFeedback(reqObj);
            }
        });
    };

    SaveAdminFeedback = (reqObj) => {
        this.setState({ spinning: true });

        requestService.SaveAdminFeedback(reqObj)
        .then(
            response => {
                console.log(response)
                this.setState({ spinning: false })
                this.props.form.resetFields();
                this.props.handleOk();
                message.info(`Assigned successfully!`);
            },
            error => {
                this.setState({ spinning: false })
                message.error('Sorry. Please try again!');
                console.log("Error while assigning sponsor:", error);
                this.props.form.resetFields();
                this.props.handleOk();
            }
        );
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 14 },
        };

        const assignSponsorsField = (
            <Form.Item label="Assign Sponsor" hasFeedback>
                {getFieldDecorator('SponsorUserID', {
                    rules: [{ required: true, message: 'Please select Sponsor!' }],
                })(
                    <Select placeholder="Please select a Sponsor">
                        {this.state.sponsors.map(sponsor =>
                            <Option key={sponsor.UserId}
                                value={sponsor.UserId}>
                                {sponsor.FirstName + ' ' + sponsor.LastName}
                            </Option>
                        )}
                    </Select>,
                )}
            </Form.Item>
        )

        // const addRemarksField = (
        //     <Form.Item label={<span>Remarks</span>}>
        //         {getFieldDecorator('Description', {
        //             rules: [{ required: true, message: 'Please input your views!', whitespace: true }],
        //         })(<TextArea rows={4} />)}
        //     </Form.Item>
        // )

        return (
            <Form {...formItemLayout} className="admin-form" onSubmit={this.validateAdminFeedback}>
                {/* {addRemarksField} */}
                {/* <Divider /> */}
                {assignSponsorsField}
                <Divider />
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

const AdminActionsDetails = Form.create({ name: 'validate_other' })(AdminActions);

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
)(AdminActionsDetails);
