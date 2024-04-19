import React from 'react'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input, Modal, message } from 'antd';
import api from '@services/apis'
import pictures from '@/pictures'
import { useNavigate } from 'react-router-dom';

import "./register_candidate.scss"

export default function RegisterUser() {
    const navigate = useNavigate()

    const handleRegisterCandidate = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const name = (e.target as any).name.value
            const email = (e.target as any).email.value
            const password = (e.target as any).password.value
            const confirmPassword = (e.target as any).confirmPassword.value

            //  is not emty
            if (!name || !email || !password || !confirmPassword) {
                message.warning({
                    content: 'Please fill all fields!'
                })
                return
            }

            // check type email
            if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) {
                message.error({
                    content: 'Email is not valname!'
                });
                return;
            }

            // check pass
            if (password.length < 6) {
                message.error({
                    content: 'Password must be at least 6 characters long!'
                })
                return
            }

            // check confirm pass
            if (password != confirmPassword) {
                message.error({
                    content: 'Confirm password not match!'
                })
                return
            }

            const data = {
                name,
                email,
                password
            }

            let res = await api.authenApi.registerCandidate(data)
            // Success
            if (res.status == 200) {
                Modal.success({
                    title: "Sign Up successfully",
                    content: "Please check your email for confirmation ^^",
                    onOk: () => {
                        (e.target as any).reset()
                        navigate('/login')
                    }
                })
            }
        } catch (err: any) {
            Modal.error({
                title: "Register failed!",
                content: err.response?.data?.message || "Please try again in a few minutes!"
            })
        }
    }

    return (
        <div>
            <div className='box-logo-rikkei' onClick={() => {
                window.location.href = "/"
            }}>
                <img className='Rikkei_logo' src={pictures.logo_RikkeiEduV2} alt='Rikkei_logo'></img>
            </div>
            <div className='box-login'>
                <div className='box-content'>
                    <div className='box-content-left'>
                        <form action="" onSubmit={(e) => { handleRegisterCandidate(e) }}>
                            <div className='title-rikkei'>
                                <h3>Cùng Rikkei Education xây dựng hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý tưởng</h3>
                            </div>
                            <div className='box-item-content'>
                                <label htmlFor="name">Họ tên</label><br />
                                <Input
                                    name='name'
                                    className='input-name'
                                    placeholder="Nhập họ tên"
                                />
                            </div>
                            <div className='box-item-content'>
                                <label htmlFor="emails">Email</label><br />
                                <Input
                                    name='email'
                                    className='input-emails'
                                    placeholder="abc@gmail.com"
                                />
                            </div>
                            <div className='box-item-content'>
                                <label htmlFor="passwords">Password</label><br />
                                <Input.Password
                                    name='password'
                                    className='input-passwords'
                                    placeholder="*************"
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </div>
                            <div className='box-item-content'>
                                <label htmlFor="confirm-password">Confirm password</label><br />
                                <Input.Password
                                    name='confirmPassword'
                                    className='input-confirm-password'
                                    placeholder="*************"
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </div>
                            <div className='box-button-login'>
                                <button className='button-login' type='submit'>Đăng ký</button>
                            </div>
                            <div className='box-item-forgot'>
                                <p>Quên mật khẩu?</p>
                            </div>
                            <div className='box-item-create-account'>
                                <p>Bạn đã có tài khoản?<span onClick={() => {
                                    navigate('/login')
                                }}> đăng nhập</span></p>
                            </div>
                        </form>
                    </div>
                    <div className='box-content-right'>
                        <div className='box-img-content'>
                            <img className='Rikkei_logo' src={pictures.img_content} alt='img_content'></img>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

