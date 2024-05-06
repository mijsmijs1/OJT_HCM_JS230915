import { useEffect, useRef, useState } from 'react';
import './applyForm.scss'
import { useDispatch, useSelector } from 'react-redux';
import { Input, Modal, Select, message } from 'antd';
import apis from '@/services/apis';
import { Store } from '@/store';
import { createAddress, createCompany, fetchTypeCompany } from '@/store/slices/company/company.slice';
import { COMPANY_SIZES, MAX_CV_SIZE, MAX_IMAGE_SIZE, MIN_IMAGE_HEIGHT, MIN_IMAGE_WIDTH, VALID_CV_TYPES } from '@/constants/constants';
import { isValidEmail, isValidPhone, isValidUrl } from '@/utils/common/validate_form';
import { uploadToFirebase } from '@/services/firebase';
import { unwrapResult } from '@reduxjs/toolkit';

export default function ApplyForm({ setDisplayApplyForm }: { setDisplayApplyForm: any }) {
    const dispatch = useDispatch()
    const companyStore = useSelector((store: Store) => store.companyStore)
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
            (event.target as any).files = null;
            return;
        }

        if (size > MAX_CV_SIZE) {
            message.warning(`${file.name} có dung lượng quá lớn.`);
            (event.target as any).files = null;
            return;
        }

        setSelectedFile(file);
        message.success("Đã tải CV lên thành công!");
    };
    const handleSubmitCreateCompany = async (e: React.FormEvent) => {
        e.preventDefault();

        try {

            const description = (e.target as any).description.value
            if (!description) {
                message.error('Phải nhập đầy đủ thông tin của các trường!')
                return
            }

            await uploadToFirebase(selectedFile, 'https://example.com/logo.png')

            // await dispatch(createAddress({ companyId: data.id, createData: createNewAddress }) as any)
            // Modal.success({
            //     title: 'Thành công',
            //     content: ApiMessage,
            //     onOk: () => {
            //         (e.target as any).reset()
            //         setDisplayApplyForm(false)
            //     }
            // })
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
        <div className='company_edit_form_container'>
            <form onSubmit={(e) => {
                handleSubmitCreateCompany(e)
            }}>
                <h3>Đăng kí công ty</h3>
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
