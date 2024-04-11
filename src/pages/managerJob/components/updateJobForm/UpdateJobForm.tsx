import { Input } from 'antd'
import './updateJobForm.scss'

export default function UpdateJobForm({ setDisplayEditForm }: {
    setDisplayEditForm: any
}) {
    return (
        <div className='update_job_form_container'>
            <form>
                <h3>Cập nhật thông tin công việc</h3>
                <div className='all_input'>


                    <div className='input_group'>
                        <p>Tên công việc</p>
                        <div className='input_container'>
                            <input type='text' placeholder='ABC Corp'></input>
                        </div>

                    </div>

                    <div className='input_group time'>
                        <p>Thời gian làm việc</p>
                        <div className='input_container'>
                            <select name="cars" id="cars">
                                <option value="volvo">Volvo</option>
                                <option value="saab">Saab</option>
                                <option value="mercedes">Mercedes</option>
                                <option value="audi">Audi</option>
                            </select>
                        </div>

                    </div>

                    <div className='input_group'>
                        <p>Mức lương</p>
                        <div className='input_container'>
                            <input type='text' placeholder='$200 - $1500'></input>
                        </div>

                    </div>

                    <div className='input_group time'>
                        <p>Cấp độ chuyên môn</p>
                        <div className='input_container'>
                            <select name="cars" id="cars">
                                <option value="volvo">Volvo</option>
                                <option value="saab">Saab</option>
                                <option value="mercedes">Mercedes</option>
                                <option value="audi">Audi</option>
                            </select>
                        </div>

                    </div>

                    <div className='input_group'>
                        <p>Mô tả công việc</p>
                        <div className='input_container textarea'>
                            <textarea>

                            </textarea>
                        </div>

                    </div>

                    <div className='input_group'>
                        <p>Yêu cầu của công việc</p>
                        <div className='input_container textarea'>
                            <textarea>

                            </textarea>
                        </div>

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
                </div>

                <div className='all_button'>
                    <button type='submit'>
                        Cập nhật
                    </button>
                    <div className='delete' onClick={() => {
                        setDisplayEditForm(false)
                    }}>
                        <span>
                            Hủy bỏ
                        </span>
                    </div>
                </div>
            </form>
        </div>
    )
}
