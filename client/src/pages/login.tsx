import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { firebaseAuth } from '@/utils/FirebaseConfig';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const login = () => {
  const onFinish = (values) => {
    console.log('values', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName: name, email, photoURL: profileImage },
    } = await signInWithPopup(firebaseAuth, provider);
    try {
      if (email) {
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white h-screen w-screen text-base flex flex-row">
      <div className="flex m-auto mt-[200px]">
        <div className="bg-white p-10 rounded-lg w-[700px] relative shadow-shadow8">
          <h2 className="uppercase text-center font-bold text-3xl text-primary drop-shadow-lg mb-10">
            login
          </h2>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item<FieldType> wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="link" className="loginByGG" onClick={handleLoginWithGoogle}>
                <FcGoogle className="text-2xl" />
                <span className="text-white text-base">Login width Google</span>
              </Button>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit" className="button">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default login;
