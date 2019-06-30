import React from 'react';
import { Button, Input, Form } from 'antd';
import DataTable from './table';
import ReqsSearchForm from './search';
const ButtonGroup = Button.Group;

class DeclinedReqs extends React.Component {
  render() {
    return (
      <div>
        <h2>Declined Requests</h2>
        <ReqsSearchForm />
        <div style={{ textAlign: 'right', margin: '10px 0px' }}>
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
        <DataTable disabled='true'/>
      </div>
    );
  }
};

export default DeclinedReqs;