import React from 'react'
import { Input, Modal } from 'antd'
import api from '@services/apis'

import "./education.scss"

export default function Education(props: { setOpenModalHV: any }) {
    const { TextArea } = Input;
    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log('Change:', e.target.value);
    };
    const handleCloseModal = () => {
        props.setOpenModalHV(false)
    };

    const handleEducationForm = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const school = (e.target as any).school.value
            const major = (e.target as any).major.value
            const startDate = (e.target as any).startDate.value
            const endDate = (e.target as any).endDate.value
            const info = (e.target as any).info.value

            // data
            let data = {
                school,
                major,
                startDate,
                endDate,
                info
            }
            console.log(data);

            let result = await api.candidateApi.createEducation(data)
            // Success
            if (result.status == 200) {
                (e.target as any).reset()
                Modal.success({
                    title: 'Successfully',
                    content: result.data.message,
                    onOk: () => {

                    },
                    cancelText: null,
                })
            }

        } catch (err: any) {
            Modal.error({
                title: "Failed!",
                content: err.response?.data?.message.join(" ") || 'Update failed, please try again in few minutes',
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
                                <div className='modal-body-item'>
                                    <label htmlFor="school">Trường</label><br />
                                    <Input
                                        name='school'
                                        className='input-school'
                                        placeholder="ABC Corp"
                                    />
                                </div>
                                <div className='modal-body-item'>
                                    <label htmlFor="major">Ngành Học</label><br />
                                    <Input
                                        name='major'
                                        className='input-major'
                                        placeholder="ABC Corp"
                                    />
                                </div>
                                <div className='modal-body-item-v2'>
                                    <p>Thời gian học tập</p>
                                    <div className='modal-body-item-date'>
                                        <label htmlFor="start-date">Start Date</label><br />
                                        <Input
                                            name='startDate'
                                            className='input-start-date'
                                            placeholder="Sept 12, 2021"
                                        />
                                    </div>
                                    <p>to</p>
                                    <div className='modal-body-item-date'>
                                        <label htmlFor="end-date">End Date</label><br />
                                        <Input
                                            name='endDate'
                                            className='input-end-date'
                                            placeholder="Oct 12, 2021"
                                        />
                                    </div>
                                </div>
                                <div className='modal-body-info-more'>
                                    <p>Thông tin thêm</p>
                                    <TextArea
                                        name='info'
                                        className='modal-text'
                                        onChange={onChange}
                                        placeholder="Hint text"
                                        style={{ width: 641, height: 139, resize: 'none' }}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer-HV">
                                <button className='button-update'>Cập nhật</button>
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
