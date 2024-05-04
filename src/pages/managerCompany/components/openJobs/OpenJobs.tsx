
import './openJobs.scss'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Store } from '@/store'
import { useEffect, useState } from 'react'
import { fetchJobForCompanyPage, updateJob } from '@/store/slices/job/job.slice'
import { Modal, message } from 'antd'
import convertToVNDateFormat from '@/utils/common/convert_date_function'
import { unwrapResult } from '@reduxjs/toolkit'
import { refreshToken } from '@/utils/common/refreshTokenFunction'

export default function OpenJobs({ companyId }: { companyId: number }) {
    const companyStore = useSelector((store: Store) => store.companyStore)
    const jobStore = useSelector((store: Store) => store.jobStore)
    const dispatch = useDispatch()
    const searchParams = new URLSearchParams(location.search);
    let page = Number(searchParams.get('job-page'));
    const [currentPage, setCurrentPage] = useState(page || 1);
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        dispatch(fetchJobForCompanyPage({ companyId, page: page || 1 }) as any)
    }, [page])
    useEffect(() => {
        if (jobStore.jobCount) {
            setTotalPages(Math.ceil(jobStore.jobCount / 5))
        }
    })
    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };
    const range = (start: number, end: number) => {
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };
    const renderPageNumbers = () => {
        //Tổng page số là 6
        const maxPagesToShow = 6;
        //Lấy mốc tính là 3
        const sidePages = Math.floor(maxPagesToShow / 2);
        // chọn max giữa 1 và (số page hiện tại - 3) => hiển thị 3 số phía sau của page đang hiển thị
        //Mấy trang đầu sẽ ra âm => tính là 1
        const startPage = Math.max(1, currentPage - sidePages);
        //CHọn min giữa tổng page và (page đã lùi 3 + trang hiện tại -1) => VD: start page =2 thì end =7 (tổng 6)
        //Mấy trang cuối sẽ lớn hơn total
        const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
        //tạo arr rổng
        let pages: any[] = [];
        if (startPage > 1) {
            //Nếu vượt start page > 1 thì sẽ gắn cụm ... vào đầu tiên
            pages = pages.concat([1, '...']);
        }

        pages = pages.concat(range(startPage, endPage));
        //Gắn cụm từ start đến end có 6 phần tử vào giữa
        if (endPage < totalPages) {
            //nếu bé hơn total => đang khúc giữa, => gắn thêm ...
            pages = pages.concat(['...', totalPages]);
        }
        return pages.map((page, index) => (
            <span
                key={index}
                className={`page-number ${page === currentPage ? 'current' : ''}`}
                onClick={() => {
                    onPageChange(page)
                    if (!window.location.href.includes('page')) {
                        navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '')}&&job-page=${page}`)
                    } else {
                        navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '').replace(/(job-page=)[^\&]+/, `$1${page}`)}`)
                    }
                }}
            >
                {page}
            </span>
        ));
    };
    const handleDeleteJob = async (jobId: number) => {
        try {
            let result = await dispatch(updateJob({
                jobId, updateData: {
                    status: 'inactive',
                    company_id: companyId,
                }
            }) as any)
            unwrapResult(result)
            message.success(`Bạn đã xóa công việc thành công!`)
            refreshToken()
            return
        } catch (err: any) {
            if (err.message) {
                message.error(`${err.message}`)
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
    const navigate = useNavigate()
    return (
        <div className='open_jobs_container'>

            <div className='title'>
                <p>Việc làm công ty đang mở</p>
                <div className='add' onClick={() => {
                    navigate(`/add-job/${companyId}`)
                }}>
                    <span>Thêm việc làm mới</span>
                </div>
            </div>


            <div className='job_show'>
                {
                    jobStore.jobs?.map(item => {
                        return (
                            <div key={Date.now() * Math.random()} className='item'>
                                <div className='delete' onClick={() => {
                                    Modal.confirm({
                                        title: "Xác nhận",
                                        content: `Bạn có chắc muốn xóa công việc ${item.title}`,
                                        onOk: () => {
                                            handleDeleteJob(item.id)
                                        },
                                        onCancel: () => { }
                                    })

                                }}>
                                    <svg width="19" height="24" viewBox="0 0 19 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.07422 21.748H14.0293C14.7259 21.748 15.2923 21.5397 15.7285 21.123C16.1647 20.7063 16.3991 20.1465 16.4317 19.4434L17.1054 5.24414H18.2773C18.4791 5.24414 18.6501 5.1709 18.7901 5.02441C18.93 4.87793 19 4.70378 19 4.50195C19 4.30013 18.9284 4.12761 18.7852 3.98438C18.642 3.84115 18.4727 3.76953 18.2773 3.76953H0.826172C0.630859 3.76953 0.459961 3.84277 0.313477 3.98926C0.166992 4.13574 0.09375 4.30664 0.09375 4.50195C0.09375 4.70378 0.166992 4.87793 0.313477 5.02441C0.459961 5.1709 0.630859 5.24414 0.826172 5.24414H1.99805L2.67187 19.4531C2.70442 20.1562 2.93717 20.7145 3.37012 21.1279C3.80306 21.5413 4.37109 21.748 5.07422 21.748ZM5.21094 20.2734C4.93099 20.2734 4.69662 20.179 4.50781 19.9902C4.31901 19.8014 4.2181 19.5638 4.20508 19.2773L3.52148 5.24414H15.5332L14.8886 19.2773C14.8757 19.5703 14.7747 19.8096 14.5859 19.9951C14.3972 20.1806 14.1595 20.2734 13.873 20.2734H5.21094ZM6.65625 18.6035C6.83854 18.6035 6.98503 18.5498 7.0957 18.4424C7.20638 18.3349 7.26172 18.1966 7.26172 18.0273L6.95898 7.57812C6.95898 7.40885 6.90202 7.27214 6.78809 7.16797C6.67416 7.0638 6.5293 7.01172 6.35352 7.01172C6.17123 7.01172 6.02311 7.06543 5.90918 7.17285C5.79525 7.28027 5.74154 7.41862 5.74805 7.58789L6.04102 18.0273C6.04753 18.2031 6.10612 18.3431 6.2168 18.4473C6.32747 18.5514 6.47396 18.6035 6.65625 18.6035ZM9.54687 18.6035C9.73568 18.6035 9.88867 18.5498 10.0059 18.4424C10.1231 18.3349 10.1817 18.1966 10.1817 18.0273V7.58789C10.1817 7.41862 10.1231 7.28027 10.0059 7.17285C9.88867 7.06543 9.73568 7.01172 9.54687 7.01172C9.36458 7.01172 9.21485 7.06543 9.09766 7.17285C8.98047 7.28027 8.92187 7.41862 8.92187 7.58789V18.0273C8.92187 18.1966 8.98047 18.3349 9.09766 18.4424C9.21485 18.5498 9.36458 18.6035 9.54687 18.6035ZM12.4473 18.6035C12.6231 18.6035 12.7663 18.5514 12.877 18.4473C12.9876 18.3431 13.0462 18.2031 13.0527 18.0273L13.3457 7.58789C13.3522 7.41862 13.3001 7.28027 13.1895 7.17285C13.0788 7.06543 12.929 7.01172 12.7402 7.01172C12.5644 7.01172 12.4212 7.0638 12.3105 7.16797C12.1999 7.27214 12.1413 7.41211 12.1348 7.58789L11.8418 18.0273C11.8353 18.1966 11.8874 18.3349 11.998 18.4424C12.1087 18.5498 12.2585 18.6035 12.4473 18.6035ZM5.25977 4.46289H6.8125V2.37305C6.8125 2.09961 6.90202 1.87825 7.08105 1.70898C7.26009 1.53971 7.49609 1.45508 7.78906 1.45508H11.2851C11.5781 1.45508 11.8141 1.53971 11.9931 1.70898C12.1722 1.87825 12.2618 2.09961 12.2618 2.37305V4.46289H13.8145V2.27539C13.8145 1.57226 13.598 1.01725 13.165 0.610352C12.7321 0.203451 12.1413 0 11.3926 0H7.68164C6.93294 0 6.34212 0.203451 5.90918 0.610352C5.47624 1.01725 5.25977 1.57226 5.25977 2.27539V4.46289Z" fill="#FF3B30" />
                                    </svg>

                                </div>
                                <div className='work'>
                                    <p>{item.title} <span>{`Start: ${convertToVNDateFormat(item.created_at)} - End: ${convertToVNDateFormat(item.expire_at)}`}</span></p>
                                    <div>
                                        <div className='type'><span>{item.levelJob?.name}</span></div>
                                        <span>Salary: {item.salary}</span>
                                    </div>
                                </div>
                                <div className='company_info'>
                                    <div className='info'>
                                        <img src={companyStore.company?.logo} alt='logo'></img>
                                        <div>
                                            <p>{companyStore.company?.name}</p>
                                            <span>
                                                <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9.5 9.5625C10.7426 9.5625 11.75 8.55514 11.75 7.3125C11.75 6.06986 10.7426 5.0625 9.5 5.0625C8.25736 5.0625 7.25 6.06986 7.25 7.3125C7.25 8.55514 8.25736 9.5625 9.5 9.5625Z" stroke="#767F8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M15.125 7.3125C15.125 12.375 9.5 16.3125 9.5 16.3125C9.5 16.3125 3.875 12.375 3.875 7.3125C3.875 5.82066 4.46763 4.38992 5.52252 3.33502C6.57742 2.28013 8.00816 1.6875 9.5 1.6875C10.9918 1.6875 12.4226 2.28013 13.4775 3.33502C14.5324 4.38992 15.125 5.82066 15.125 7.3125V7.3125Z" stroke="#767F8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                                {
                                                    item.location?.name
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className='edit' onClick={() => {
                                    window.location.href = `/manager-job/${item.id}`
                                }}>
                                    <span>Show Detail</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {/* Phan trang */}
            <div className="pagination">
                <span onClick={() => {
                    onPageChange(currentPage - 1)
                    if (!window.location.href.includes('page')) {
                        navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '')}&&page=${currentPage - 1}`)
                    } else {
                        navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '').replace(/(page=)[^\&]+/, `$1${currentPage - 1}`)}`)
                    }
                }}>&lt;</span>
                {renderPageNumbers()}
                <span onClick={() => {
                    onPageChange(currentPage + 1)
                    if (!window.location.href.includes('page')) {
                        navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '')}&&page=${currentPage - 1}`)
                    } else {
                        navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '').replace(/(page=)[^\&]+/, `$1${currentPage + 1}`)}`)
                    }
                }}>&gt;</span>
            </div>

        </div>
    )
}

