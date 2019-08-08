import React from "react";
import { Table, Divider, Button, Spin } from 'antd';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

class ReqComments extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        console.log("request:", this.props.request)
        const empRatingCols = [
            {
                title: 'Question',
                dataIndex: 'Question',
                key: 'Question',
            },
            {
                title: 'Rating',
                dataIndex: 'RatingValue',
                key: 'RatingValue',
            }
        ];
        const empCommentCols = [
            {
                title: 'Comments By',
                dataIndex: 'CreatedbyUserID',
                key: 'CreatedbyUserID',
            },
            {
                title: 'Commented On',
                dataIndex: 'CreatedDate',
                key: 'CreatedDate',
            },
            {
                title: 'Feedback Status',
                dataIndex: 'FeedbackStatus',
                key: 'FeedbackStatus',
            },
            {
                title: 'Assigned To',
                dataIndex: 'AssingedToRepID',
                key: 'AssingedToRepID',
                render: (text,record) => (
                    <span>{`${record.AssingedToRepID} (REPRESENTATIVE)`}</span>
                )
            }
        ]

        const incCommentCols = [
            {
                title: 'Comments By',
                dataIndex: 'CreatedUserID',
                key: 'CreatedUserID',
            },
            {
                title: 'Commented On',
                dataIndex: 'CreatedOn',
                key: 'CreatedOn',
            },
            {
                title: 'Feedback Status',
                dataIndex: 'FeedbackStatus',
                key: 'FeedbackStatus',
            },
            {
                title: 'Assigned To',
                dataIndex: 'AssignedToRepresentativeID',
                key: 'AssignedToRepresentativeID',
                render: (text,record) => (
                    <span>{`${record.AssignedToRepresentativeID} (REPRESENTATIVE)`}</span>
                )
            }
        ]

        const repCommentCols = [
            {
                title: 'Comments By',
                dataIndex: 'CreatedUserID',
                key: 'CreatedUserID',
            },
            {
                title: 'Commented On',
                dataIndex: 'CreatedOn',
                key: 'CreatedOn',
            },
            {
                title: 'Feedback Status',
                dataIndex: 'FeedbackStatus',
                key: 'FeedbackStatus',
            },
            {
                title: 'Assigned To',
                dataIndex: 'AssignedToInchargeID',
                key: 'AssignedToInchargeID',
                render: (text,record) => (
                    <span>{`${record.AssignedToInchargeID} (INCHARGE)`}</span>
                )
            }
        ]

        const empComments = (
            <React.Fragment>
                <Table pagination={false} dataSource={this.props.request.EmployeeFeedbacks} columns={empCommentCols}></Table><br/>
                <Table pagination={false} dataSource={this.props.request.EmployeeFeedbacks[0].Ratings} columns={empRatingCols}></Table>
            </React.Fragment>
        )
        const incComments = (
                <Table pagination={false} dataSource={this.props.request.InchargeFeedbacks} columns={incCommentCols}></Table>
        )
        const repComments = (
                <Table pagination={false} dataSource={this.props.request.RepresentativeFeedbacks} columns={repCommentCols}></Table>
        )

        return (
            <Tabs defaultActiveKey="1">
                <TabPane tab="Employee Comments" key="1">
                    {this.props.request.EmployeeFeedbacks.length ? empComments : <h4 style={{textAlign:'center'}}>{'No Comments Available'}</h4>}
                </TabPane>
                <TabPane tab="Incharge Comments" key="2">
                    {this.props.request.InchargeFeedbacks.length ? incComments : <h4 style={{textAlign:'center'}}>{'No Comments Available'}</h4>}
                </TabPane>
                <TabPane tab="Representative Comments" key="3">
                    {this.props.request.RepresentativeFeedbacks.length ? repComments : <h4 style={{textAlign:'center'}}>{'No Comments Available'}</h4>}
                </TabPane>
            </Tabs>
        )
    }
}

export default ReqComments;