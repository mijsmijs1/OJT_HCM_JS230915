import React, { useState } from 'react'
import "./registeruser.scss"
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import pictures from '@/pictures'

export default function registerUser() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    return (
        <div>
            <div className='box-logo-rikkei'>
                <img className='Rikkei_logo' src={pictures.logo_RikkeiEduV2} alt='Rikkei_logo'></img>
            </div>
            <div className='box-login'>
                <div className='box-content'>
                    <div className='box-content-left'>
                        <form action="">
                            <div className='title-rikkei'>
                                <h3>Cùng Rikkei Education xây dựng hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý tưởng</h3>
                            </div>
                            <div className='box-item-content'>
                                <label htmlFor="name">Họ tên</label><br />
                                <Input
                                    className='input-name'
                                    placeholder="Nhập họ tên"
                                />
                            </div>
                            <div className='box-item-content'>
                                <label htmlFor="emails">Email</label><br />
                                <Input
                                    className='input-emails'
                                    placeholder="abc@gmail.com"
                                />
                            </div>
                            <div className='box-item-content'>
                                <label htmlFor="passwords">Password</label><br />
                                <Input.Password
                                    className='input-passwords'
                                    placeholder="*************"
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </div>
                            <div className='box-item-content'>
                                <label htmlFor="confirm-password">Confirm password</label><br />
                                <Input.Password
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
                                <p>Bạn đã có tài khoản?<span> đăng nhập</span></p>
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

