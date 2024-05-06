import React, { useState } from 'react'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input, Modal, message } from 'antd';
import apis from '@services/apis'
import pictures from '@/pictures'
import { useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import BtnLoading from '@/components/BtnLoading';
import { isValidEmail } from "@/utils/common/validate_form";

import "./register_candidate.scss"

export default function RegisterCandidate() {
    const navigate = useNavigate()
    const [load, setLoad] = useState<boolean>(false)

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
                    content: 'Vui lòng nhập đầy đủ thông tin!'
                })
                return
            }
            // check type email
            if (!isValidEmail(email)) {
                message.warning({
                    content: 'Sai định dạng mail!'
                })
                return
            }
            // check pass
            if (password.length < 6) {
                message.warning({
                    content: 'Mật khẩu ít nhất 6 ký tự!'
                })
                return
            }
            // check confirm pass
            if (password != confirmPassword) {
                message.warning({
                    content: 'Mật khẩu không trùng khớp!'
                })
                return
            }
            // data
            const data = {
                name,
                email,
                password
            }
            setLoad(true)
            let res = await apis.authenApi.registerCandidate(data)
            // success
            toast.success(`${res.data.message}`, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                onClose: () => {
                    navigate('/login');
                }
            })
        } catch (err: any) {
            console.log('err', err);
            
            setLoad(false)
            Modal.error({
                title: "Thất bại",
                content: err.response.data.message || "Vui lòng thử lại sau ít phút!"
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
            {load && <BtnLoading />}
            <div className='box-login'>
                <div className='box-content'>
                    <div className='box-content-left'>
                        <form action="" onSubmit={(e) => { handleRegisterCandidate(e) }}>
                            <div className='title-rikkei'>
                                <h3>Cùng Rikkei Education xây dựng hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý tưởng</h3>
                            </div>
                            <div className='box-item-content'>
                                <label htmlFor="name">Họ tên</label>
                                <Input
                                    autoFocus
                                    name='name'
                                    className='input-name'
                                    placeholder="Nhập họ tên"
                                />
                            </div>
                            <div className='box-item-content'>
                                <label htmlFor="emails">Email</label>
                                <Input
                                    name='email'
                                    className='input-emails'
                                    placeholder="Nhập email (vd: abc@gmail.com)"
                                />
                            </div>
                            <div className='box-item-content'>
                                <label htmlFor="passwords">Password</label>
                                <Input.Password
                                    name='password'
                                    className='input-passwords'
                                    placeholder="Nhập mật khẩu"
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </div>
                            <div className='box-item-content'>
                                <label htmlFor="confirm-password">Confirm password</label>
                                <Input.Password
                                    name='confirmPassword'
                                    className='input-confirm-password'
                                    placeholder="Xác nhận mật khẩu"
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </div>
                            <div className='box-button-login'>
                                <button className='button-login' type='submit'>Đăng ký</button>
                            </div>

                            <div className='box-item-create-account'>
                                <p>Bạn đã có tài khoản?
                                    <span onClick={() => {
                                        window.location.href = '/login'
                                    }}>
                                        Đăng nhập ngay
                                    </span>
                                </p>
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

