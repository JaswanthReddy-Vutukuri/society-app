import React from 'react';
import { Card, Col, Row, Icon } from 'antd';

const RequestCounts = () => {
    return (
    <div>
    <Row gutter={16}>
      <Col span={6}>
        <Card title="TOTAL REQUESTS" className="req-card" style={{background:'#0000ff5c'}}>
            <span className="req-value">1999<Icon type="swap" style={{marginLeft:'15px'}}/></span>
        </Card>
      </Col>
      <Col span={6}>
        <Card title="APPROVED REQUESTS" className="req-card" style={{background:'#318a315e'}}>
        <span className="req-value">999<Icon type="check" style={{marginLeft:'15px'}}/></span>
        </Card>
      </Col>
      <Col span={6}>
        <Card title="PENDING REQUESTS" className="req-card" style={{background:'#f3ab249e'}}>
        <span className="req-value">500<Icon type="warning" style={{marginLeft:'15px'}}/></span>
        </Card>
      </Col>
      <Col span={6}>
        <Card title="DECLINED REQUESTS" className="req-card" style={{background:'#ff9999'}}>
        <span className="req-value">500<Icon type="dislike" style={{marginLeft:'15px'}}/></span>
        </Card>
      </Col>
    </Row>
  </div>)
}

export default RequestCounts;