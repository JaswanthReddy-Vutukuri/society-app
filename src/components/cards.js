import React from 'react';
import { Card, Col, Row } from 'antd';

const RequestCounts = () => {
    return (
    <div>
    <Row gutter={16}>
      <Col span={6}>
        <Card title="Total Requests">
            Total Requests
        </Card>
      </Col>
      <Col span={6}>
        <Card title="Approved Requests">
            Approved Requests
        </Card>
      </Col>
      <Col span={6}>
        <Card title="Pending Requests">
            Pending Requests
        </Card>
      </Col>
      <Col span={6}>
        <Card title="Declined Requests">
            Declined Requests
        </Card>
      </Col>
    </Row>
  </div>)
}

export default RequestCounts;