import useSWR from 'swr';
import defaultHeadicon from '../../assets/defaultHeadicon.webp'
import styles from './index.module.scss'
import { IconEdit, IconPlus } from '@arco-design/web-react/icon';
import { Avatar, Button, Form, Input, Message, Modal, Progress, Upload } from '@arco-design/web-react';
import { useState } from 'react';
import FormItem from '@arco-design/web-react/es/Form/form-item';
import { updateUserInfo } from '../../api';
import { getImgPath } from '../../utils';
const Profile = () => {
    const { data: userInfo, mutate: mutateUserInfo } = useSWR('/api/user/info');
    const [visible, setVisible] = useState(false)
    const [nickname, setNickname] = useState('')
    const [intro, setIntro] = useState('')
    const [file, setFile] = useState<any>(null);
    const commit = () => {
        updateUserInfo({
            nickname,
            avatar: file.response ? file.response.data : file.name,
            introduction: intro
        }).then(d => {
            if (d.result) {
                Message.success('修改成功')
                setVisible(false)
                mutateUserInfo();
            }
        })
    }
    return (<div className={styles.page}>
        <div className={styles.pInfo}>
            <img className={styles.headicon} src={userInfo?.data?.avatar ? getImgPath(userInfo?.data?.avatar) : defaultHeadicon}></img>
            <div>
                <div className={styles.name}>{userInfo?.data?.nickname}</div>
                <div className={styles.intro}>{userInfo?.data?.introduction}</div>
            </div>
            <Button className={styles.edit} shape='circle' icon={<IconEdit />} onClick={() => {
                setFile({ url: userInfo?.data?.avatar ? getImgPath(userInfo?.data?.avatar) : '', name: userInfo?.data?.avatar })
                setNickname(userInfo?.data?.nickname)
                setIntro(userInfo?.data?.introduction)
                setVisible(true)
            }} />
        </div>
        <Modal
            title='编辑个人资料'
            visible={visible}
            onOk={commit}
            onCancel={() => setVisible(false)}
            focusLock={false}
        >
            <Form autoComplete='off'>
                <FormItem label='头像'>
                    <Upload
                        action={`${import.meta.env.VITE_APP_API}/api/common/upload`}
                        headers={{ 'Authorization': `Bearer ${localStorage.getItem('token')}` }}
                        accept="image/*"
                        fileList={file ? [file] : []}
                        showUploadList={false}
                        onChange={(fileList, file: any) => {
                            if (file.status === 'done' && file?.response?.data) {
                                setFile({ ...file, url: getImgPath(file?.response?.data) })
                            }
                        }}
                    >
                        <div>
                            {file && file.url ? (
                                <div className='arco-upload-list-item-picture custom-upload-avatar'>
                                    <img src={file.url} />
                                    <div className='arco-upload-list-item-picture-mask'>
                                        <IconEdit />
                                    </div>
                                </div>
                            ) : (
                                <div className='arco-upload-trigger-picture'>
                                    <div className='arco-upload-trigger-picture-text'>
                                        <IconPlus />
                                        <div style={{ marginTop: 10, fontWeight: 600 }}>Upload</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Upload>
                </FormItem>
                <FormItem label='昵称'>
                    <Input value={nickname} onChange={setNickname} />
                </FormItem>
                <FormItem label='一句话介绍'>
                    <Input value={intro} onChange={setIntro} />
                </FormItem>
            </Form>
        </Modal>
    </div>);
}

export default Profile;