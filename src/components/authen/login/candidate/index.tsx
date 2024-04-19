import React from 'react'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input, Modal, message } from 'antd';
import api from '@services/apis'
import pictures from '@/pictures'
import { useNavigate } from 'react-router-dom';

import "./candidate_login.scss"

export default function LoginUser() {
    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const email = (e.target as any).email.value
            const password = (e.target as any).password.value

            // check emty
            if (!email || !password) {
                message.warning("Please fill all fields!")
                return
            }

            // check type email
            if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) {
                message.error({
                    content: 'Email is not valname!'
                });
                return;
            }

            // data
            let data = {
                email,
                password
            }

            let result = await api.authenApi.loginCandidate(data)

            // Success
            if (result.status == 200) {
                (e.target as any).reset()
                localStorage.setItem("token", result.data.accessToken)
                localStorage.setItem("refreshToken", result.data.accessToken)
                message.success("Login successfuly! Return homepage in a few second")

                setTimeout(() => {
                    window.location.href = '/'
                }, 1000)
            }
        } catch (err: any) {
            Modal.error({
                title: "Logged in failed!",
                content: err.response?.data?.message.join(" ") || 'Please try again in a few minutes',
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
                        <form action="" onSubmit={handleLogin}>
                            <div className='title-rikkei'>
                                <h3>Cùng Rikkei Education xây dựng hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý tưởng</h3>
                            </div>
                            <div className='box-item-content'>
                                <label htmlFor="email">Email</label><br />
                                <Input
                                    name='email'
                                    className='input-email'
                                    placeholder="abc@gmail.com"
                                />
                            </div>
                            <div className='box-item-content'>
                                <label htmlFor="password">Password</label><br />
                                <Input.Password
                                    name='password'
                                    className='input-password'
                                    placeholder="*************"
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </div>
                            <div className='box-button-login'>
                                <button className='button-login' type='submit'>Đăng nhập</button>
                            </div>
                            <div className='box-item-forgot'>
                                <p>Quên mật khẩu?</p>
                            </div>
                            <div className='box-item-create-account'>
                                <p>Bạn không có tài khoản?<span onClick={() => {
                                    navigate('/register')
                                }}> Tạo 1 tài khoản</span></p>
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
