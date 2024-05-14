import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import './addJob.scss'
import { Modal, Select, Space, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Store } from '@/store'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchAddressByCompanyId } from '@/store/slices/company/company.slice'
import { createJob } from '@/store/slices/job/job.slice'
import { refreshToken } from '@/utils/common/refreshTokenFunction'
import { unwrapResult } from '@reduxjs/toolkit'


export default function AddJob() {
    const dispatch = useDispatch()
    const companyStore = useSelector((store: Store) => store.companyStore)
    const jobStore = useSelector((store: Store) => store.jobStore)
    console.log(jobStore.typeJob)
    const [location, setLocation] = useState('');
    const [levelJob, setLevelJob] = useState<number | null>(null);
    const [selectedTypeValues, setSelectedTypeValues] = useState<number[] | []>([]);
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    let { companyId } = useParams()
    useEffect(() => {
        dispatch(fetchAddressByCompanyId({ companyId: Number(companyId) }) as any)
    }, [])
    const handleCreateJob = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            let title = (e.target as any).title.value;
            let location_name = location;
            let levelJob_id = levelJob;
            let typeJobs = selectedTypeValues;
            let company_id = Number(companyId);
            let created_at = (e.target as any).startDate.value;
            let expire_at = (e.target as any).expire_at.value;
            let salary = (e.target as any).salary.value;
            let description = (e.target as any).desc.value;
            let errors = [];
            if (!title) {
                errors.push("Title is required");
            }

            if (!location_name) {
                errors.push("Location is required");
            }

            if (!levelJob_id) {
                errors.push("Job level is required");
            }

            if (!typeJobs || typeJobs.length === 0) {
                errors.push("Job type is required");
            }

            if (!company_id) {
                errors.push("Company ID is required");
            }

            if (!created_at) {
                errors.push("Start date is required");
            }

            if (!expire_at) {
                errors.push("Expiration date is required");
            }

            if (!salary) {
                errors.push("Salary is required");
            }

            if (!description) {
                errors.push("Description is required");
            } else if (description.length > 2000) {
                errors.push("Description must be less than 2000 characters");
            }

            if (errors.length > 0) {
                // Handle errors here
                message.error(`${errors.join(', ')}`)
                return
            }
            let createData = {
                title,
                location_name,
                levelJob_id,
                typeJobs,
                company_id,
                created_at,
                expire_at,
                salary,
                description,
            }
            console.log(createData)
            let result = await dispatch(createJob({ createData }) as any)
            let { message: apiMessage, data } = unwrapResult(result)
            Modal.confirm({
                title: "Thành công!",
                content: `${apiMessage}`,
                okText: 'Chuyển sang trang Job',
                cancelText: 'Tiếp tục tạo Job',
                onOk: () => {
                    refreshToken()
                    window.location.href = `/manager-job/${data.id}/info`
                },
                onCancel: () => {
                    window.location.reload();
                }
            })
            return
        } catch (err: any) {
            console.log(err)
            if (err.message) {
                Modal.error({
                    title: 'Thất bại!',
                    content: `${err.message}`,
                    onOk: () => { }
                })
                return
            }
            Modal.error({
                title: 'Thất bại!',
                content: `Lỗi hệ thống, vui lòng thử lại sau!`,
                onOk: () => { }
            })
            return
        }
    }
    return (
        <>
            <Breadcrumb />
            <div className='addJob_container'>
                <div className='content'>
                    <h3>Thêm việc làm mới</h3>
                    <form onSubmit={(e) => handleCreateJob(e)} >
                        <div className='all_input'>
                            <div className='input_group'>
                                <p>Tên công việc</p>
                                <div className='input_container'>
                                    <input type='text' name='title' placeholder='Nodejs Developer'></input>
                                </div>

                            </div>

                            <div className='input_group location'>
                                <p>Địa điểm làm việc</p>
                                <Select value={location || ""} onChange={setLocation} >
                                    <Select.Option value="" disabled hidden>Chọn địa điểm làm việc</Select.Option>
                                    {companyStore.addressByCompanyId?.map(item => (
                                        <Select.Option key={Date.now() * Math.random()} value={item.address}>
                                            {item.address}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </div>
                            <div className='input_group type'>
                                <p>Chọn level công việc</p>
                                <Select value={levelJob || ""} onChange={(value) => setLevelJob(Number(value))} >
                                    <Select.Option value="" disabled hidden>Chọn loại Level</Select.Option>
                                    {jobStore.levelJob?.map(item => (
                                        <Select.Option key={Date.now() * Math.random()} value={item.id}>
                                            {item.name}
                                        </Select.Option>
                                    ))}
                                </Select>

                            </div>
                            <div className='input_group'>
                                <p>Loại công nghệ sử dụng</p>
                                <Space
                                    style={{
                                        width: '100%',
                                    }}
                                    direction="vertical"
                                >
                                    <Select
                                        mode="multiple"
                                        allowClear
                                        showSearch
                                        style={{
                                            width: '100%',
                                        }}
                                        placeholder="Please select"
                                        onChange={(value) => { setSelectedTypeValues(value) }}
                                        options={jobStore.typeJob?.map(item => { return { label: item.name, value: item.id } })}
                                        filterOption={(input, option) =>
                                            (option as any).label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    />
                                </Space>

                            </div>
                            <div className='input_group'>
                                <p>Mức lương</p>
                                <div className='input_container'>
                                    <input type='text' name='salary' placeholder='$200 - $1500'></input>
                                </div>

                            </div>
                            <div className='input_group start'>
                                <p>Thời hạn bắt đầu ứng tuyển</p>
                                <div className='input_container'>
                                    <input type='date' name='startDate' min={new Date().toISOString().split('T')[0]} onChange={(event) => {
                                        const selectedDate = new Date(event.target.value);
                                        selectedDate.setDate(selectedDate.getDate() + 1);
                                        setStartDate(selectedDate.toISOString().split('T')[0]);
                                    }}></input>
                                </div>

                            </div>
                            <div className='input_group end'>
                                <p>Thời hạn kết thúc ứng tuyển</p>
                                <div className='input_container'>
                                    <input type='date' name='expire_at' min={startDate}></input>
                                </div>

                            </div>

                            <div className='input_group'>
                                <p>Mô tả công việc</p>
                                <div className='input_container textarea'>
                                    <textarea name='desc'>

                                    </textarea>
                                </div>

                            </div>
                        </div>
                        <div className='all_button'>
                            <button type='submit'>
                                Thêm mới
                            </button>
                        </div>
                    </form>
                </div>
            </div >
        </>
    )
}
