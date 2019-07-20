import React from 'react';
import { Form, Icon, Input, Button, DatePicker, Select } from 'antd';
import { Collapse } from 'antd';
import { connect } from 'react-redux';
import { getMandals, getVillages } from '../actions';

const { Panel } = Collapse;
const { MonthPicker, RangePicker } = DatePicker;
const { Option } = Select;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
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
        console.log(districtId)
        this.props.getMandals(districtId);
    }

    onMandalChange = (mandalId) => {
        console.log(mandalId)
        this.props.getVillages(mandalId);
    }

    render() {
        return (
            <React.Fragment>
                <Collapse defaultActiveKey={['1']}>
                    <Panel header="Advanced Filter" key="1">
                        <Form layout="inline" onSubmit={this.handleSubmit}>
                            <Form.Item label="District">
                                <Select placeholder="Select District" onChange={this.onDistrictChange} style={{ width: '200px' }}>
                                    {this.props.districts.map(district =>
                                        <Option key={district.DistrictID}
                                            value={district.DistrictID}>
                                            {district.Name}
                                        </Option>
                                    )}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Constituency">
                                <Select placeholder="Select Constituency" style={{ width: '200px' }}>
                                    {this.props.constituencies.map(constituency =>
                                        <Option key={constituency.ConstituencyID} value={constituency.ConstituencyID}>{constituency.Name}</Option>
                                    )}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Mandal">
                                <Select placeholder="Select Mandal" onChange={this.onMandalChange} style={{ width: '200px' }}>
                                    {this.props.mandals.map(mandal =>
                                        <Option key={mandal.MandalID} value={mandal.MandalID}>{mandal.Name}</Option>
                                    )}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Village">
                                <Select placeholder="Select Village" style={{ width: '200px' }}>
                                    {this.props.villages.map(village =>
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
    return {
        districts: state.districts,
        constituencies: state.constituencies,
        mandals: state.mandals,
        villages: state.villages
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getMandals: (districtId) => {
            dispatch(getMandals(districtId));
        },
        getVillages: (mandalId) => {
            dispatch(getVillages(mandalId));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReqsSearchForm);
