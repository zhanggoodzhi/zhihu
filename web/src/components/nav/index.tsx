import { Button, Dropdown, Input, Menu } from "@arco-design/web-react";
import { useEffect } from "react";
import styles from './index.module.scss'
import defaultHeadicon from '../../assets/defaultHeadicon.webp'
import { redirect, useNavigate } from "react-router-dom";
import cx from 'classnames'
import useSWR from "swr";
import { getImgPath } from "../../utils";
const Nav = () => {
    const navigate = useNavigate();
    const { data: userInfo, mutate: mutateUserInfo } = useSWR('/api/user/info');

    const dropList = (
        <Menu>
            <Menu.Item key='1' onClick={() => { navigate('/profile') }}>我的主页</Menu.Item>
            <Menu.Item key='2' onClick={() => {
                navigate('/login')
                localStorage.removeItem('token')
            }}>退出</Menu.Item>
        </Menu>
    );
    return (
        <div className={styles.header}>
            <Button className={styles.btn} type="primary" onClick={() => navigate('/')}>首页</Button>
            <Button className={styles.btn} type="primary">等你来答</Button>
            <Input className={styles.input} allowClear placeholder='搜索' />
            <Button className={styles.btn} type="primary">提问</Button>
            <Dropdown droplist={dropList} trigger='click'>
                <img className={cx(styles.headicon, 'hover-item')} src={userInfo?.data?.avatar ? getImgPath(userInfo?.data?.avatar) : defaultHeadicon}></img>
            </Dropdown>
        </div>
    );
}

export default Nav;