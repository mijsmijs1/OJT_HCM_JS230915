import './editCompanyFrom.scss'

export default function EditCompanyForm({ setDisplayEditForm }: {
    setDisplayEditForm: any
}) {
    return (
        <div className='company_edit_form_container'>
            <form>
                <h3>Cập nhật thông tin doanh nghiệp</h3>
                <div className='all_input'>


                    <div className='input_group'>
                        <p>Tên công ty</p>
                        <div className='input_container'>
                            <input type='text' placeholder='ABC Corp'></input>
                        </div>

                    </div>

                    <div className='input_group'>
                        <p>Website</p>
                        <div className='input_container'>
                            <input type='text' placeholder='ABC Corp'></input>
                        </div>

                    </div>

                    <div className='input_group'>
                        <p>Facebook</p>
                        <div className='input_container'>
                            <input type='text' placeholder='ABC Corp'></input>
                        </div>

                    </div>

                    <div className='input_group'>
                        <p>Linkeidn</p>
                        <div className='input_container'>
                            <input type='text' placeholder='ABC Corp'></input>
                        </div>

                    </div>

                    <div className='input_group'>
                        <p>Github</p>
                        <div className='input_container'>
                            <input type='text' placeholder='ABC Corp'></input>
                        </div>

                    </div>

                    <div className='input_group'>
                        <p>Địa chỉ công ty</p>
                        <div className='input_container'>
                            <input type='text' placeholder='ABC Corp'></input>
                        </div>

                    </div>

                    <div className='input_group'>
                        <p>Mô tả về công ty</p>
                        <div className='input_container textarea'>
                            <textarea>

                            </textarea>
                        </div>

                    </div>

                    <div className='input_group'>
                        <p>Chính sách </p>
                        <div className='input_container textarea'>
                            <textarea>

                            </textarea>
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
