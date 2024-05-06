import { Input } from 'antd'

import "./projectModal.scss"

export default function ProjectForm(props: { setOpenProjectForm: any }) {
    const { TextArea } = Input;
    const handleCloseModal = () => {
        props.setOpenProjectForm(false)
    };
    return (
        <div>
            <div id="myModal" className="modal">
                <div className="modal-content-PU">
                    <div className="modal-header-PU">
                        <h2>Dự án cá nhân</h2>
                    </div>
                    <div className="modal-body-PU">
                        <form action="">
                            <div className='modal-body-menu'>
                                <div className='modal-body-item'>
                                    <label htmlFor="school">Tên dự án</label><br />
                                    <Input
                                        name='name'
                                        className='input-school'
                                        placeholder="ABC Corp"
                                    />
                                </div>
                                <div className='modal-body-item'>
                                    <label htmlFor="major">Link demo</label><br />
                                    <Input
                                        className='input-major'
                                        placeholder="ABC Corp"
                                    />
                                </div>
                                <div className='modal-body-item-v2'>
                                    <p>Thời gian thực hiện</p>
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
                                <div className='modal-body-info-more-PU'>
                                    <p>Mô tả chi tiết công việc</p>
                                    <TextArea
                                        className='modal-text'
                                        placeholder="Hint text"
                                        style={{ width: 641, height: 169, resize: 'none' }}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer-PU">
                                <button className='button-update'>Cập nhật</button>
                                <button onClick={handleCloseModal} className='button-delete'>Hủy bỏ</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}
