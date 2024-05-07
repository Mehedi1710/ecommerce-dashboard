import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'



const columns = [
  {
    title: 'Name',
    dataIndex: 'firstname',
    key: 'firstname',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Address',
    dataIndex: 'city',
    key: 'city',
  },
];


const Merchant = () => {
  const [user, setUser] = useState([]);

  useEffect(()=>{
    const myFunc = async() => {
      const data = await axios.get('http://localhost:3008/api/v1/users/allUsers');
      setUser(data.data);
    };
    myFunc();
  },[])

  
  return (
    <Table dataSource={user} columns={columns} />
  )
}

export default Merchant