import React, { useState } from 'react'
import { Input, Modal, message } from 'antd'
import apis from '@services/apis'
import { candidateExperienceAction } from '@/store/slices/candidate/experience.slice'
import { useDispatch } from 'react-redux'
import { refreshToken } from '@/utils/common/refreshTokenFunction';

import "./experienceModal.scss"

export default function ExperienceForm(props: { setOpenExperienceForm: any }) {
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const dispatch = useDispatch()
    const { TextArea } = Input
    const handleCloseModal = () => {
        props.setOpenExperienceForm(false)
    }

    const handleExperienceForm = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const position = (e.target as any).position.value
            const company = (e.target as any).unit.value
            const started_at = (e.target as any).startDate.value
            const end_at = (e.target as any).endDate.value
            const info = (e.target as any).detail.value

            // Check if any field is empty
            if (!position || !company || !started_at || !end_at || !info) {
                message.warning("Please fill in all fields")
                return
            }
            // data
            let data = {
                position,
                company,
                started_at,
                end_at,
                info
            }
            console.log(data);

            let result = await apis.candidateApi.createExperience(data)
            refreshToken()
            dispatch(candidateExperienceAction.fetchCandidateExperience())

            Modal.success({
                title: 'Thành côngly',
                content: result.data.message,
                onOk: handleCloseModal,
                cancelText: null,
            })
        } catch (err: any) {
            Modal.error({
                title: "Failed!",
                content: err.response.data.message || 'Update failed, please try again in few minutes',
            })
        }
    }
    return (
        <div>
            <div id="myModal" className="modal">
                {/* <!-- Modal content --> */}
                <div className="modal-content-EX">
                    <div className="modal-header-EX">
                        <h2>Kinh nghiệm làm việc</h2>
                    </div>
                    <div className="modal-body-EX">
                        <form action='' onSubmit={handleExperienceForm}>
                            <div className='modal-body-menu'>
                                <div className='modal-body-item'>
                                    <label htmlFor="school">Vị trí</label><br />
                                    <Input
                                        name='position'
                                        className='input-school'
                                        placeholder="Nhập vị trí"
                                    />
                                </div>
                                <div className='modal-body-item'>
                                    <label htmlFor="major">Tên đơn vị công tác</label><br />
                                    <Input
                                        name="unit"
                                        className='input-major'
                                        placeholder="Nhập đơn vị công tác"
                                    />
                                </div>
                                <div className='modal-body-item-v2'>
                                    <p>Thời gian làm việc</p>
                                    <div className='modal-body-item-date'>
                                        <label htmlFor="start-date">Start Date</label><br />
                                        <Input
                                            name='startDate'
                                            min={new Date().toISOString().split('T')[0]} onChange={(event) => {
                                                const selectedDate = new Date(event.target.value);
                                                selectedDate.setDate(selectedDate.getDate() + 1);
                                                setStartDate(selectedDate.toISOString().split('T')[0]);
                                            }}
                                            className='input-start-date'
                                            type='date'
                                        />
                                    </div>
                                    <p>to</p>
                                    <div className='modal-body-item-date'>
                                        <label htmlFor="end-date">End Date</label><br />
                                        <Input
                                            name='endDate'
                                            min={startDate}
                                            className='input-end-date'
                                            type='date'
                                        />
                                    </div>
                                </div>
                                <div className='modal-body-info-more-EX'>
                                    <p>Mô tả chi tiết công việc</p>
                                    <TextArea
                                        name='detail'
                                        className='modal-text'
                                        placeholder="Hint text"
                                        style={{ width: 641, height: 169, resize: 'none' }}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer-EX">
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
