import React from 'react'
import { Input } from 'antd'

import "./reviewInfo.scss"

export default function ReviewInfo(props: { setopenModalInfo: any }) {
    const { TextArea } = Input;
    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log('Change:', e.target.value);
    };
    const handleCloseModal = () => {
        props.setopenModalInfo(false) 
    };
    return (
        <div>
            <div id="myModal" className="modal">

                {/* <!-- Modal content --> */}
                <div className="modal-content">
                    <div className="modal-header">
                        <span className="close">&times;</span>
                        <h2>Giới thiệu về bản thân</h2>
                    </div>
                    <div className="modal-body">
                        <p>Mô tả về bản thân, các kĩ năng của mình...</p>
                        <TextArea
                            onChange={onChange}
                            placeholder="Hint text"
                            style={{ width: 641, height: 250, resize: 'none' }}
                        />
                    </div>
                    <div className="modal-footer">
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
