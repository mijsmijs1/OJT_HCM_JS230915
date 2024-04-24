import React from 'react'
import { Input, Modal, message } from 'antd'
import apis from '@services/apis'
import { useDispatch } from 'react-redux'
import { candidateCertificateAction } from '@/store/slices/candidate/certificate.slice'

import "./certificateModal.scss"

export default function CertificateForm(props: { setOpenCertificateForm: any }) {
    const dispatch = useDispatch()
    const { TextArea } = Input
    const handleCloseModal = () => {
        props.setOpenCertificateForm(false)
    }

    const handleCertificateForm = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          const name = (e.target as any).name.value;
          const organization = (e.target as any).organization.value;
          const started_at = (e.target as any).startDate.value;
          const end_at = (e.target as any).endDate.value;
          const info = (e.target as any).detail.value;
      
          // Check if any field is empty
          if (!name || !organization || !started_at || !end_at || !info) {
            message.warning("Please fill in all fields");
            return;
          }
      
          // Data
          let data = {
            name,
            organization,
            started_at,
            end_at,
            info,
          };
          console.log(data);
      
          let result = await apis.candidateApi.createCertificate(data);
          
          // Success
          if (result.status === 200) {
            (e.target as any).reset();
            dispatch(candidateCertificateAction.fetchCandidateCertificates())
            Modal.success({
              title: 'Successfully',
              content: result.data.message,
              onOk: handleCloseModal,
              cancelText: null,
            });
          }
        } catch (err: any) {
          Modal.error({
            title: "Failed!",
            content: err.response?.data?.message || 'Update failed, please try again in few minutes',
          });
        }
      };
      
    return (
        <div>
            <div id="myModal" className="modal">
                {/* <!-- Modal content --> */}
                <div className="modal-content-CF">
                    <div className="modal-header-CF">
                        <h2>Chứng chỉ</h2>
                    </div>
                    <div className="modal-body-CF">
                        <form action="" onSubmit={handleCertificateForm}>
                            <div className='modal-body-menu'>
                                <div className='modal-body-item'>
                                    <label htmlFor="school">Tên chứng chỉ</label><br />
                                    <Input
                                        name='name'
                                        className='input-school'
                                        placeholder="ABC Corp"
                                    />
                                </div>
                                <div className='modal-body-item'>
                                    <label htmlFor="major">Tổ chức</label><br />
                                    <Input
                                        name="organization"
                                        className='input-major'
                                        placeholder="ABC Corp"
                                    />
                                </div>
                                <div className='modal-body-item-v2'>
                                    <p>Thời gian</p>
                                    <div className='modal-body-item-date'>
                                        <label htmlFor="start-date">Start Date</label><br />
                                        <Input
                                            name='startDate'
                                            className='input-start-date'
                                            type='date'
                                        />
                                    </div>
                                    <p>to</p>
                                    <div className='modal-body-item-date'>
                                        <label htmlFor="end-date">End Date</label><br />
                                        <Input
                                        name='endDate'
                                            className='input-end-date'
                                            type='date'
                                        />
                                    </div>
                                </div>
                                <div className='modal-body-info-more-CF'>
                                    <p>Mô tả thêm</p>
                                    <TextArea
                                        name='detail'
                                        className='modal-text'
                                        placeholder="Hint text"
                                        style={{ width: 641, height: 169, resize: 'none' }}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer-CF">
                                <button className='button-update' type='submit'>Cập nhật</button>
                                <button onClick={handleCloseModal} className='button-delete'>Hủy bỏ</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}
