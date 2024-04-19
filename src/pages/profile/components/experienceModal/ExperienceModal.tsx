import React from 'react'
import { Input, Modal } from 'antd'
import api from '@services/apis'

import "./experienceModal.scss"

export default function ExperienceModal(props: { setOpenModalEX: any }) {
    const { TextArea } = Input
    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log('Change:', e.target.value)
    }
    const handleCloseModal = () => {
        props.setOpenModalEX(false)
    }

    const handleExperienceForm = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const position = (e.target as any).position.value
            const company = (e.target as any).unit.value
            const started_at = (e.target as any).startDate.value
            const end_at = (e.target as any).endDate.value
            const info = (e.target as any).detail.value

            // data
            let data = {
                position,
                company,
                started_at,
                end_at,
                info
            }
            console.log(data);
            

            let result = await api.candidateApi.createExperience(data)
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
                                        placeholder="ABC Corp"
                                    />
                                </div>
                                <div className='modal-body-item'>
                                    <label htmlFor="major">Tên đơn vị công tác</label><br />
                                    <Input
                                        name="unit"
                                        className='input-major'
                                        placeholder="ABC Corp"
                                    />
                                </div>
                                <div className='modal-body-item-v2'>
                                    <p>Thời gian làm việc</p>
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
                                <div className='modal-body-info-more-EX'>
                                    <p>Mô tả chi tiết công việc</p>
                                    <TextArea
                                        name='detail'
                                        className='modal-text'
                                        onChange={onChange}
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
