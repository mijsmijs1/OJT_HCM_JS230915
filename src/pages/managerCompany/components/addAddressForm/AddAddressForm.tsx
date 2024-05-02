import { useDispatch, useSelector } from 'react-redux'
import './addAddressForm.scss'
import { Store } from '@/store'
import { useEffect, useState } from 'react';
import { Input, Modal, Select, message } from 'antd';
import { createAddress } from '@/store/slices/company/company.slice';
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
export default function AddAddressForm({ setDisplayAddAddressForm }: {
    setDisplayAddAddressForm: any
}) {
    const companyStore = useSelector((store: Store) => store.companyStore)
    const dispatch = useDispatch()
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
    const handleSubmitUpdateCompany = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const detailAddress = (e.target as any).detailAddress.value
            const map_url = (e.target as any).map_url.value
            if (!detailAddress || !map_url) {
                message.error('Phải nhập đầy đủ thông tin của các trường!')
                return
            }

            const address = `${detailAddress}, ${selectedWard}, ${selectedDistrict}, ${selectedCity}`
            let addressData = companyStore.company?.address_companies?.find(item => item.address == address)
            if (address == addressData?.address || map_url == addressData?.map_url) {
                message.error('Địa chỉ này đã tồn tại.')
                return
            }
            let createData = {
                name: address,
                address,
                map_url
            }
            const resultAction = await dispatch(createAddress({ companyId: companyStore.company?.id || 0, createData: createData }) as any)
            const { message: resMessage } = unwrapResult(resultAction);
            Modal.success({
                title: "Thành công!",
                content: `${resMessage}`,
                onOk: () => {
                    setDisplayAddAddressForm(false)
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

    }, [])
    return (
        <div className='company_edit_form_container'>
            <form onSubmit={(e) => {
                handleSubmitUpdateCompany(e)
            }}>
                <h3>Thêm địa chỉ cho doanh nghiệp</h3>
                <div className='all_input add_address' >
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
                </div>
                <div className='all_button'>
                    <button type='submit'>
                        Thêm
                    </button>
                    <div className='delete' onClick={() => {
                        setDisplayAddAddressForm(false)
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
