import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'




const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'isActive',
    dataIndex: 'isActive',
    key: 'isActive',
    render: (_, record) => record.isActive ? "true" : "false"
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
];


const AllSubCategory = () => {
  const [category, setCategory] = useState([]);
  useEffect(()=>{
    const myFunc = async() => {
      const data= await axios.get('http://localhost:3008/api/v1/category/getSubCategory')
      setCategory(data.data)
    }
    myFunc();
  },[])
  return (
    <Table dataSource={category} columns={columns} />
  )
}

export default AllSubCategory