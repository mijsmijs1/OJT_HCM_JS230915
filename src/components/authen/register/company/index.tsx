import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input, Modal, Select, message } from 'antd';
import pictures from '@/pictures';
import { useNavigate } from 'react-router-dom';
import apis from '@services/apis';
import { useEffect, useState } from 'react';

import './company_register.scss';

interface Province {
    Name: string;
    Districts: District[];
}

interface District {
    Name: string;
    Wards: Ward[];
}

interface Ward {
    Level: string;
    Name: string;
}

export default function RegisterCompany() {
    const navigate = useNavigate()

    const [selectedCity, setSelectedCity] = useState('')
    const [districts, setDistricts] = useState<District[]>([])
    const [selectedDistrict, setSelectedDistrict] = useState<string>('')
    const [wards, setWards] = useState<Ward[]>([])
    const [selectedWard, setSelectedWard] = useState<string>('')
    const [provinces, setProvinces] = useState<Province[]>([])

    // call api get location
    const fetchProvinces = async () => {
        try {
            const response = await fetch('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const locationData = await response.json();
            setProvinces(locationData);
        } catch (err) {
            console.log('Error fetching location data:', err);
        }
    }

    useEffect(() => {
        fetchProvinces();
    }, [])

    // cities
    const handleCityChange = (value: string) => {
        setSelectedCity(value)
        const selectedProvince = provinces.find(province => province.Name == value);
        if (selectedProvince) {
            setDistricts(selectedProvince.Districts)
            setSelectedDistrict('');
            setWards([]);
            setSelectedWard('');
        }
    }

    // districts
    const handleDistrictChange = (value: string) => {
        setSelectedDistrict(value);
        const selectedDistrictData = districts.find(district => district.Name == value);
        if (selectedDistrictData) {
            console.log('city', selectedDistrictData);
            setWards(selectedDistrictData.Wards);
            setSelectedWard('');
        }
    }

    // HANDLE REGISTER
    const handleRegisterCompany = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            let email = (e.target as any).email.value;
            const password = (e.target as any).password.value;
            const confirmPassword = (e.target as any).confirmPassword.value;
            // company
            const name = (e.target as any).name.value;
            const phone = (e.target as any).phone.value;
            const companyEmail = (e.target as any).companyEmail.value
            // address
            const detailAddress = (e.target as any).detailAddress.value
            const address = `${selectedCity}, ${selectedDistrict}, ${selectedWard}, ${detailAddress}`
            //  is not empty
            if (!name || !email || !password || !confirmPassword || !companyEmail || !phone || !selectedCity || !selectedDistrict || !selectedWard || !detailAddress) {
                message.warning({
                    content: 'Vui lòng nhập đầy đủ thông tin!'
                })
                return
            }
            // check phone
            if (!/^\d+$/.test(phone)) {
                message.error({
                    content: 'Số điện thoại phải là số!'
                })
                return
            }
            // check email company format
            if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(companyEmail)) {
                message.error({
                    content: 'Sai định dạng mail doanh nghiệp!'
                })
                return
            }
            // check email format
            if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) {
                message.error({
                    content: 'Sai định dạng mail!'
                })
                return
            }
            // check password
            if (password.length < 6) {
                message.error({
                    content: 'Mật khẩu ít nhất 6 ký tự!'
                })
                return
            }
            // check confirm password
            if (password != confirmPassword) {
                message.error({
                    content: 'Mật khẩu không trùng khớp!'
                });
                return
            }
            // data
            const data = {
                email,
                password,
                name,
                phone,
                companyEmail,
                address
            }
            let res = await apis.companyApi.register(data)
            //success  
            Modal.success({
                title: 'Thành công',
                content: res.data.message,
                onOk: () => {
                    (e.target as any).reset()
                    window.location.href = '/login-company'
                }
            })
        } catch (err: any) {
            Modal.error({
                title: 'Thất bại',
                content: err.response.data.message || 'Hãy thử lại sau ít phút!'
            })
        }
    }
    return (
        <div>
            <div className='box-logo-rikkei' onClick={() => { window.location.href = '/'; }}>
                <img className='Rikkei_logo' src={pictures.logo_RikkeiEduV2} alt='Rikkei_logo' />
            </div>
            <div className='box-register-company'>
                <form onSubmit={handleRegisterCompany}>
                    <div className='box-content-company'>
                        {/* left */}
                        <div className='box-register-content-left-company'>
                            <div className='title-rikkei-company'>
                                <h3>Cùng Rikkei Education tiếp cận nguồn nhân lực chất lượng cao</h3>
                            </div>
                            <div className='info-content-account'>
                                <h3>Thông tin tài khoản</h3>
                            </div>
                            <div className='box-item-content-company'>
                                <label htmlFor='email'>Email</label><br />
                                <Input name="email" className='input-email-company' placeholder='Nhập email (vd: abc@gmail.com)' autoFocus />
                            </div>
                            <div className='box-item-content-company'>
                                <label htmlFor='password'>Password</label><br />
                                <Input.Password
                                    name='password'
                                    className='input-password-company'
                                    placeholder='Nhập mật khẩu'
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </div>
                            <div className='box-item-content-company'>
                                <label htmlFor='password'>Confirm password</label><br />
                                <Input.Password
                                    name="confirmPassword"
                                    className='input-confirm-password-company'
                                    placeholder='Xác nhận mật khẩu'
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </div>
                        </div>

                        {/* line */}
                        <div className='line'></div>

                        {/* right */}
                        <div className='box-register-content-right-company'>
                            <div className='info-content-company'>
                                <h3>Thông tin doanh nghiệp</h3>
                            </div>
                            <div className='box-item-content-company'>
                                <label htmlFor='company'>Công ty</label><br />
                                <Input name="name" type='text' className='input-company' placeholder='Tên công ty' />
                            </div>

                            {/* Location */}
                            <div className='box-item-content-company'>
                                <div className='location-top'>
                                    {/* Cities */}
                                    <div className='cities-box'>
                                        <label htmlFor='city'>Thành phố/Tỉnh</label><br />
                                        <Select value={selectedCity} onChange={handleCityChange}>
                                            {!selectedCity && (
                                                <Select.Option value="" disabled hidden>Chọn thành phố</Select.Option>
                                            )}
                                            {provinces.map(province => (
                                                <Select.Option key={province.Name} value={province.Name}>
                                                    {province.Name}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </div>

                                    {/* District */}
                                    <div className='districts-box'>
                                        <label htmlFor='district'>Quận/Huyện</label><br />
                                        <Select
                                            value={selectedDistrict}
                                            onChange={handleDistrictChange}
                                            disabled={!selectedCity}
                                        >
                                            {!selectedDistrict && (
                                                <Select.Option value="" disabled hidden>Chọn quận/huyện</Select.Option>
                                            )}
                                            {districts.map(district => (
                                                <Select.Option key={district.Name} value={district.Name}>
                                                    {district.Name}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </div>

                                    {/* Ward */}
                                    <div className='wards-box'>
                                        <label htmlFor='ward'>Phường/Xã</label><br />
                                        <Select
                                            value={selectedWard}
                                            onChange={(value) => setSelectedWard(value)}
                                            disabled={!selectedDistrict}
                                        >
                                            {!selectedWard && (
                                                <Select.Option value="" disabled hidden>Chọn phường/xã</Select.Option>
                                            )}
                                            {wards.map(ward => (
                                                <Select.Option key={ward.Level} value={ward.Level}>
                                                    {ward.Name}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </div>
                                </div>

                                {/* address */}
                                <div className='location-bottom'>
                                    <div className='address-box'>
                                        <label htmlFor='address'>Địa chỉ cụ thể</label><br />
                                        <Input
                                            name='detailAddress'
                                            type='text'
                                            className='input-address'
                                            placeholder='Nhập địa chỉ chi tiết ...'
                                            disabled={!selectedWard}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Phone number */}
                            <div className='box-item-content-company'>
                                <label htmlFor='phonenumber'>Số điện thoại liên hệ</label><br />
                                <Input name='phone' type='text' className='input-phonenumber' placeholder='Nhập số điện thoại doanh nghiệp' />
                            </div>

                            {/* Email company */}
                            <div className='box-item-content-company'>
                                <label htmlFor='password'>Email công ty</label><br />
                                <Input name='companyEmail' type='text' className='input-email-company' placeholder='Nhập email doanh nghiệp' />
                            </div>
                        </div>
                    </div>

                    {/* button */}
                    <div className='box-button-register-company'>
                        <button type='submit' className='button-register-company'>Đăng ký</button>
                    </div>
                    <div className='box-item-have-account'>
                        <p>
                            Đã có tài khoản?<span onClick={() => { navigate('/login-company'); }}> Đăng nhập ngay</span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}
