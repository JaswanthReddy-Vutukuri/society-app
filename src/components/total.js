import React from 'react';
import { Button, Icon, Input, Form } from 'antd';
import DataTable from './table';
const ButtonGroup = Button.Group;

const TotalReqs = () => {
  return (
    <div>
      <h2>Total Requests</h2>
      <div style={{textAlign:'right',margin:'10px 0px'}}>
      <Form layout="inline">
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
      <DataTable />
    </div>
  );
};

export default TotalReqs;