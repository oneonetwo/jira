import { useAuth } from "context/auth-context";
import { FormEvent, useEffect } from "react"
import { Button, Form, Input } from 'antd';

const apiUrl = process.env.REACT_APP_API_URL;
export const RegisterScreen = () => {
    const { register, user } = useAuth();
    // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     const username = (event.currentTarget.elements[0] as HTMLInputElement).value;
    //     const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
    //     login({ username, password });
    // }
    const handleSubmit = (values: {username:string, password: string})=>{
        register(values);
    }

    return <Form onFinish={handleSubmit}>
        <Form.Item name={'username'} rules={[{required:true, message:'请输入用户名'}]}>
            <Input placeholder={'用户名'}   type="text" id={"username"} />
        </Form.Item>
        <Form.Item name={'password'} rules={[{required: true, message: '请出入密码'}]}>
            <Input placeholder={'密码'} type="password" id={"password"} />
        </Form.Item>
        <Form.Item>
            <Button htmlType={"submit"} type={'primary'}>登录</Button>
        </Form.Item>
    </Form>
}