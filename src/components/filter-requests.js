import React from 'react';
import { Form, Button, Select } from 'antd';
// import { DatePicker } from 'antd';
import { Collapse } from 'antd';
import { connect } from 'react-redux';
import { commonService } from '../services';
import { requestService } from '../services';
import { setRequests, setRequestsCount } from '../actions';
import { withRouter } from 'react-router-dom';

const { Panel } = Collapse;
// const { RangePicker } = DatePicker;
const { Option } = Select;

class SearchForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
            districts: [],
            constituencies: [],
            mandals: [],
            villages: []
        }
    }

    componentWillMount() {
        commonService.getDistricts()
            .then(
                districts => {
                    this.setState({ districts: districts });
                },
                error => {
                    console.log("Error while fetching Districts:", error);
                }
            );

        commonService.getConstituencies()
            .then(
                constituencies => {
                    this.setState({ constituencies: constituencies });
                },
                error => {
                    console.log("Error while fetching Constituencies:", error);
                }
            );
    }

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.props.form.resetFields();
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                values.reqStatus = (this.props.location.pathname.slice(1)).toUpperCase();
                this.fetchRequests(values);
            }
        });
    };

    fetchRequests(reqData) {
        this.setState({ loading: true })
        requestService.getRequests(reqData)
            .then(
                response => {
                    this.props.setRequests(response.Results);
                    this.props.setRequestsCount(response.RecordCount);
                    this.setState({ loading: false });
                },
                error => {
                    console.log("Error while fetching requests:", error);
                    this.setState({ loading: false })
                }
            );
    }

    onDistrictChange = (districtId) => {
        commonService.getMandals(districtId)
            .then(
                mandals => {
                    this.setState({ mandals: mandals });
                },
                error => {
                    console.log("Error while fetching Mandals:", error);
                }
            );
    }

    onMandalChange = (mandalId) => {
        commonService.getVillages(mandalId)
            .then(
                villages => {
                    this.setState({ villages: villages });
                },
                error => {
                    console.log("Error while fetching Villages:", error);
                }
            );
    }

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <React.Fragment>
                <Collapse defaultActiveKey={['1']}>
                    <Panel header="Advanced Filter" key="1">
                        <Form layout="inline" onSubmit={this.handleSubmit}>
                            <Form.Item label="District">
                                {getFieldDecorator('DistrictID')(
                                    <Select placeholder="Select District" onChange={this.onDistrictChange} style={{ width: '180px' }}>
                                        {this.state.districts.map(district =>
                                            <Option key={district.DistrictID}
                                                value={district.DistrictID}>
                                                {district.Name}
                                            </Option>
                                        )}
                                    </Select>
                                )}
                            </Form.Item>
                            <Form.Item label="Constituency">
                                {getFieldDecorator('ConstituencyID')(
                                    <Select placeholder="Select Constituency" style={{ width: '180px' }}>
                                        {this.state.constituencies.map(constituency =>
                                            <Option key={constituency.ConstituencyID} value={constituency.ConstituencyID}>{constituency.Name}</Option>
                                        )}
                                    </Select>
                                )}
                            </Form.Item>
                            <Form.Item label="Mandal">
                                {getFieldDecorator('MandalID')(
                                    <Select placeholder="Select Mandal" onChange={this.onMandalChange} style={{ width: '180px' }}>
                                        {this.state.mandals.map(mandal =>
                                            <Option key={mandal.MandalID} value={mandal.MandalID}>{mandal.Name}</Option>
                                        )}
                                    </Select>
                                )}
                            </Form.Item>
                            <Form.Item label="Village">
                                {getFieldDecorator('VillageID')(

                                    <Select placeholder="Select Village" style={{ width: '180px' }}>
                                        {this.state.villages.map(village =>
                                            <Option key={village.VillageID} value={village.VillageID}>{village.Name}</Option>
                                        )}
                                    </Select>
                                )}
                            </Form.Item>
                            {/* <Form.Item label="DateRange">
                                {getFieldDecorator('RoleID', {
                                    rules: [{ required: true, message: 'Please select role!' }],
                                })(

                                    <RangePicker />
                                )}
                            </Form.Item> */}
                            <Form.Item>
                                <Button type="secondary" onClick={e => { this.props.form.resetFields() }} style={{ marginRight: '15px' }} disabled={this.state.loading}>
                                    Clear
                                </Button>
                                <Button type="primary" htmlType="submit" loading={this.state.loading} disabled={this.state.loading}>
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

const ReqsSearchForm = Form.create({ name: 'validate_other' })(SearchForm);

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
        setRequests: requests => {
            dispatch(setRequests(requests));
        },
        setRequestsCount: requestsCount => {
            dispatch(setRequestsCount(requestsCount));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ReqsSearchForm));
