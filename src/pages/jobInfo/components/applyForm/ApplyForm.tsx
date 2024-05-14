import { useRef, useState } from 'react';
import './applyForm.scss'
import { useDispatch } from 'react-redux';
import { Modal, message } from 'antd';
import { MAX_CV_SIZE, VALID_CV_TYPES } from '@/constants/constants';
import { uploadToFirebase } from '@/services/firebase';
import { unwrapResult } from '@reduxjs/toolkit';
import { applyJob } from '@/store/slices/candidate/candidate.slice';
import { refreshToken } from '@/utils/common/refreshTokenFunction';

export default function ApplyForm({ setDisplayApplyForm, jobId }: { setDisplayApplyForm: any, jobId: number }) {
    const dispatch = useDispatch()
    const inputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = (event.target as any).files[0];

        if (!file) {
            message.warning("Vui lòng chọn một file.");
            return;
        }

        const { type, size } = file;

        if (!VALID_CV_TYPES.includes(type)) {
            message.warning(`${file.name} có định dạng không thích hợp.`);
            if (inputRef.current) {
                (inputRef.current as any).value = "";
            }
            setSelectedFile(null)
            return;
        }

        if (size > MAX_CV_SIZE) {
            message.warning(`${file.name} có dung lượng quá lớn.`);
            if (inputRef.current) {
                (inputRef.current as any).value = "";
            }
            setSelectedFile(null)
            return;
        }

        setSelectedFile(file);
        message.success("Đã tải CV lên thành công!");
    };
    const handleSubmitCreateCompany = async (e: React.FormEvent) => {
        e.preventDefault();

        try {

            const description = (e.target as any).description.value
            console.log(selectedFile)
            if (!description || !selectedFile) {
                message.error('Phải nhập đầy đủ thông tin của các trường!')
                return
            }
            let CV_file = await uploadToFirebase(selectedFile, 'https://example.com/logo.png')
            let applyData = {
                cv_url: CV_file,
                content: description,
                job_id: jobId
            }
            let result = await dispatch(applyJob({ applyData }) as any)
            let { message: apiMessage } = unwrapResult(result)
            refreshToken()
            Modal.success({
                title: 'Thành công',
                content: apiMessage,
                onOk: () => {
                    (e.target as any).reset()
                    setDisplayApplyForm(false)
                }
            })
            return
        } catch (err: any) {
            console.log(err)
            if (err.message) {
                Modal.error({
                    title: 'Thất bại!',
                    content: `${err.message}`,
                    onOk: () => { setDisplayApplyForm(false) }
                })
                return
            }
            Modal.error({
                title: 'Thất bại!',
                content: `Lỗi hệ thống, vui lòng thử lại sau!`,
                onOk: () => { setDisplayApplyForm(false) }
            })
            return
        }
    }
    return (
        <div className='apply_edit_form_container'>
            <form onSubmit={(e) => {
                handleSubmitCreateCompany(e)
            }}>
                <h3>Ứng tuyển công việc</h3>
                <div className='all_input' >
                    <div className='input_group'>
                        <p>Upload CV của bạn</p>
                        <input type='file' ref={inputRef} className='img_input' onChange={(e) => { handleFileChange(e) }} />
                    </div>

                    <div className='input_group'>
                        <p>Nội dung thư xin việc</p>
                        <div className='input_container textarea'>
                            <textarea name='description' placeholder='Nhập nội dung thư xin việc'>
                            </textarea>
                        </div>
                    </div>
                </div>
                <div className='all_button'>
                    <button type='submit'>
                        Ứng tuyển
                    </button>
                    <div className='delete' onClick={() => {
                        setDisplayApplyForm(false)
                    }}>
                        <span>
                            Hủy bỏ
                        </span>
                    </div>
                </div>
            </form >
        </div >
    )
}
