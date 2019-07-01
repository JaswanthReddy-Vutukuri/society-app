import React from 'react';
import { Button, Input, Form } from 'antd';
import DataTable from './table';
import ReqsSearchForm from './search';
const ButtonGroup = Button.Group;

class ApprovedReqs extends React.Component {
  render() {
    return (
      <div>
        <h2>Approved Requests</h2>
        <ReqsSearchForm />
        <div style={{ textAlign: 'right', margin: '10px 0px' }}>
          <Form layout="inline">
            <Form.Item label="Count">
              <span className="ant-form-text">20</span>
            </Form.Item>
            <Form.Item label="Search">
              {(<Input />)}
            </Form.Item>
            <ButtonGroup>
              <Button>PDF</Button>
              <Button>CSV</Button>
              <Button>EXCEL</Button>
            </ButtonGroup>
          </Form>
        </div>
        <DataTable approve={false} />
      </div>
    );
  }
};

export default ApprovedReqs;