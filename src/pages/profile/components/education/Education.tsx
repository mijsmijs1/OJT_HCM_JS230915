import React from 'react'
import "./education.scss"
import { Flex, Input, Select } from 'antd';
export default function Education(props: { setOpenModalHV: any }) {
    const { TextArea } = Input;
    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log('Change:', e.target.value);
    };
    const handleCloseModal = () => {
        props.setOpenModalHV(false) // Sử dụng setOpenModalEX như một hàm setState
    };
    return (
        <div>
            <div id="myModal" className="modal">

                {/* <!-- Modal content --> */}
                <div className="modal-content-HV">
                    <div className="modal-header-HV">
                        <h2>Học vấn</h2>
                    </div>
                    <div className="modal-body-HV">
                        <form action="">
                            <div className='modal-body-menu'>
                                <div className='modal-body-item'>
                                    <label htmlFor="school">Trường</label><br />
                                    <Input
                                        className='input-school'
                                        placeholder="ABC Corp"
                                    />
                                </div>
                                <div className='modal-body-item'>
                                    <label htmlFor="major">Ngành Học</label><br />
                                    <Input
                                        className='input-major'
                                        placeholder="ABC Corp"
                                    />
                                </div>
                                <div className='modal-body-item-v2'>
                                    <p>Thời gian học tập</p>
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
                                <div className='modal-body-info-more'>
                                    <p>Thông tin thêm</p>
                                    <TextArea
                                        className='modal-text'
                                        onChange={onChange}
                                        placeholder="Hint text"
                                        style={{ width: 641, height: 139, resize: 'none' }}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer-HV">
                        <button className='button-update'>Cập nhật</button>
                        <button onClick={() => {
                            handleCloseModal()
                        }} className='button-delete'>Hủy bỏ</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
