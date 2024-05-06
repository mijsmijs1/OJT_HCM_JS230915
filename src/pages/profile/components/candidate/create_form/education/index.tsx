import React from 'react'
import { Input, Modal, message } from 'antd'
import apis from '@services/apis'
import { candidateEducationAction } from '@/store/slices/candidate/education.slice';
import { useDispatch } from 'react-redux';

import "./education.scss"

export default function EducationForm(props: { setOpenEducationForm: any }) {
    const dispatch = useDispatch()
    const { TextArea } = Input
    const handleCloseModal = () => {
        props.setOpenEducationForm(false)
    }

    const handleEducationForm = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const name_education = (e.target as any).school.value
            const major = (e.target as any).major.value
            const started_at = (e.target as any).startDate.value
            const end_at = (e.target as any).endDate.value
            const info = (e.target as any).info.value
            const startDate = new Date(started_at);
            const endDate = new Date(end_at)

            // Check if any field is empty
            if (!name_education || !major || !started_at || !end_at || !info) {
                message.warning("Vui lòng điền đầy đủ thông tin")
                return
            }
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
            let res = await apis.candidateApi.createEducation(data)
            dispatch(candidateEducationAction.fetchCandidateEducation())

            Modal.success({
                title: 'Thành côngly',
                content: res.data.message,
                onOk: handleCloseModal,
                cancelText: null,
            })

        } catch (err: any) {
            Modal.error({
                title: "Failed!",
                content: err.response.data.message || 'Create failed, please try again in few minutes',
            })
        }
    }
    return (
        <div>
            <div id="myModal" className="modal">
                {/* <!-- Modal content --> */}
                <div className="modal-content-HV">
                    <div className="modal-header-HV">
                        <h2>Học vấn</h2>
                    </div>
                    <div className="modal-body-HV">
                        <form action="" onSubmit={handleEducationForm}>
                            <div className='modal-body-menu'>
                                {/* school */}
                                <div className='modal-body-item'>
                                    <label htmlFor="school">
                                        Trường
                                    </label>
                                    <br />
                                    <Input
                                        name='school'
                                        className='input-school'
                                        placeholder="Nhập tên trường..."
                                        autoFocus
                                    />
                                </div>

                                {/* major */}
                                <div className='modal-body-item'>
                                    <label htmlFor="major">
                                        Ngành Học
                                    </label>
                                    <br />
                                    <Input
                                        name='major'
                                        className='input-major'
                                        placeholder="Nhập ngành học..."
                                    />
                                </div>

                                {/* time */}
                                <div className='modal-body-item-v2'>
                                    <p>Thời gian học tập</p>
                                    {/* start */}
                                    <div className='modal-body-item-date'>
                                        <label htmlFor="start-date">
                                            Start Date
                                        </label>
                                        <br />
                                        <Input
                                            name='startDate'
                                            type='date'
                                            className='input-start-date'
                                        />
                                    </div>
                                    <p>to</p>
                                    {/* end */}
                                    <div className='modal-body-item-date'>
                                        <label htmlFor="end-date">End Date</label><br />
                                        <Input
                                            name='endDate'
                                            type='date'
                                            className='input-end-date'
                                        />
                                    </div>
                                </div>

                                {/* more info */}
                                <div className='modal-body-info-more'>
                                    <p>Thông tin thêm</p>
                                    <TextArea
                                        name='info'
                                        className='modal-text'
                                        placeholder="Nhập thêm thông tin"
                                        style={{ width: 641, height: 139, resize: 'none' }}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer-HV">
                                <button type='submit' className='button-update'>Cập nhật</button>
                                <button onClick={() => {
                                    handleCloseModal()
                                }} className='button-delete'>Hủy bỏ</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
