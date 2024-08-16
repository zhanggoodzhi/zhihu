import { Button, Form, Input, Message } from "@arco-design/web-react";
const FormItem = Form.Item;
import styles from './index.module.scss'
import { useNavigate } from "react-router-dom";
import { sigin } from "../../api";
import { useState } from "react";

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const login = async () => {
        const result = await sigin({
            username,
            password
        })
        if (result?.result) {
            Message.success('登录成功')
            localStorage.setItem('token', result.data.access_token)
            navigate('/')
        }
    }
    return (<div className={styles.form}>
        <Form autoComplete='off'>
            <FormItem label='用户名'>
                <Input value={username} onChange={setUsername} />
            </FormItem>
            <FormItem label='密码'>
                <Input type="password" value={password} onChange={setPassword} onPressEnter={login} />
            </FormItem>
            <FormItem wrapperCol={{ offset: 5 }}>
                <Button type='primary' onClick={login}>登录</Button>
                <Button type='text' onClick={() => { navigate('/register') }}>没有账号？去注册</Button>
            </FormItem>
        </Form>
    </div>);
}

export default Login;