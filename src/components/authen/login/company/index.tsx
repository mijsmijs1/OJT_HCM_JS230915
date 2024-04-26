import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input, Modal, message } from 'antd';
import pictures from '@/pictures'
import { useNavigate } from 'react-router-dom';
import apis from '@/services/apis';

import "./company_login.scss"

export default function LoginCompany() {
    const navigate = useNavigate()

    const handleLoginCompany = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const email = (e.target as any).email.value
            const password = (e.target as any).password.value

            // check emty
            if (!email || !password) {
                message.warning("Vui lòng nhập đầy đủ thông tin!")
                return
            }

            // check type email
            if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) {
                message.error({
                    content: 'Không đúng định dạng mail!'
                });
                return;
            }

            // data
            let data = {
                email,
                password
            }

            let result = await apis.authenApi.loginCompany(data)

            console.log('a', result);

            // Success
            if (result.status == 200) {
                (e.target as any).reset()
                localStorage.setItem("token", result.data.accessToken)
                localStorage.setItem("refreshToken", result.data.accessToken)
                message.success(`${result.data.message}`)

                setTimeout(() => {
                    window.location.href = '/'
                }, 1000)
            }
        } catch (err: any) {
            Modal.error({
                title: "Thất bại!",
                content: err.response.data.message || 'Vui lòng thử lại sau ít phút',
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
            <div className='box-login-company'>
                <div className='box-content-company'>
                    <div className='box-content-left-company'>
                        <form onSubmit={handleLoginCompany}>
                            <div className='title-rikkei-company'>
                                <h3>Cùng Rikkei Education tiếp cận nguồn nhân lực chất lượng cao</h3>
                            </div>
                            <div className='box-item-content-company'>
                                <label htmlFor="email">Email</label><br />
                                <Input
                                    name='email'
                                    className='input-email'
                                    placeholder="Nhập email (vd: abc@gmail.com)"
                                    autoFocus
                                />
                            </div>
                            <div className='box-item-content-company'>
                                <label htmlFor="password">Password</label><br />
                                <Input.Password
                                    name='password'
                                    className='input-password'
                                    placeholder="Nhập mật khẩu"
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </div>
                            <div className='box-button-login'>
                                <button className='button-login' type='submit'>Đăng nhập</button>
                            </div>
                            <div className='box-item-forgot'>
                                <p>Quên mật khẩu?</p>
                            </div>
                            <div className='box-item-create-account' >
                                <p>Bạn không có tài khoản?<span onClick={() => {
                                    navigate('/register-company');
                                }}> Tạo 1 tài khoản</span></p>
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
