import React, { useState } from 'react'
import { Flex, Input } from 'antd';
import "./experienceModal.scss"
export default function ExperienceModal(props: { setOpenModalEX: any }) {
    const { TextArea } = Input;
    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log('Change:', e.target.value);
    };
    const handleCloseModal = () => {
        props.setOpenModalEX(false) // Sử dụng setOpenModalEX như một hàm setState
    };
    return (
        <div>
            <div id="myModal" className="modal">

                {/* <!-- Modal content --> */}
                <div className="modal-content-EX">
                    <div className="modal-header-EX">
                        <h2>Kinh nghiệm làm việc</h2>
                    </div>
                    <div className="modal-body-EX">
                        <form action="">
                            <div className='modal-body-menu'>
                                <div className='modal-body-item'>
                                    <label htmlFor="school">Vị trí</label><br />
                                    <Input
                                        className='input-school'
                                        placeholder="ABC Corp"
                                    />
                                </div>
                                <div className='modal-body-item'>
                                    <label htmlFor="major">Tên đơn vị công tác</label><br />
                                    <Input
                                        className='input-major'
                                        placeholder="ABC Corp"
                                    />
                                </div>
                                <div className='modal-body-item-v2'>
                                    <p>Thời gian làm việc</p>
                                    <div className='modal-body-item-date'>
                                        <label htmlFor="start-date">Start Date</label><br />
                                        <Input
                                            className='input-start-date'
                                            placeholder="Sept 12, 2021"
                                        />
                                    </div>
                                    <p>to</p>
                                    <div className='modal-body-item-date'>
                                        <label htmlFor="end-date">End Date</label><br />
                                        <Input
                                            className='input-end-date'
                                            placeholder="Oct 12, 2021"
                                        />
                                    </div>
                                </div>
                                <div className='modal-body-info-more-EX'>
                                    <p>Mô tả chi tiết công việc</p>
                                    <TextArea
                                        className='modal-text'
                                        onChange={onChange}
                                        placeholder="Hint text"
                                        style={{ width: 641, height: 169, resize: 'none' }}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer-EX">
                        <button className='button-update'>Cập nhật</button>
                        <button onClick={handleCloseModal} className='button-delete'>Hủy bỏ</button>
                    </div>
                </div>

            </div>
        </div>
    )
}
