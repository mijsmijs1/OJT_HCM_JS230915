import React from 'react';
import { Input, Modal, message } from 'antd';
import apis from '@services/apis';
import { useDispatch } from 'react-redux';
import { candidateEducationAction } from '@/store/slices/candidate/education.slice';

import "./update-education.scss";

export default function UpdateEducationForm(props: { setOpenEditEducationForm: any, educationData: any }) {
    const dispatch = useDispatch();
    const { TextArea } = Input;

    console.log('prop', props.educationData)

    const handleCloseModal = () => {
        props.setOpenEditEducationForm(false);
    };

    const handleUpdateEducationForm = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const name_education = (e.target as any).school.value
            const major = (e.target as any).major.value
            const started_at = (e.target as any).startDate.value
            const end_at = (e.target as any).endDate.value
            const info = (e.target as any).info.value
            const startDate = new Date(started_at);
            const endDate = new Date(end_at)

            // Check valid time
            if (endDate <= startDate) {
                message.warning("Thời gian không hợp lệ");
                (e.target as any).endDate.value = ''
                return;
            }
            
            // data
            let data = {
                name_education,
                major,
                started_at,
                end_at,
                info
            }
            let res = await apis.candidateApi.updateEducation(props.educationData.id, data);
            dispatch(candidateEducationAction.fetchCandidateEducation())

            Modal.success({
                title: 'Successful',
                content: res.data.message,
                onOk: handleCloseModal,
                cancelText: null,
            })
        } catch (err: any) {
            Modal.error({
                title: "Failed!",
                content: err.response?.data?.message || 'Update failed, please try again later',
            });
        }
    }
    return (
        <div>
            <div id="myModal" className="modal">
                <div className="modal-content-HV">
                    <div className="modal-header-HV">
                        <h2>Học vấn</h2>
                    </div>
                    <div className="modal-body-HV">
                        <form onSubmit={handleUpdateEducationForm}>
                            <div className='modal-body-menu'>
                                <div className='modal-body-item'>
                                    <label htmlFor={`school`}>
                                        Trường
                                    </label>
                                    <br />
                                    <Input
                                        name={`school`}
                                        className='input-school'
                                        placeholder="Nhập tên trường..."
                                        defaultValue={props.educationData.name_education}
                                        autoFocus
                                    />
                                </div>
                                <div className='modal-body-item'>
                                    <label htmlFor={`major`}>
                                        Ngành Học
                                    </label>
                                    <br />
                                    <Input
                                        name={`major`}
                                        className='input-major'
                                        placeholder="Nhập ngành học..."
                                        defaultValue={props.educationData.major}
                                    />
                                </div>
                                <div className='modal-body-item-v2'>
                                    <p>Thời gian học tập</p>
                                    <div className='modal-body-item-date'>
                                        <label htmlFor={`start-date`}>
                                            Start Date
                                        </label>
                                        <br />
                                        <Input
                                            name={`startDate`}
                                            type='date'
                                            className='input-start-date'
                                            defaultValue={props.educationData.started_at.slice(0, 10)}
                                        />
                                    </div>
                                    <p>to</p>
                                    <div className='modal-body-item-date'>
                                        <label htmlFor={`end-date`}>End Date</label><br />
                                        <Input
                                            name={`endDate`}
                                            type='date'
                                            className='input-end-date'
                                            defaultValue={props.educationData.end_at.slice(0, 10)}
                                        />
                                    </div>
                                </div>
                                <div className='modal-body-info-more'>
                                    <p>Thông tin thêm</p>
                                    <TextArea
                                        name={`info`}
                                        className='modal-text'
                                        placeholder="Nhập thêm thông tin"
                                        style={{ width: 641, height: 139, resize: 'none' }}
                                        defaultValue={props.educationData.info}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer-HV">
                                <button type='submit' className='button-update'>Cập nhật</button>
                                <button onClick={handleCloseModal} className='button-delete'>Hủy bỏ</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
