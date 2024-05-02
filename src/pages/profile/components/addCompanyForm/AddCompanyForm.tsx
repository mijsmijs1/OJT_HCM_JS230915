import { useEffect, useRef, useState } from 'react';
import './addCompanyForm.scss'
import { useDispatch, useSelector } from 'react-redux';
import { Input, Modal, Select, message } from 'antd';
import apis from '@/services/apis';
import { Store } from '@/store';
import { createAddress, createCompany, fetchTypeCompany } from '@/store/slices/company/company.slice';
import { COMPANY_SIZES, MAX_IMAGE_SIZE, MIN_IMAGE_HEIGHT, MIN_IMAGE_WIDTH } from '@/constants/constants';
import { isValidEmail, isValidPhone, isValidUrl } from '@/utils/common/validate_form';
import { uploadToFirebase } from '@/services/firebase';
import { unwrapResult } from '@reduxjs/toolkit';

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
export default function AddCompanyForm({ setDisplayAddCompanyForm }: { setDisplayAddCompanyForm: any }) {
    const dispatch = useDispatch()
    const companyStore = useSelector((store: Store) => store.companyStore)
    const [selectedCity, setSelectedCity] = useState('')
    const [districts, setDistricts] = useState<District[]>([])
    const [selectedDistrict, setSelectedDistrict] = useState<string>('')
    const [wards, setWards] = useState<Ward[]>([])
    const [selectedWard, setSelectedWard] = useState<string>('')
    const [provinces, setProvinces] = useState<Province[]>([])
    const [type, setType] = useState(companyStore.company?.type_company.name)
    const [size, setSize] = useState(companyStore.company?.size)
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedImg, setSelectedImg] = useState(null);
    const inputRef = useRef(null);
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
        dispatch(fetchTypeCompany() as any)
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
        console.log('value', value);
        const selectedDistrictData = districts.find(district => district.Name == value);
        if (selectedDistrictData) {
            console.log('city', selectedDistrictData);
            setWards(selectedDistrictData.Wards);
            setSelectedWard('');
        }
    }
    const handlePic = () => {
        (inputRef.current as any).click();
    };
    const handleFileChange = (event: React.FormEvent) => {
        const file = (event.target as any).files[0];
        const { type, size } = file;

        if (!type.includes("image")) {
            message.warning(`${file.name} có định dạng không thích hợp.`);
            return;
        }

        const image = new Image();
        image.src = URL.createObjectURL(file);

        if (size > MAX_IMAGE_SIZE) {
            message.warning(`${file.name} có dung lượng quá lớn.`);
            return;
        }

        image.onload = () => {
            if (image.width < MIN_IMAGE_WIDTH || image.height < MIN_IMAGE_HEIGHT) {
                message.warning(`${file.name} có kích thước quá nhỏ.`);
                return;
            }
            setSelectedFile(file);
            setSelectedImg(URL.createObjectURL(file));
            message.success("Đã tải ảnh lên thành công!");
            URL.revokeObjectURL(image.src);
        };
    };
    const handleSubmitCreateCompany = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const name = (e.target as any).name.value
            const email = (e.target as any).companyEmail.value
            const phone = (e.target as any).phone.value
            const website = (e.target as any).website.value
            const link_fb = (e.target as any).link_fb.value
            const link_linkedin = (e.target as any).link_linkedin.value
            const description = (e.target as any).description.value
            const detailAddress = (e.target as any).detailAddress.value
            const map_url = (e.target as any).map_url.value
            const address = `${detailAddress}, ${selectedWard}, ${selectedDistrict}, ${selectedCity}`
            let selectedTypeCompany = companyStore.typeCompany?.find(item => item.name == type)
            if (!name || !website || !link_fb || !email || !phone || !size || !link_linkedin || !description || !detailAddress || !map_url || !selectedFile) {
                message.error('Phải nhập đầy đủ thông tin của các trường!')
                return
            }
            if (!isValidPhone(phone)) {
                message.error('Số điện thoại không đúng định dạng!')
                return
            }
            if (!isValidEmail(email)) {
                message.error('Email không đúng định dạng!')
                return
            }
            if (!isValidUrl(website) || !isValidUrl(link_fb) || !isValidUrl(link_linkedin)) {
                message.error('Link không đúng định dạng!')
                return
            }
            let createData = {
                name,
                logo: await uploadToFirebase(selectedFile, 'https://example.com/logo.png'),
                website,
                link_fb,
                link_linkedin,
                size,
                email,
                phone,
                description,
                type_company_id: selectedTypeCompany?.id
            }
            let newCompany = await dispatch(createCompany({ createData }) as any)
            let { data, message: ApiMessage } = unwrapResult(newCompany)
            let createNewAddress = {
                name: address,
                address,
                map_url
            }
            const refreshTokenRes = await apis.authenApi.refreshToken(String(localStorage.getItem('refreshToken')));
            localStorage.setItem('token', refreshTokenRes.data.accessToken)
            await dispatch(createAddress({ companyId: data.id, createData: createNewAddress }) as any)
            Modal.success({
                title: 'Thành công',
                content: ApiMessage,
                onOk: () => {
                    (e.target as any).reset()
                    setDisplayAddCompanyForm(false)
                }
            })
            return
        } catch (err: any) {
            console.log(err)
            if (err.message) {
                Modal.error({
                    title: 'Thất bại!',
                    content: `${err.message}`,
                    onOk: () => { setDisplayAddCompanyForm(false) }
                })
                return
            }
            Modal.error({
                title: 'Thất bại!',
                content: `Lỗi hệ thống, vui lòng thử lại sau!`,
                onOk: () => { setDisplayAddCompanyForm(false) }
            })
            return
        }
    }
    return (
        <div className='company_edit_form_container'>
            <form onSubmit={(e) => {
                handleSubmitCreateCompany(e)
            }}>
                <h3>Đăng kí công ty</h3>
                <div className='all_input add_address' >
                    <div className='product_describe_form'>
                        <div className='avatar'>
                            <h5>Chọn ảnh đại diện cho công ty của bạn!</h5>
                            <input type='file' ref={inputRef} className='img_input' style={{ display: "none" }} onChange={(e) => { handleFileChange(e) }} />
                            {selectedFile && <img src={selectedImg ? selectedImg : companyStore.company?.logo} alt="Selected Image"></img>}
                            <i className={selectedFile ? `fa-solid fa-check` : "fa-solid fa-image"} style={selectedFile ? { color: "#49CC90" } : { color: "black" }}></i>
                            <span style={selectedFile ? { color: "#49CC90" } : { color: "black" }}>Hình ảnh phải có kích thước tối thiểu 50 x 50 pixel!</span>
                            <button type="button" onClick={() => { handlePic() }}>Chọn ảnh</button>
                        </div>
                    </div>
                    <div className='input_group'>
                        <p>Tên công ty</p>
                        <div className='input_container'>
                            <Input name="name" type='text' className='input-company' placeholder='Tên công ty' />
                        </div>
                    </div>
                    <div className='input_group'>
                        <p>Số điện thoại liên hệ</p>
                        <div className='input_container'>
                            <Input name='phone' type='text' className='input-phonenumber' placeholder='Nhập số điện thoại doanh nghiệp' />
                        </div>
                    </div>
                    <div className='input_group'>
                        <p>Email công ty</p>
                        <div className='input_container'>
                            <Input name='companyEmail' type='text' className='input-email-company' placeholder='Nhập email doanh nghiệp' />
                        </div>
                    </div>
                    <div className='input_group'>
                        <div className='select_size'>
                            <p>Loại hình công ty</p>
                            <Select value={type ? type : ""} onChange={setType}>
                                <Select.Option value="" disabled hidden>Chọn loại hình công ty của bạn</Select.Option>
                                {companyStore.typeCompany?.map(item => (
                                    <Select.Option key={Date.now() * Math.random()} value={item.name}>
                                        {item.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </div>
                    </div>
                    <div className='input_group'>
                        <div className='select_size'>
                            <p>Kích thước công ty</p>
                            <Select value={size ? size : ''} onChange={setSize}>
                                <Select.Option value="" disabled hidden>Chọn kích thước công ty phù hợp</Select.Option>
                                {COMPANY_SIZES.map(item => (
                                    <Select.Option key={Date.now() * Math.random()} value={item}>
                                        {item}
                                    </Select.Option>
                                ))}
                            </Select>
                        </div>
                    </div>
                    <div className='input_group'>
                        <p>Website</p>
                        <div className='input_container'>
                            <input name='website' type='text' placeholder='Nhập domain website công ty của bạn' ></input>
                        </div>
                    </div>
                    <div className='input_group'>
                        <p>Facebook</p>
                        <div className='input_container'>
                            <input name='link_fb' type='text' placeholder='Nhập link facebook công ty của bạn'></input>
                        </div>
                    </div>
                    <div className='input_group'>
                        <p>Linkeidn</p>
                        <div className='input_container'>
                            <input name='link_linkedin' type='text' placeholder='Nhập link Linkeidn công ty của bạn'></input>
                        </div>
                    </div>
                    <div className='input_group'>
                        <div className='select_address'>
                            <p>Địa chỉ công ty</p>
                        </div>
                        {
                            (
                                <>
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
                                                    <Select.Option key={ward.Name} value={ward.Name}>
                                                        {ward.Name}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </div>
                                    </div>

                                    {/* address */}
                                    <div className='location-bottom'>
                                        <div className='address-box'>
                                            <label htmlFor='address'>Địa chỉ cụ thể</label>
                                            <Input
                                                name='detailAddress'
                                                type='text'
                                                className='input-address'
                                                placeholder='Nhập địa chỉ chi tiết ...'
                                                disabled={!selectedWard}
                                            />
                                        </div>
                                    </div>
                                    <div className='location-bottom'>
                                        <div className='address-box'>
                                            <label htmlFor='address'>Map Embed URL (ví dụ: "https://www.google.com/maps/embed?pb=!1m14!1m...")</label>
                                            <Input
                                                name='map_url'
                                                type='text'
                                                className='input-address'
                                                placeholder='Nhập Map embed URL ...'
                                                disabled={!selectedWard}
                                            />
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    </div>
                    <div className='input_group'>
                        <p>Mô tả về công ty</p>
                        <div className='input_container textarea'>
                            <textarea name='description' placeholder='Nhập mô tả về công ty'>
                            </textarea>
                        </div>
                    </div>
                </div>
                <div className='all_button'>
                    <button type='submit'>
                        Tạo mới
                    </button>
                    <div className='delete' onClick={() => {
                        setDisplayAddCompanyForm(false)
                    }}>
                        <span>
                            Hủy bỏ
                        </span>
                    </div>
                </div>
            </form >
        </div >
    )
}
