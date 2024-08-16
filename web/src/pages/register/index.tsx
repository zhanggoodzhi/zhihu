import { Button, Form, Input, Message } from "@arco-design/web-react";
const FormItem = Form.Item;
import styles from './index.module.scss'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../../api";
const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const handleRegister = async () => {
        const result = await register({
            username,
            password
        })
        if (result?.result) {
            Message.success('注册成功')
            navigate('/login')
        }
    }
    return (<div className={styles.form}>
        <Form autoComplete='off'>
            <FormItem label='用户名'>
                <Input value={username} onChange={setUsername} />
            </FormItem>
            <FormItem label='密码'>
                <Input type="password" value={password} onChange={setPassword} onPressEnter={handleRegister} />
            </FormItem>
            <FormItem wrapperCol={{ offset: 5 }}>
                <Button type='primary' onClick={handleRegister}>注册</Button>
                <Button type='text' onClick={() => { navigate('/login') }}>已有账号？去登录</Button>

            </FormItem>
        </Form>
    </div>);
}

export default Register;