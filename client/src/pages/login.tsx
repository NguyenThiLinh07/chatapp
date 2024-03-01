import React, { useEffect } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { firebaseAuth } from '@/utils/FirebaseConfig';
import { authApi } from '@/api/authApi';
import { useRouter } from 'next/navigation';
import { useStateProvider } from '@/context/StateContext';
import { reducerCases } from '@/context/constants';
import { IndexedObject } from '@/types/common';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const Login: React.FC = () => {
  const router = useRouter();
  // @ts-ignore
  const [{ userInfo, newUser }, dispatch] = useStateProvider();
  const onFinish = (values) => {
    console.log('values', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (userInfo?.id && !newUser) return router.push('/');
  }, [userInfo, newUser]);

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName: name, email, photoURL: image },
    } = await signInWithPopup(firebaseAuth, provider);
    try {
      if (email) {
        const response: IndexedObject = await authApi.checkUser(email);
        if (!(response.data as any)?.status) {
          dispatch({
            type: reducerCases.SET_NEW_USER,
            newUser: true,
          });
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              name,
              email,
              image,
              status: '',
            },
          });
          router.push('/onboarding');
        } else {
          const { id, name, email, profilePicture: image, status } = response.data.data;
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              id,
              name,
              email,
              image,
              status,
            },
          });
          router.push('/');
        }
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
              rules={[
                {
                  required: true,
                  message: "Please input your password! It's all numbers",
                  pattern: new RegExp(/^[0-9]+$/),
                },
              ]}
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

export default Login;
