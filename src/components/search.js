import React from 'react';
import { Form, Icon, Input, Button, DatePicker } from 'antd';
import { Collapse } from 'antd';

const { Panel } = Collapse;
const { MonthPicker, RangePicker } = DatePicker;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class SearchForm extends React.Component {
    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        // Only show error after a field is touched.
        const usernameError = isFieldTouched('username') && getFieldError('username');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <React.Fragment>
                <Collapse defaultActiveKey={['1']}>
                    <Panel header="Advanced Filter" key="1">
                        <Form layout="inline" onSubmit={this.handleSubmit}>
                            <Form.Item label="District">
                                <Input placeholder="Select District" />
                            </Form.Item>
                            <Form.Item label="Constituency">
                                <Input placeholder="Select Constituency" />
                            </Form.Item>
                            <Form.Item label="Mandal">
                                <Input placeholder="Select Mandal" />
                            </Form.Item>
                            <Form.Item label="Village">
                                <Input placeholder="Select Village" />
                            </Form.Item>
                            <Form.Item label="DateRange">
                                <RangePicker />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                                    Search
                                </Button>
                            </Form.Item>
                        </Form>
                    </Panel>
                </Collapse>
            </React.Fragment>
        );
    }
}

const ReqsSearchForm = Form.create({ name: 'horizontal_login' })(SearchForm);

export default ReqsSearchForm;