import React from 'react';
import { Card, Col, Row, Icon } from 'antd';

const RequestCounts = () => {
    return (
    <div>
    <Row gutter={16}>
      <Col span={6}>
        <Card title="TOTAL REQUESTS" style={{background:'#0000ff5c',borderRadius:'10px', textAlign:'center', padding:'10px'}}>
            <span style={{color:'white', fontSize:'2.5em'}}>1999<Icon type="swap" style={{marginLeft:'15px'}}/></span>
        </Card>
      </Col>
      <Col span={6}>
        <Card title="APPROVED REQUESTS" style={{background:'#318a315e',borderRadius:'10px', textAlign:'center', padding:'10px'}}>
        <span style={{color:'white', fontSize:'2.5em'}}>999<Icon type="check" style={{marginLeft:'15px'}}/></span>
        </Card>
      </Col>
      <Col span={6}>
        <Card title="PENDING REQUESTS" style={{background:'#f3ab249e',borderRadius:'10px', textAlign:'center', padding:'10px'}}>
        <span style={{color:'white', fontSize:'2.5em'}}>500<Icon type="warning" style={{marginLeft:'15px'}}/></span>
        </Card>
      </Col>
      <Col span={6}>
        <Card title="DECLINED REQUESTS" style={{background:'#ff9999',borderRadius:'10px', textAlign:'center', padding:'10px'}}>
        <span style={{color:'white', fontSize:'2.5em'}}>500<Icon type="dislike" style={{marginLeft:'15px'}}/></span>
        </Card>
      </Col>
    </Row>
  </div>)
}

export default RequestCounts;