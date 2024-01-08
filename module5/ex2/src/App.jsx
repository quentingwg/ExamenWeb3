import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useContext } from "react";
import { Context } from "./contexts/opinionContext";
import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';

function App() {
  const [form] = Form.useForm(); 
  const { opinions, setOpinions,setVotesOpinion } = useContext(Context);
  const sortedOpinions= opinions.sort((a,b)=> b.votes- a.votes)
  const onFinish = (values) => {
    
    console.log('Success:', values);
    const newOpinion= ({
      id: opinions.length+1,
      content: values.content,
      votes:100
    })
    console.log("id nouvelle opinion ; " , newOpinion.id)
    setOpinions(opinions.concat(newOpinion))
    form.resetFields();
  };

  
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div>
      <p> Hello</p>

      {sortedOpinions.map((opinion) => (
        <p> {opinion.content}  {opinion.votes} <button onClick={()=> {setVotesOpinion(opinion.id)}}> voter</button></p> 
        
      ))}


<Form
    form={form} 
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="content"
      name="content"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
    </div>
  );
}

export default App;
