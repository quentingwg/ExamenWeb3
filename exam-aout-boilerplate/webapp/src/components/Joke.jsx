import { Button, Checkbox, Form, Input } from 'antd';
import { JokesContext } from 'contexts/JokesContext';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};



const Joke = () => {
    const {getJokeWithScores} = useContext(JokesContext);
    const {id}= useParams();

    const onFinish = (values,joke) => {
        const currentDate = new Date();

        console.log('Success:', values);
        console.log('id joke:',joke);
       /* addNew({
            username:"moi",
            date: currentDate.toISOString(),
            score: values.score,
            joke:joke

        })  */
      
      };

      useEffect(()=> {
        const jokeData=getJokeWithScores(id);
        console.log(jokeData)
        console.log(id); 

      },[id])
    return (
    <div> 

        <Form
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
   // onFinish={(values)=> onFinish(values,joke)}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
   
    

    <Form.Item
      label="score"
      name="score"
      rules={[
        {
          required: true,
          message: 'Please input your score !',
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
  </Form>        </div>
    
    )
}

export default Joke;