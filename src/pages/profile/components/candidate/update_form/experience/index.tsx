import React, { useState } from 'react';
import { Input, Modal, message } from 'antd';
import apis from '@services/apis';
import { useDispatch } from 'react-redux';
import { candidateExperienceAction } from '@/store/slices/candidate/experience.slice';
import { refreshToken } from '@/utils/common/refreshTokenFunction';

import "./update_experience.scss";

export default function UpdateExperienceForm(props: { setOpenEditExperienceForm: any, experienceData: any }) {
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const dispatch = useDispatch();
    const { TextArea } = Input;
    const handleCloseModal = () => {
        props.setOpenEditExperienceForm(false);
    };

    const handleUpdateExperienceForm = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const position = (e.target as any).position.value
            const company = (e.target as any).company.value
            const started_at = (e.target as any).startDate.value
            const end_at = (e.target as any).endDate.value
            const info = (e.target as any).info.value
            // data
            let data = {
                position,
                company,
                started_at,
                end_at,
                info
            }
            
            let res = await apis.candidateApi.updateExperience(Number(props.experienceData.id), data);
            refreshToken()
            dispatch(candidateExperienceAction.fetchCandidateExperience())

            Modal.success({
                title: 'Thành công',
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
    };

    return (
        <div>
            <div id="myModal" className="modal">
                <div className="modal-content-HV">
                    <div className="modal-header-HV">
                        <h2>Kinh nghiệm làm việc</h2>
                    </div>
                    <div className="modal-body-HV">
                        <form onSubmit={handleUpdateExperienceForm}>
                            <div className='modal-body-menu'>
                                <div className='modal-body-item'>
                                    <label htmlFor={`position`}>
                                        Vị trí
                                    </label>
                                    <br />
                                    <Input
                                        name={`position`}
                                        className='input-position'
                                        placeholder="Nhập vị trí làm việc..."
                                        defaultValue={props.experienceData.position}
                                        autoFocus
                                    />
                                </div>
                                <div className='modal-body-item'>
                                    <label htmlFor={`company`}>
                                        Công ty
                                    </label>
                                    <br />
                                    <Input
                                        name={`company`}
                                        className='input-company'
                                        placeholder="Nhập tên công ty..."
                                        defaultValue={props.experienceData.company}
                                    />
                                </div>
                                <div className='modal-body-item-v2'>
                                    <p>Thời gian làm việc</p>
                                    <div className='modal-body-item-date'>
                                        <label htmlFor={`start-date`}>
                                            Ngày bắt đầu
                                        </label>
                                        <br />
                                        <Input
                                            name={`startDate`}
                                            type='date'
                                            min={new Date().toISOString().split('T')[0]} onChange={(event) => {
                                                const selectedDate = new Date(event.target.value);
                                                selectedDate.setDate(selectedDate.getDate() + 1);
                                                setStartDate(selectedDate.toISOString().split('T')[0]);
                                            }}
                                            className='input-start-date'
                                            defaultValue={props.experienceData.started_at.slice(0, 10)}
                                        />
                                    </div>
                                    <p>đến</p>
                                    <div className='modal-body-item-date'>
                                        <label htmlFor={`end-date`}>Ngày kết thúc</label><br />
                                        <Input
                                            name={`endDate`}
                                            type='date'
                                            min={startDate}
                                            className='input-end-date'
                                            defaultValue={props.experienceData.end_at.slice(0, 10)}
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
                                        defaultValue={props.experienceData.info}
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
    );
}
