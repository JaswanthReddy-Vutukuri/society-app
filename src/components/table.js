import React from 'react';
import { Table, Modal, Divider, Button } from 'antd';
import RequestInfoDetails from './request-info';
import ReqApprove from './request-approve';
import ReqDecline from './request-decline';

let data = [{ "key": 0, "ID": 86, "LastName": "manoj", "FirstName": "sai ", "District": 18, "Mandal": 791, "Village": 5307, "Gender": "Male", "age": "23", "MobileNumber": "9738009468", "Gmail": "manoj.sai1994@gmail.com", "Address": "sdf", "SelectIssuecategory": "Water", "PersonalBenifit": "Personal", "Estimatedbudget": "32423", "Description": "dfsgfg", "isActive": 1, "Createdby": "sai ", "CreatedDate": "2019-06-14T09:53:18.703", "ModifiedDate": "1900-01-01T00:00:00", "EmployeeStatus": "Approve", "Emp_Rating": 2.500000000000000e+001, "Constituency": 222 },
{ "key": 1, "ID": 87, "LastName": "babu", "FirstName": "venu", "District": 18, "Mandal": 779, "Village": 5165, "Gender": "Male", "age": "25", "MobileNumber": "9848556623", "Gmail": "venu@gmail.com", "Address": "ongole", "SelectIssuecategory": "Road", "PersonalBenifit": "people", "HowManyPepoleBenifited": "25", "Estimatedbudget": "6598", "Description": "This test", "isActive": 1, "Createdby": "venu", "CreatedDate": "2019-06-14T10:52:55.417", "ModifiedDate": "1900-01-01T00:00:00", "EmployeeStatus": "Decline", "Emp_Rating": 1.000000000000000e+001, "Constituency": 222 },
{ "key": 2, "ID": 88, "LastName": "yelaturi", "FirstName": "Venubabu", "District": 18, "Mandal": 816, "Village": 5880, "Gender": "Male", "age": "25", "MobileNumber": "9848556626", "Gmail": "venubabu@gmail.com", "Address": "ongole", "SelectIssuecategory": "Water", "PersonalBenifit": "people", "HowManyPepoleBenifited": "25", "Estimatedbudget": "2658", "Description": "this isthe bhe", "isActive": 1, "Createdby": "Venubabu", "CreatedDate": "2019-06-16T00:31:05.113", "ModifiedDate": "1900-01-01T00:00:00", "EmployeeStatus": "Approve", "Emp_Rating": 1.650000000000000e+001, "Constituency": 227 },
{ "key": 3, "ID": 89, "LastName": "manoj", "FirstName": "dfsgf", "District": 18, "Mandal": 791, "Village": 5307, "Gender": "Male", "age": "23", "MobileNumber": "9738009468", "Gmail": "fgsdk@dfs.com", "Address": "dfsg", "PersonalBenifit": "Personal", "Estimatedbudget": "234534", "Description": "sdfg", "isActive": 1, "Createdby": "dfsgf", "CreatedDate": "2019-06-20T09:44:05.210", "ModifiedDate": "1900-01-01T00:00:00", "EmployeeStatus": "Approve", "Emp_Rating": 2.500000000000000e+001, "Constituency": 222, "InchargeStatus": "Approve", "Incharge_Rating": "25" },
{ "key": 4, "ID": 90, "LastName": "sai manoj", "FirstName": "dfsgf", "District": 18, "Mandal": 791, "Village": 5307, "Gender": "Male", "age": "23", "MobileNumber": "9738009468", "Gmail": "fgsdk@dfs.com", "Address": "sdfg", "PersonalBenifit": "Personal", "Estimatedbudget": "2345", "Description": "zxvx", "isActive": 1, "Createdby": "dfsgf", "CreatedDate": "2019-06-20T09:48:13.027", "ModifiedDate": "1900-01-01T00:00:00", "EmployeeStatus": "Approve", "Emp_Rating": 2.500000000000000e+001, "Constituency": 222 },
{ "key": 5, "ID": 91, "LastName": "sai manoj", "FirstName": "dfsgf", "District": 18, "Mandal": 791, "Village": 5307, "Gender": "Male", "age": "23", "MobileNumber": "9738009468", "Gmail": "fgsdk@dfs.com", "Address": "sdfg", "PersonalBenifit": "Personal", "Estimatedbudget": "2345", "Description": "zxvx", "isActive": 1, "Createdby": "dfsgf", "CreatedDate": "2019-06-20T09:48:41.447", "ModifiedDate": "1900-01-01T00:00:00", "EmployeeStatus": "Approve", "Emp_Rating": 1.900000000000000e+001, "Constituency": 222 },
{ "key": 6, "ID": 92, "LastName": "Reddy", "FirstName": "sai charan", "District": 18, "Mandal": 814, "Village": 5850, "Gender": "Male", "age": "24", "MobileNumber": "9848552512", "Gmail": "saicharan@gmail.com", "Address": "ongole", "PersonalBenifit": "people", "HowManyPepoleBenifited": "45", "Estimatedbudget": "45489", "Description": "Road issue in my village", "isActive": 1, "Createdby": "sai charan", "CreatedDate": "2019-06-20T10:13:35.147", "ModifiedDate": "1900-01-01T00:00:00", "EmployeeStatus": "Approve", "Emp_Rating": 1.700000000000000e+001, "Constituency": 229, "InchargeStatus": "Decline", "Incharge_Rating": "12.5" },
{ "key": 7, "ID": 93, "LastName": "manoj", "FirstName": "dfsgf", "District": 18, "Mandal": 793, "Village": 5211, "Gender": "Male", "age": "23", "MobileNumber": "9738009468", "Gmail": "fgsdk@dfs.com", "Address": "dsafasdf", "PersonalBenifit": "Personal", "Estimatedbudget": "343", "Description": "asdfasd", "isActive": 1, "Createdby": "dfsgf", "CreatedDate": "2019-06-21T21:35:57.543", "ModifiedDate": "1900-01-01T00:00:00", "EmployeeStatus": "Approve", "Emp_Rating": 1.900000000000000e+001, "Constituency": 231, "InchargeStatus": "Approve", "Incharge_Rating": "19" },
{ "key": 8, "ID": 95, "LastName": "manoj", "FirstName": "asdf", "District": 18, "Mandal": 791, "Village": 5307, "Gender": "Male", "age": "23", "MobileNumber": "9738009468", "Gmail": "fgsdk@dfs.com", "Address": "asdfsf", "PersonalBenifit": "Personal", "Estimatedbudget": "3412", "Description": "adf", "isActive": 1, "Createdby": "asdf", "CreatedDate": "2019-06-22T06:37:14.203", "ModifiedDate": "1900-01-01T00:00:00", "EmployeeStatus": "Approve", "Emp_Rating": 2.200000000000000e+001, "Constituency": 222 },
{ "key": 9, "ID": 96, "LastName": "manoj", "FirstName": "dfsgf", "District": 18, "Mandal": 791, "Village": 5307, "Gender": "Male", "age": "23", "MobileNumber": "9738009468", "Gmail": "fgsdk@dfs.com", "Address": "sfg", "PersonalBenifit": "Personal", "Estimatedbudget": "343", "Description": "afd", "isActive": 1, "Createdby": "dfsgf", "CreatedDate": "2019-06-22T07:08:03.927", "ModifiedDate": "1900-01-01T00:00:00", "EmployeeStatus": "Decline", "Emp_Rating": 1.350000000000000e+001, "Constituency": 222 },
{ "key": 10, "ID": 97, "LastName": "jhvjhbk", "FirstName": "wAESDFG", "District": 18, "Mandal": 808, "Village": 5678, "Gender": "Male", "age": "21", "MobileNumber": "9848556625", "Gmail": "test@gmail.com", "Address": "fhjkk", "PersonalBenifit": "Personal", "Estimatedbudget": "1234354", "Description": "asddghghgh", "isActive": 1, "Createdby": "wAESDFG", "CreatedDate": "2019-06-22T07:13:45.167", "ModifiedDate": "1900-01-01T00:00:00", "EmployeeStatus": "Approve", "Emp_Rating": 1.600000000000000e+001, "Constituency": 231, "InchargeStatus": "Approve", "Incharge_Rating": "16" },
{ "key": 11, "ID": 98, "LastName": "vfgf", "FirstName": "rfgtrg", "District": 18, "Mandal": 794, "Village": 5698, "Gender": "Male", "age": "25", "MobileNumber": "9584582668", "Gmail": "Ramarao@gmail.com", "Address": "cdjkfj", "PersonalBenifit": "people", "HowManyPepoleBenifited": "26", "Estimatedbudget": "121", "Description": "efer", "isActive": 1, "Createdby": "rfgtrg", "CreatedDate": "2019-06-22T10:05:09.150", "ModifiedDate": "1900-01-01T00:00:00", "EmployeeStatus": "Approve", "Emp_Rating": 2.500000000000000e+001, "Constituency": 231 },
{ "key": 12, "ID": 99, "LastName": "yelchuri", "FirstName": "manoj", "District": 18, "Mandal": 792, "Village": 5226, "Gender": "Male", "age": "23", "MobileNumber": "9738009468", "Gmail": "kdfsg@gs.vom", "Address": "sds", "PersonalBenifit": "Personal", "Estimatedbudget": "32", "Description": "qwer", "isActive": 1, "Createdby": "manoj", "CreatedDate": "2019-06-22T21:22:20.337", "ModifiedDate": "1900-01-01T00:00:00", "EmployeeStatus": "Decline", "Emp_Rating": 1.400000000000000e+001, "Constituency": 230 },
{ "key": 13, "ID": 100, "LastName": "gtrg", "FirstName": "frfe", "District": 18, "Mandal": 810, "Village": 5731, "Gender": "Male", "age": "25", "MobileNumber": "9845825858", "Gmail": "test@gmail.com", "Address": "vjhfh", "PersonalBenifit": "Personal", "Estimatedbudget": "25688", "Description": "fvtrgrg", "isActive": 1, "Createdby": "frfe", "CreatedDate": "2019-06-22T21:35:50.910", "ModifiedDate": "1900-01-01T00:00:00", "EmployeeStatus": "Approve", "Emp_Rating": 1.800000000000000e+001, "Constituency": 231, "InchargeStatus": "Decline", "Incharge_Rating": "14.5" },
{ "key": 14, "ID": 101, "LastName": "vdfv", "FirstName": "vfdv", "District": 18, "Mandal": 806, "Village": 5619, "Gender": "FeMale", "age": "25", "MobileNumber": "9640475878", "Gmail": "test@gmail.com", "Address": "dfvf", "PersonalBenifit": "people", "HowManyPepoleBenifited": "25", "Estimatedbudget": "1489", "Description": "vfdvf", "isActive": 1, "Createdby": "vfdv", "CreatedDate": "2019-06-22T21:37:22.753", "ModifiedDate": "1900-01-01T00:00:00", "EmployeeStatus": "Approve", "Emp_Rating": 1.950000000000000e+001, "Constituency": 229 },
{ "key": 15, "ID": 119, "LastName": "jbkj", "FirstName": "nmdebf", "District": 18, "Mandal": 822, "Village": 5774, "Gender": "Male", "age": "25", "MobileNumber": "9848556623", "Gmail": "hgerjg@gmail.com", "Address": "vcegrf", "PersonalBenifit": "people", "HowManyPepoleBenifited": "58", "Estimatedbudget": "254", "Description": "bcjhe", "isActive": 1, "Createdby": "nmdebf", "CreatedDate": "2019-06-28T09:38:57.550", "ModifiedDate": "1900-01-01T00:00:00", "Constituency": 232 },
{ "key": 16, "ID": 120, "LastName": "vfgr", "FirstName": "regrfre", "District": 18, "Mandal": 822, "Village": 5774, "Gender": "Male", "age": "26", "MobileNumber": "9848555662", "Gmail": "hveg@gmail.com", "Address": "hbcjevh", "PersonalBenifit": "people", "HowManyPepoleBenifited": "124", "Estimatedbudget": "1548", "Description": "vnbfbdjvrh", "isActive": 1, "Createdby": "regrfre", "CreatedDate": "2019-06-29T04:33:31.400", "ModifiedDate": "1900-01-01T00:00:00", "EmployeeStatus": "Approve", "Emp_Rating": 1.850000000000000e+001, "Constituency": 232 },
{ "key": 17, "ID": 121, "LastName": "vjhv", "FirstName": "nagarjunan", "District": 18, "Mandal": 790, "Village": 5340, "Gender": "Male", "age": "25", "MobileNumber": "9848556623", "Gmail": "test@gmail.com", "Address": "jfrehfve", "PersonalBenifit": "Personal", "Estimatedbudget": "256", "Description": "ncejkrh", "isActive": 1, "Createdby": "nagarjunan", "CreatedDate": "2019-06-29T04:38:16.277", "ModifiedDate": "1900-01-01T00:00:00", "EmployeeStatus": "Approve", "Emp_Rating": 1.750000000000000e+001, "Constituency": 222, "InchargeStatus": "Approve", "Incharge_Rating": "17.5" },
{ "key": 18, "ID": 122, "LastName": "YELCHURI", "FirstName": "manoj", "District": 18, "Mandal": 779, "Village": 5152, "Gender": "Male", "age": "24", "MobileNumber": "9738009468", "Gmail": "kdfsg@gs.vom", "Address": "sdfgh", "PersonalBenifit": "Personal", "Estimatedbudget": "3456", "Description": "dfghj", "isActive": 1, "Createdby": "manoj", "CreatedDate": "2019-06-29T09:11:55.673", "ModifiedDate": "1900-01-01T00:00:00", "Constituency": 222 },
{ "key": 19, "ID": 123, "LastName": "manoj", "FirstName": "asdf", "District": 18, "Mandal": 813, "Village": 5629, "Gender": "Male", "age": "23", "MobileNumber": "9738009468", "Gmail": "fgsdk@dfs.com", "Address": "dfg", "PersonalBenifit": "Personal", "Estimatedbudget": "fgh", "Description": "rdfgh", "isActive": 1, "Createdby": "asdf", "CreatedDate": "2019-06-29T09:13:16.053", "ModifiedDate": "1900-01-01T00:00:00", "Constituency": 232 },
{ "key": 20, "ID": 124, "LastName": "manoj", "FirstName": "dfsgf", "District": 18, "Mandal": 794, "Village": 5700, "Gender": "Male", "age": "23", "MobileNumber": "9738009468", "Gmail": "fgsdk@dfs.com", "Address": "dgghh", "PersonalBenifit": "Personal", "Estimatedbudget": "3412", "Description": "dfgh", "isActive": 1, "Createdby": "dfsgf", "CreatedDate": "2019-06-29T09:14:46.867", "ModifiedDate": "1900-01-01T00:00:00", "Constituency": 231 }]

class DataTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showRequestInfo: false,
      showRequestApprove: false,
      showRequestDecline: false,
      columns:[]
    }
  }
  disabledStatus = (this.props.disabled == 'true');
  columns = [
    {
      title: 'Ticket No.',
      width: 100,
      dataIndex: 'ID',
      key: 'ID',
      render: (ID) => (
        <span>{'REQ-' + ID}</span>
      ),
      fixed: 'left',
    },
    {
      title: 'Category',
      width: 100,
      dataIndex: 'SelectIssuecategory',
      key: 'SelectIssuecategory',
    },
    {
      title: 'Benefits',
      dataIndex: 'PersonalBenifit',
      key: 'PersonalBenifit',
      width: 150,
    },
    {
      title: 'Description',
      dataIndex: 'Description',
      key: 'Description',
      width: 150,
    },
    {
      title: 'Budget',
      dataIndex: 'Estimatedbudget',
      key: 'Estimatedbudget',
      width: 150,
    },
    {
      title: 'Created By',
      dataIndex: 'Createdby',
      key: 'Createdby',
      width: 150,
    },
    {
      title: 'Constituency',
      dataIndex: 'Constituency',
      key: 'Constituency',
      width: 100,
    },
    {
      title: 'Created Date',
      dataIndex: 'CreatedDate',
      key: 'CreatedDate',
      width: 200,
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 300,
      render: () => (
        <span>
          <Button type="link" style={{ color: 'blue'}} onClick={()=>{ this.showReqInfoModal()}}> View </Button>
          <Divider type="vertical" />
          <Button type="link" style={{ color: 'green'}} disabled={this.disabledStatus} onClick={()=>{ this.showReqApproveModal()}}> Approve </Button>
          <Divider type="vertical" />
          <Button type="link" style={{ color: 'brown'}} disabled={this.disabledStatus} onClick={()=>{ this.showReqDeclineModal()}}> Decline </Button>
        </span>
      )
    }
  ];
  
  showReqInfoModal = () => {
    this.setState({
      showRequestInfo: true,
    });
  };
  showReqApproveModal = () => {
    this.setState({
      showRequestApprove: true,
    });
  };
  showReqDeclineModal = () => {
    this.setState({
      showRequestDecline: true,
    });
  };

  handleOk = e => {
    this.setState({
      showRequestInfo: false,
      showRequestApprove: false,
      showRequestDecline: false,
    });
  };

  handleCancel = e => {
    this.setState({
      showRequestInfo: false,
      showRequestApprove: false,
      showRequestDecline: false,
    });
  };

  render() {
    return (
      <React.Fragment>
        <Table columns={this.columns} dataSource={data} scroll={{ x: 1500, y: 300 }} />
        <Modal
          title="Request Ticket : REQ 009"
          visible={this.state.showRequestInfo}
          footer={null}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <RequestInfoDetails />
        </Modal>
        <Modal
          title="Request Ticket : REQ 009"
          visible={this.state.showRequestApprove}
          footer={null}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <ReqApprove />
        </Modal>
        <Modal
          title="Request Ticket : REQ 009"
          visible={this.state.showRequestDecline}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <ReqDecline />
        </Modal>
      </React.Fragment>
    );
  }
};

export default DataTable;