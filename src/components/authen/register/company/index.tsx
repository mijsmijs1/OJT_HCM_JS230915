import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input, Modal, Select, message } from 'antd';
import pictures from '@/pictures'
import { useNavigate } from 'react-router-dom';
import api from '@services/apis'

import "./company_register.scss"

export default function RegisterCompany() {
    const navigate = useNavigate()

    const handleRegisterCompany = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const name = (e.target as any).name.value
            const email = (e.target as any).email.value
            const password = (e.target as any).password.value
            const confirmPassword = (e.target as any).confirmPassword.value

            //  is not emty
            if (!name || !email || !password || !confirmPassword) {
                message.warning({
                    content: 'Vui lòng nhập đầy đủ thông tin!'
                })
                return
            }

            // check type email
            if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) {
                message.error({
                    content: 'Sai định dạng mail!'
                });
                return;
            }

            // check pass
            if (password.length < 6) {
                message.error({
                    content: 'Mật khẩu ít nhất 6 ký tự!'
                })
                return
            }

            // check confirm pass
            if (password != confirmPassword) {
                message.error({
                    content: 'Mật khẩu không trùng khớp!'
                })
                return
            }

            const data = {
                name,
                email,
                password
            }

            let res = await api.authenApi.registerCompany(data)
            // Success
            if (res.status == 200) {
                Modal.success({
                    title: "Sign Up successfully",
                    content: "Please check your email for confirmation ^^",
                    onOk: () => {
                        (e.target as any).reset()
                        navigate('/login-register')
                    }
                })
            }
        } catch (err: any) {
            Modal.error({
                title: "Register failed!",
                content: err.response.data.message || "Please try again in a few minutes!"
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
                                <label htmlFor="email">Email</label><br />
                                <Input
                                    className='input-email-company'
                                    placeholder="Nhập email (vd: abc@gmail.com)"
                                    autoFocus
                                />
                            </div>
                            <div className='box-item-content-company'>
                                <label htmlFor="password">Password</label><br />
                                <Input.Password
                                    name = 'password'
                                    className='input-password-company'
                                    placeholder="Nhập mật khẩu"
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </div>
                            <div className='box-item-content-company'>
                                <label htmlFor="password">Confirm password</label><br />
                                <Input.Password
                                    className='input-confirm-password-company'
                                    placeholder="Xác nhận mật khẩu"
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
                <p>Đã có tài khoản?<span onClick={() => {
                    navigate('/login-company');
                }}> Đăng nhập ngay</span></p>
            </div>
        </div>
    )
}
