import React, { useState } from 'react'
import "./logincompany.scss"
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import pictures from '@/pictures'
export default function LoginCompany() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    return (
        <div>
            <div className='box-logo-rikkei'>
                <img className='Rikkei_logo' src={pictures.logo_RikkeiEduV2} alt='Rikkei_logo'></img>
            </div>
            <div className='box-login-company'>
                <div className='box-content-company'>
                    <div className='box-content-left-company'>
                        <form action="">
                            <div className='title-rikkei-company'>
                                <h3>Cùng Rikkei Education tiếp cận nguồn nhân lực chất lượng cao</h3>
                            </div>
                            <div className='box-item-content-company'>
                                <label htmlFor="email">Email</label><br />
                                <Input
                                    className='input-email'
                                    placeholder="abc@gmail.com"
                                />
                            </div>
                            <div className='box-item-content-company'>
                                <label htmlFor="password">Password</label><br />
                                <Input.Password
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
                                <p>Bạn không có tài khoản?<span> Tạo 1 tài khoản</span></p>
                            </div>
                        </form>
                    </div>
                    <div className='box-content-right'>
                        <div className='box-img-content'>
                            <img className='Rikkei_logo' src={pictures.img_company_content} alt='img_content'></img>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}