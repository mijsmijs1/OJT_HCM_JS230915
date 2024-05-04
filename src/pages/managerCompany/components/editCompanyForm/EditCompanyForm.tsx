import { useDispatch, useSelector } from 'react-redux'
import './editCompanyFrom.scss'
import { Store } from '@/store'
import { useEffect, useState } from 'react';
import { Input, Modal, Select, message } from 'antd';
import { fetchTypeCompany, updateAddress, updateCompany } from '@/store/slices/company/company.slice';
import { unwrapResult } from '@reduxjs/toolkit';
import { isValidEmail, isValidPhone, isValidUrl } from '@/utils/common/validate_form';
import { COMPANY_SIZES } from '@/constants/constants';
import { refreshToken } from '@/utils/common/refreshTokenFunction';

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
export default function EditCompanyForm({ setDisplayEditForm }: {
    setDisplayEditForm: any
}) {
    const companyStore = useSelector((store: Store) => store.companyStore)
    const dispatch = useDispatch()
    const [selectedCity, setSelectedCity] = useState('')
    const [districts, setDistricts] = useState<District[]>([])
    const [selectedDistrict, setSelectedDistrict] = useState<string>('')
    const [wards, setWards] = useState<Ward[]>([])
    const [selectedWard, setSelectedWard] = useState<string>('')
    const [provinces, setProvinces] = useState<Province[]>([])
    const [selectedAddress, setSelectedAddress] = useState("")
    const [size, setSize] = useState(companyStore.company?.size)
    const [type, setType] = useState(companyStore.company?.type_company?.name)
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
    const handleSelectedAddress = (value: string) => {
        setSelectedAddress(value)
    }
    const handleSubmitUpdateCompany = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const name = (e.target as any).name.value
            const email = (e.target as any).email.value
            const phone = (e.target as any).phone.value
            const website = (e.target as any).website.value
            const link_fb = (e.target as any).link_fb.value
            const link_linkedin = (e.target as any).link_linkedin.value
            const description = (e.target as any).description.value
            if (!name || !website || !link_fb || !email || !phone || !size || !link_linkedin || !description) {
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
            let selectedTypeCompany = companyStore.typeCompany?.find(item => item.name == type)
            let updateData: any = {};
            name != companyStore.company?.name && (updateData.name = name)
            email != companyStore.company?.email && (updateData.email = email)
            phone != companyStore.company?.phone && (updateData.name = phone)
            size != companyStore.company?.size && (updateData.size = size)
            selectedTypeCompany?.id != companyStore.company?.type_company_id && (updateData.type_company_id = selectedTypeCompany?.id)
            website != companyStore.company?.website && (updateData.website = website)
            link_fb != companyStore.company?.link_fb && (updateData.link_fb = link_fb)
            link_linkedin != companyStore.company?.link_linkedin && (updateData.link_linkedin = link_linkedin)
            description != companyStore.company?.description && (updateData.description = description)
            if (!selectedAddress && Object.keys(updateData).length == 0) {
                message.error('Không tìm thấy sự thay đổi để cập nhật!')
                return
            }
            if (selectedAddress) {
                console.log(selectedAddress)
                const detailAddress = detailAddressInputValue
                const map_url = mapUrlInputValue
                if (!detailAddress || !map_url) {
                    message.error('Phải nhập đầy đủ thông tin của các trường!')
                    return
                }
                let addressData = companyStore.company?.address_companies?.find(item => item.address == selectedAddress)
                const address = `${detailAddress}, ${selectedWard}, ${selectedDistrict}, ${selectedCity}`
                if (address != addressData?.address) {
                    let updateAddressData: any = { address, name: address };
                    map_url != addressData?.map_url && (updateAddressData.map_url = map_url)
                    dispatch(updateAddress({ companyId: companyStore.company?.id || 0, addressId: addressData?.id || 0, updateData: updateAddressData }) as any)
                }
                if (address == addressData?.address && map_url != addressData?.map_url) {
                    let updateAddressData: any = { map_url };
                    dispatch(updateAddress({ companyId: companyStore.company?.id || 0, addressId: addressData?.id || 0, updateData: updateAddressData }) as any)
                }
            }
            if (Object.keys(updateData).length != 0) {
                const resultAction = await dispatch(updateCompany({ companyId: companyStore.company?.id || 0, updateCompanyData: updateData }) as any)
                const { message: resMessage } = unwrapResult(resultAction);
                Modal.success({
                    title: "Thành công!",
                    content: `${resMessage}`,
                    onOk: () => {
                        refreshToken()
                        setDisplayEditForm(false)
                    }
                })
                return
            }
            Modal.success({
                title: "Thành công!",
                content: `Cập nhật công ty thành công!`,
                onOk: () => {
                    refreshToken()
                    setDisplayEditForm(false)
                }
            })
            return
        } catch (err: any) {
            if (err.message) {
                Modal.error({
                    title: 'Thất bại!',
                    content: `${err.message}`,
                    onOk: () => { }
                })
            }
        }
    }
    useEffect(() => {
        fetchProvinces();
        dispatch(fetchTypeCompany() as any)
    }, [])
    useEffect(() => {
        let address = selectedAddress?.split(", ").reverse() || []
        const defaultCity = provinces.find(city => city.Name == address[0]);

        if (defaultCity) {
            setSelectedCity(defaultCity.Name);
            setDistricts(defaultCity.Districts);
            const defaultDistrict = defaultCity.Districts.find(district => district.Name === address[1]);
            if (defaultDistrict) {
                setSelectedDistrict(defaultDistrict.Name);
                const defaultWard = defaultDistrict.Wards.find(ward => ward.Name === address[2]);
                if (defaultWard) {
                    setSelectedWard(defaultWard.Name);
                    setWards(defaultDistrict.Wards);
                }
            }
        }
    }, [provinces, selectedAddress])
    const [detailAddressInputValue, setDetailAddressInputValue] = useState('');
    useEffect(() => {
        setDetailAddressInputValue(selectedAddress.split(', ')[0]);
    }, [selectedAddress]);
    const [mapUrlInputValue, setMapUrlInputValue] = useState('');
    useEffect(() => {
        setMapUrlInputValue(companyStore.company?.address_companies.find(item => item.address == selectedAddress)?.map_url || "updating");
    }, [selectedAddress]);
    return (
        <div className='company_edit_form_container'>
            <form onSubmit={(e) => {
                handleSubmitUpdateCompany(e)
            }}>
                <h3>Cập nhật thông tin doanh nghiệp</h3>
                <div className='all_input'>
                    <div className='input_group'>
                        <p>Tên công ty</p>
                        <div className='input_container'>
                            <input name='name' type='text' placeholder='ABC Corp' defaultValue={companyStore.company?.name}></input>
                        </div>
                    </div>
                    <div className='input_group'>
                        <p>Email công ty</p>
                        <div className='input_container'>
                            <input name='email' type='text' placeholder='ABC Corp' defaultValue={companyStore.company?.email}></input>
                        </div>
                    </div>
                    <div className='input_group'>
                        <p>Số điện thoại công ty</p>
                        <div className='input_container'>
                            <input name='phone' type='text' placeholder='ABC Corp' defaultValue={companyStore.company?.phone}></input>
                        </div>
                    </div>
                    <div className='input_group'>
                        <div className='select_size'>
                            <p>Loại hình công ty</p>
                            <Select value={type || 'updating'} onChange={setType}>
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
                            <Select value={size} onChange={setSize}>
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
                            <input name='website' type='text' placeholder='ABC Corp' defaultValue={companyStore.company?.website} ></input>
                        </div>
                    </div>
                    <div className='input_group'>
                        <p>Facebook</p>
                        <div className='input_container'>
                            <input name='link_fb' type='text' placeholder='ABC Corp' defaultValue={companyStore.company?.link_fb}></input>
                        </div>
                    </div>
                    <div className='input_group'>
                        <p>Linkeidn</p>
                        <div className='input_container'>
                            <input name='link_linkedin' type='text' placeholder='ABC Corp' defaultValue={companyStore.company?.link_linkedin}></input>
                        </div>
                    </div>
                    <div className='input_group'>
                        <div className='select_address'>
                            <p>Địa chỉ công ty</p>
                            <Select value={selectedAddress} onChange={handleSelectedAddress}>
                                <Select.Option value="" disabled hidden>Chọn địa chỉ muốn thay đổi</Select.Option>
                                {companyStore.company?.address_companies?.map(address => (
                                    <Select.Option key={address.address} value={address.address}>
                                        {address.address}
                                    </Select.Option>
                                ))}
                            </Select>
                        </div>
                        {
                            selectedAddress && (
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
                                                value={detailAddressInputValue}
                                                onChange={e => setDetailAddressInputValue(e.target.value)}
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
                                                value={mapUrlInputValue}
                                                onChange={e => setMapUrlInputValue(e.target.value)}
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
                            <textarea name='description' defaultValue={companyStore.company?.description}>
                            </textarea>
                        </div>
                    </div>
                </div>
                <div className='all_button'>
                    <button type='submit'>
                        Cập nhật
                    </button>
                    <div className='delete' onClick={() => {
                        setDisplayEditForm(false)
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
