import React, { useState } from 'react'
import "./registercompany.scss"
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input, Space, Select, Form } from 'antd';
import pictures from '@/pictures'
export default function RegisterCompany() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    return (
        <div>
            <div className='box-logo-rikkei'>
                <img className='Rikkei_logo' src={pictures.logo_RikkeiEduV2} alt='Rikkei_logo'></img>
            </div>
            <div className='box-register-company'>
                <div className='box-content-company'>
                    <div className='box-register-content-left-company'>
                        <form action="">
                            <div className='title-rikkei-company'>
                                <h3>Cùng Rikkei Education tiếp cận nguồn nhân lực chất lượng cao</h3>
                            </div>
                            <div className='info-content-account'>
                                <h3>Thông tin tài khoản</h3>
                            </div>
                            <div className='box-item-content-company'>
                                <label htmlFor="input-name">Họ tên</label><br />
                                <Input
                                    className='input-name-company'
                                    placeholder="Nhập họ tên"
                                />
                            </div>
                            <div className='box-item-content-company'>
                                <label htmlFor="email">Email</label><br />
                                <Input
                                    className='input-email-company'
                                    placeholder="abc@gmail.com"
                                />
                            </div>
                            <div className='box-item-content-company'>
                                <label htmlFor="password">Password</label><br />
                                <Input.Password
                                    className='input-password-company'
                                    placeholder="*************"
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </div>
                            <div className='box-item-content-company'>
                                <label htmlFor="password">Confirm password</label><br />
                                <Input.Password
                                    className='input-confirm-password-company'
                                    placeholder="*************"
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </div>
                        </form>
                    </div>
                    <div className='box-content-right-company'>
                        <form action="">

                            <div className='info-content-company'>
                                <h3>Thông tin doanh nghiệp</h3>
                            </div>
                            <div className='box-item-content-company'>
                                <label htmlFor="company">Công ty</label><br />
                                <Input
                                    type='text'
                                    className='input-company'
                                    placeholder="Tên công ty"
                                />
                            </div>
                            <div className='box-item-content-company'>
                                <label htmlFor="city">Địa điểm làm việc</label><br />
                                <Select className='select-city' placeholder="Chọn tỉnh/thành phố">
                                    <Select.Option value="demo">Địa điểm làm việc</Select.Option>
                                </Select>

                            </div>
                            <div className='box-item-content-company'>
                                <label htmlFor="phonenumber">Số điện thoại liên hệ</label><br />
                                <Input
                                    type='text'
                                    className='input-phonenumber'
                                    placeholder="012345678"
                                />
                            </div>
                            <div className='box-item-content-company'>
                                <label htmlFor="password">Email công ty</label><br />
                                <Input
                                    type='email'
                                    className='input-email-company'
                                    placeholder="abc@gmail.com"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className='box-button-register-company'>
                <button className='button-register-company'>Đăng ký</button>
            </div>
            <div className='box-item-have-account'>
                <p>Đã có tài khoản?<span> Đăng nhập ngay</span></p>
            </div>
        </div>
    )
}
