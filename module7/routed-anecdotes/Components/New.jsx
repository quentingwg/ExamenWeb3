import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Flex, Form } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React from "react";

const CreateNew = (props) => {
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [info, setInfo] = useState("");
  const message = "tu as bien affiche le message ";
  const onFinish = (values) => {
    console.log("Success:", values.content);
    props.addNew({
       ...values,
        votes: 0,
      });

  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };



  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
    >
      <Form.Item
        label="content"
        name="content"
        rules={[
          {
            required: true,
            message: "Please input your content!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <div>
        <Form.Item
          label="author"
          name="author"
          rules={[
            {
              required: true,
              message: "Please input your creator!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="info" name="info">
          <Input />
        </Form.Item>
      </div>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>

      <Button type="primary" htmlType="submit">
        create
      </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateNew;
