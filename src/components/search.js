import React from 'react';
import { Form, Button, DatePicker, Select } from 'antd';
import { Collapse } from 'antd';
import { connect } from 'react-redux';
import { commonService } from '../services';

const { Panel } = Collapse;
const { RangePicker } = DatePicker;
const { Option } = Select;

class SearchForm extends React.Component {

    state = {
        districts: [],
        constituencies: [],
        mandals: [],
        villages: []
    };

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

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

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

    render() {
        return (
            <React.Fragment>
                <Collapse defaultActiveKey={['1']}>
                    <Panel header="Advanced Filter" key="1">
                        <Form layout="inline" onSubmit={this.handleSubmit}>
                            <Form.Item label="District">
                                <Select placeholder="Select District" onChange={this.onDistrictChange} style={{ width: '200px' }}>
                                    {this.state.districts.map(district =>
                                        <Option key={district.DistrictID}
                                            value={district.DistrictID}>
                                            {district.Name}
                                        </Option>
                                    )}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Constituency">
                                <Select placeholder="Select Constituency" style={{ width: '200px' }}>
                                    {this.state.constituencies.map(constituency =>
                                        <Option key={constituency.ConstituencyID} value={constituency.ConstituencyID}>{constituency.Name}</Option>
                                    )}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Mandal">
                                <Select placeholder="Select Mandal" onChange={this.onMandalChange} style={{ width: '200px' }}>
                                    {this.state.mandals.map(mandal =>
                                        <Option key={mandal.MandalID} value={mandal.MandalID}>{mandal.Name}</Option>
                                    )}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Village">
                                <Select placeholder="Select Village" style={{ width: '200px' }}>
                                    {this.state.villages.map(village =>
                                        <Option key={village.VillageID} value={village.VillageID}>{village.Name}</Option>
                                    )}
                                </Select>
                            </Form.Item>
                            <Form.Item label="DateRange">
                                <RangePicker />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
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

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReqsSearchForm);
