import React from 'react';
import { Table, Divider, Button } from 'antd';
import { userService } from '../services';

class ShowUsers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users : []
    }
  }

  componentWillMount() {
    userService.getUsers()
      .then(
        users => {
          this.setState({users:users});
        },
        error => {
          console.log("Error while fetching Users:", error);
        }
      );
  }

  editUser = (id) => {
    console.log("EDIT:",id)
  }

  deleteUser = (id) => {
    console.log("DELETE:",id)
  }

  columns = [
    {
      title: 'User ID',
      width: 200,
      dataIndex: 'UserId',
      key: 'UserId'
    },
    {
      title: 'First Name',
      dataIndex: 'FirstName',
      key: 'FirstName',
      width: 120,
    },
    {
      title: 'Last Name',
      dataIndex: 'LastName',
      key: 'LastName',
      width: 150,
    },
    {
      title: 'User Name',
      dataIndex: 'Username',
      key: 'Username',
      width: 150,
    },
    {
      title: 'Role',
      dataIndex: 'Role',
      key: 'Role',
      width: 150,
      render: Role => (
      <span>{Role.RoleName}</span> )
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <span>
          <Button type="link" style={{ color: 'blue'}} onClick={()=>{ this.editUser(record.UserId)}}> EDIT </Button>
          <Divider type="vertical" />
          <Button type="link" style={{ color: 'brown'}} onClick={()=>{ this.deleteUser(record.UserId)}}> DELETE </Button>
        </span>
      )
    }
  ];

  render() {
    return (
      <React.Fragment>
        <Table 
        columns={this.columns} 
        dataSource={this.state.users} 
        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '15', '20', '30']}} />
      </React.Fragment>
    );
  }
};

export default ShowUsers;