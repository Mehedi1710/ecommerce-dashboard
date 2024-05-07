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

const AddCategory = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [categoryName, setCategoryName] = useState('');

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };


  const handleCreateProduct = async() =>{
    await axios.post('http://localhost:3008/api/v1/category/create-category', { name: categoryName, description: draftToHtml(convertToRaw(editorState.getCurrentContent()))});
  };

  return (
    <div>
      <h4>Add Category</h4>
    <Input placeholder="category name" style={{width: 600}} onChange={(e)=>setCategoryName(e.target.value)}/>
    <h5>Category Description</h5>
    <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={onEditorStateChange}
        placeholder='Description'
      />
  <div style={{marginTop: 15}}>
  <Button type="primary" onClick={handleCreateProduct}>Create Category</Button>
  </div>
    </div>
  )
}

export default AddCategory