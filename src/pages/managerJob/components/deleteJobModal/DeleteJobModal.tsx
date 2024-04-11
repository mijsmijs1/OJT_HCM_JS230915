import './deleteJobModal.scss'

export default function DeleteJobModal() {
    return (
        <div className='delete_job_modal'>
            <div className='content'>
                <p>Bạn có chắc chắn xóa công việc này?</p>
                <div className='all_button'>
                    <button type='submit'>
                    Xác nhận
                    </button>
                    <div className='delete' onClick={() => {
                        // setDisplayEditForm(false)
                    }}>
                        <span>
                            Hủy bỏ
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
