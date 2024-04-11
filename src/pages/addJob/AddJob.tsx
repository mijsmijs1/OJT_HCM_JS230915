import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import './addJob.scss'

export default function AddJob() {
    return (
        <>
            <Breadcrumb />
            <div className='addJob_container'>
                <div className='content'>
                    <h3>Thêm việc làm mới</h3>
                    <form>
                        <div className='all_input'>


                            <div className='input_group'>
                                <p>Tên công việc</p>
                                <div className='input_container'>
                                    <input type='text' placeholder='ABC Corp'></input>
                                </div>

                            </div>

                            <div className='input_group location'>
                                <p>Địa điểm</p>
                                <div className='input_container'>
                                    <select name="cars" id="cars">
                                        <option value="volvo">Volvo</option>
                                        <option value="saab">Saab</option>
                                        <option value="mercedes">Mercedes</option>
                                        <option value="audi">Audi</option>
                                    </select>
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
                            <div className='input_group start'>
                                <p>Thời hạn bắt đầu ứng tuyển</p>
                                <div className='input_container'>
                                    <input type='date'></input>
                                </div>

                            </div>
                            <div className='input_group end'>
                                <p>Thời hạn kết thúc ứng tuyển</p>
                                <div className='input_container'>
                                    <input type='date'></input>
                                </div>

                            </div>

                            <div className='input_group'>
                                <p>Mô tả công việc</p>
                                <div className='input_container textarea'>
                                    <textarea>

                                    </textarea>
                                </div>

                            </div>
                        </div>
                        <div className='all_button'>
                            <button type='submit'>
                                Thêm mới
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
