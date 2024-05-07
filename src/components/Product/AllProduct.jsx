import { Button, Space, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'


  const handleDelete = async(item) =>{
    await axios.post('http://localhost:3008/api/v1/product/deleteProduct', {id: item._id})
  }
  const columns = [
    {
      title: 'Serial No',
      dataIndex: 'index',
      key: 'index',
      render: (_, record, index) => `${index + 1}`
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
    },
    {
      title: 'Store Id',
      dataIndex: 'store',
      key: 'store',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Button type="primary" danger onClick={()=>handleDelete(record)}>Delete</Button>
        ),
      },
  ];


const AllProduct = () => {
    const [product, setProduct] = useState([]);

    useEffect(()=>{
        async function myFunc() {
            const result = await axios.get('http://localhost:3008/api/v1/product/findProduct');
            setProduct(result.data);
        }
        myFunc();
    },[]);
  return (
    <Table dataSource={product} columns={columns} />
  )
}

export default AllProduct