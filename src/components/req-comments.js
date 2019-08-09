import React from "react";
import { Table, Tabs } from 'antd';

const { TabPane } = Tabs;

class ReqComments extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    formatDate(inputDate) {
        let d = new Date(inputDate);
        return (
            ("00" + d.getDate()).slice(-2) + "/" +
            ("00" + (d.getMonth() + 1)).slice(-2) + "/" +
            d.getFullYear() + " " +
            ("00" + d.getHours()).slice(-2) + ":" +
            ("00" + d.getMinutes()).slice(-2) + ":" +
            ("00" + d.getSeconds()).slice(-2)
        );
    }

    render() {
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
                title: 'Comments',
                dataIndex: 'Description',
                key: 'Description',
            },
            {
                title: 'Commented On',
                dataIndex: 'CreatedDate',
                key: 'CreatedDate',
                render: (text,record) => (
                    <span>{this.formatDate(record.CreatedDate)}</span>
                )
            },
            {
                title: 'Feedback Status',
                dataIndex: 'FeedbackStatus',
                key: 'FeedbackStatus',
            },
            {
                title: 'Assigned To',
                dataIndex: 'Representative',
                key: 'Representative'
            }
        ]

        const incCommentCols = [
            {
                title: 'Comments By',
                dataIndex: 'CreatedUserID',
                key: 'CreatedUserID',
            },
            {
                title: 'Comments',
                dataIndex: 'Remarks',
                key: 'Remarks',
            },
            {
                title: 'Commented On',
                dataIndex: 'CreatedOn',
                key: 'CreatedOn',
                render: (text,record) => (
                    <span>{this.formatDate(record.CreatedOn)}</span>
                )
            },
            {
                title: 'Feedback Status',
                dataIndex: 'FeedbackStatus',
                key: 'FeedbackStatus',
            },
            {
                title: 'Assigned To',
                dataIndex: 'AssignedToRepresentative',
                key: 'AssignedToRepresentative'
            }
        ]

        const repCommentCols = [
            {
                title: 'Comments By',
                dataIndex: 'CreatedUserID',
                key: 'CreatedUserID',
            },
            {
                title: 'Comments',
                dataIndex: 'Remarks',
                key: 'Remarks',
            },
            {
                title: 'Commented On',
                dataIndex: 'CreatedOn',
                key: 'CreatedOn',
                render: (text,record) => (
                    <span>{this.formatDate(record.CreatedOn)}</span>
                )
            },
            {
                title: 'Feedback Status',
                dataIndex: 'FeedbackStatus',
                key: 'FeedbackStatus',
            },
            {
                title: 'Assigned To',
                dataIndex: 'AssignedToIncharge',
                key: 'AssignedToIncharge'
            }
        ]

        const empComments = (
            <React.Fragment>
                <Table pagination={false} dataSource={this.props.request.EmployeeFeedbacks} columns={empCommentCols}></Table><br />
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
                    {this.props.request.EmployeeFeedbacks.length ? empComments : <h4 style={{ textAlign: 'center' }}>{'No Comments Available'}</h4>}
                </TabPane>
                <TabPane tab="Incharge Comments" key="2">
                    {this.props.request.InchargeFeedbacks.length ? incComments : <h4 style={{ textAlign: 'center' }}>{'No Comments Available'}</h4>}
                </TabPane>
                <TabPane tab="Representative Comments" key="3">
                    {this.props.request.RepresentativeFeedbacks.length ? repComments : <h4 style={{ textAlign: 'center' }}>{'No Comments Available'}</h4>}
                </TabPane>
            </Tabs>
        )
    }
}

export default ReqComments;