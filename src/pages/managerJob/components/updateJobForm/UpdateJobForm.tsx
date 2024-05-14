import { Modal, Select, Space, message } from 'antd'
import './updateJobForm.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Store } from '@/store'
import React, { useEffect, useState } from 'react'
import { formatDateForInput } from '@/utils/common/format_date_for_input'
import { fetchAddressByCompanyId } from '@/store/slices/company/company.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import { updateJob } from '@/store/slices/job/job.slice'
import { refreshToken } from '@/utils/common/refreshTokenFunction'

export default function UpdateJobForm({ setDisplayEditForm, companyId }: {
    setDisplayEditForm: any,
    companyId: number
}) {
    const dispatch = useDispatch();
    const jobStore = useSelector((store: Store) => store.jobStore)
    const companyStore = useSelector((store: Store) => store.companyStore)
    const [levelJob, setLevelJob] = useState<number | null>(jobStore.job?.levelJob?.id || 0);
    const [selectedTypeValues, setSelectedTypeValues] = useState<number[] | []>(jobStore.job?.typeJobs?.map(item => item.id) || []);
    const [location, setLocation] = useState(jobStore.job?.location?.name || '');
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    useEffect(() => {
        dispatch(fetchAddressByCompanyId({ companyId: Number(companyId) }) as any)
    }, [])
    const handleUpdateJob = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            let title = (e.target as any).title.value;
            let location_name = location;
            let levelJob_id = levelJob;
            let typeJobs = selectedTypeValues;
            let company_id = Number(companyId);
            let created_at = (e.target as any).created_at.value;
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

            if (!typeJobs || typeJobs.length == 0) {
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

            if (title == jobStore.job?.title &&
                location_name == jobStore.job?.location?.name &&
                levelJob_id == jobStore.job?.levelJob?.id &&
                JSON.stringify(typeJobs) == JSON.stringify(jobStore.job?.typeJobs?.map(item => item.id)) &&
                created_at == formatDateForInput(jobStore.job?.created_at || '') &&
                expire_at == formatDateForInput(jobStore.job?.expire_at || '') &&
                salary == jobStore.job?.salary &&
                description == jobStore.job?.description) {
                message.error("No changes detected")
                return
            }

            let updateData: any = {}

            title !== jobStore.job?.title && (updateData.title = title);
            location_name !== jobStore.job?.location?.name && (updateData.location_name = location_name);
            levelJob_id !== jobStore.job?.levelJob?.id && (updateData.levelJob_id = levelJob_id);
            JSON.stringify(typeJobs) !== JSON.stringify(jobStore.job?.typeJobs?.map(item => item.id)) && (updateData.typeJobs = typeJobs);
            company_id && (updateData.company_id = company_id);
            created_at !== formatDateForInput(jobStore.job?.created_at || '') && (updateData.created_at = created_at);
            expire_at !== formatDateForInput(jobStore.job?.expire_at || '') && (updateData.expire_at = expire_at);
            salary !== jobStore.job?.salary && (updateData.salary = salary);
            description !== jobStore.job?.description && (updateData.description = description);

            console.log(updateData)
            let result = await dispatch(updateJob({ jobId: jobStore.job?.id || 0, updateData: updateData }) as any)
            let { message: apiMessage, data } = unwrapResult(result)
            Modal.success({
                title: "Thành công!",
                content: `${apiMessage}`,
                onOk: () => {
                    refreshToken()
                    setDisplayEditForm(false)
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
        <div className='update_job_form_container'>
            <form onSubmit={(e) => { handleUpdateJob(e) }}>
                <h3>Cập nhật thông tin công việc</h3>
                <div className='all_input'>
                    <div className='input_group'>
                        <p>Tên công việc</p>
                        <div className='input_container'>
                            <input type='text' defaultValue={jobStore.job?.title} name='title'></input>
                        </div>

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
                                defaultValue={jobStore.job?.typeJobs?.map(item => item.id)}
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
                            <input type='text' name='salary' defaultValue={jobStore.job?.salary}></input>
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
                    <div className='input_group start'>
                        <div className='item'>
                            <p>Thời hạn bắt đầu ứng tuyển</p>
                            <div className='input_container'>
                                <input type='date' min={new Date().toISOString().split('T')[0]} defaultValue={formatDateForInput(jobStore.job?.created_at || '')} onChange={(event) => {
                                    const selectedDate = new Date(event.target.value);
                                    selectedDate.setDate(selectedDate.getDate() + 1);
                                    setStartDate(selectedDate.toISOString().split('T')[0]);
                                }}></input>
                            </div>
                        </div>
                        <div className='item end'>
                            <p>Thời hạn kết thúc ứng tuyển</p>
                            <div className='input_container'>
                                <input type='date' name='expire_at' min={startDate} defaultValue={formatDateForInput(jobStore.job?.expire_at || '')}></input>
                            </div>
                        </div>
                    </div>


                    <div className='input_group'>
                        <p>Mô tả công việc</p>
                        <div className='input_container textarea'>
                            <textarea name='desc' defaultValue={jobStore.job?.description}>

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
            </form>
        </div>
    )
}


