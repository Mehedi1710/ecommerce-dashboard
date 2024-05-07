import { Button, Input, Select } from 'antd';
import '../../index.css'
import React, { useEffect, useState } from 'react'
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import 'draft-js/dist/Draft.css';
import axios from 'axios';

const AddProduct = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [productName, setProductName] = useState('');
  const [storeName, setStoreName] = useState('');
  const [storeData, setStoreData] = useState([]);

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };


  useEffect(()=>{
    async function getAllStore() {

      const data = await axios.get('http://localhost:3008/api/v1/store/findStore');
      const arr = [];
      data.data.map((item) => {
        arr.push({
          value: item._id,
          label: item.storeName
        })
      });
      setStoreData(arr)
    }
    getAllStore();
  }, []);

  const handleCreateProduct = async() =>{
    await axios.post('http://localhost:3008/api/v1/product/createProduct', { name: productName, description: draftToHtml(convertToRaw(editorState.getCurrentContent())), store: storeName });
  };

  return (
    <>
    <h4>Add Product</h4>
    <Input placeholder="product name" style={{width: 600}} onChange={(e)=>setProductName(e.target.value)}/>
    <h5>Product Description</h5>
    <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={onEditorStateChange}
        placeholder='Description'
      />
      <h5>Store Name</h5>
      <Select
    style={{
      width: 200,
    }}
    onChange={(e)=>setStoreName(e)}
    options={storeData}
  />
  <div style={{marginTop: 15}}>
  <Button type="primary" onClick={handleCreateProduct}>Create Product</Button>
  </div>
    </>
  )
}

export default AddProduct