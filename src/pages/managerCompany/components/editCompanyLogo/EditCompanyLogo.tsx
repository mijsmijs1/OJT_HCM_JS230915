import { MAX_IMAGE_SIZE, MIN_IMAGE_HEIGHT, MIN_IMAGE_WIDTH } from '@/constants/constants';
import apis from '@/services/apis';
import { Store } from '@/store';
import { Modal, message } from 'antd';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './editCompanyLogo.scss'
import { uploadToFirebase } from '@/services/firebase';
import { updateCompany } from '@/store/slices/company/company.slice';
import { unwrapResult } from '@reduxjs/toolkit';
export default function EditCompanyLogo({ setShowAvatar }: {
    setShowAvatar: any
}) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedImg, setSelectedImg] = useState(null);
    const inputRef = useRef(null);
    const dispatch = useDispatch();
    const companyStore = useSelector((store: Store) => store.companyStore)


    const handlePic = () => {
        (inputRef.current as any).click();
    };

    const handleFileChange = (event: React.FormEvent) => {
        const file = (event.target as any).files[0];
        const { type, size } = file;

        if (!type.includes("image")) {
            message.warning(`${file.name} có định dạng không thích hợp.`);
            return;
        }

        const image = new Image();
        image.src = URL.createObjectURL(file);

        if (size > MAX_IMAGE_SIZE) {
            message.warning(`${file.name} có dung lượng quá lớn.`);
            return;
        }

        image.onload = () => {
            if (image.width < MIN_IMAGE_WIDTH || image.height < MIN_IMAGE_HEIGHT) {
                message.warning(`${file.name} có kích thước quá nhỏ.`);
                return;
            }
            setSelectedFile(file);
            setSelectedImg(URL.createObjectURL(file));
            message.success("Đã tải ảnh lên thành công!");
            URL.revokeObjectURL(image.src);
        };
    };
    const handleChangeAvatar = async () => {
        try {
            if (!selectedFile) {
                message.error('Không có sự thay đổi logo!')
                return
            }
            let newLogo = await uploadToFirebase(selectedFile, companyStore.company?.logo)
            let result = await dispatch(updateCompany({ companyId: companyStore.company?.id || 0, updateCompanyData: { logo: newLogo } }) as any)
            let { message: ApiMessage, data } = unwrapResult(result)
            Modal.success({
                title: "Thành công!",
                content: `${ApiMessage}`,
                onOk: () => {
                    setShowAvatar(false)
                }
            })
            return
        } catch (err: any) {
            if (err.message) {
                Modal.error({
                    title: 'Thất bại!',
                    content: `${err.message}`,
                    onOk: () => { }
                })
                return
            }
            Modal.error({
                title: 'Thất bại!',
                content: `Lỗi hệ thống, vui lòng thử lại sau!`,
                onOk: () => { }
            })
            return
        }




    }
    return (
        <div className='product_describe_form'>
            <div className='avatar'>
                <p onClick={() => {
                    setShowAvatar(false)
                }}>✕</p>
                <h5>Thay đổi logo đại diện cho công ty của bạn!</h5>
                <input type='file' ref={inputRef} className='img_input' style={{ display: "none" }} onChange={(e) => { handleFileChange(e) }} />
                <img src={selectedImg ? selectedImg : companyStore.company?.logo} alt="Selected Image"></img>
                <i className={selectedFile ? `fa-solid fa-check` : "fa-solid fa-image"} style={selectedFile ? { color: "#49CC90" } : { color: "black" }}></i>
                <span style={selectedFile ? { color: "#49CC90" } : { color: "black" }}>Hình ảnh phải có kích thước tối thiểu 50 x 50 pixel!</span>
                <button onClick={() => { handlePic() }}>Chọn ảnh</button>
                <button onClick={() => { handleChangeAvatar() }}>Lưu ảnh đại diện</button>
            </div>
        </div>
    )
}