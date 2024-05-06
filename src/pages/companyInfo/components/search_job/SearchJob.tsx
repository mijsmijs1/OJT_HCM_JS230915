
import './searchJob.scss'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Store } from '@/store'
import { useEffect, useState } from 'react'
import { fetchJobForCompanyPage, updateJob } from '@/store/slices/job/job.slice'
import { Modal, message } from 'antd'
import convertToVNDateFormat from '@/utils/common/convert_date_function'
import { unwrapResult } from '@reduxjs/toolkit'
import { refreshToken } from '@/utils/common/refreshTokenFunction'

export default function SearchJob({ companyId }: { companyId: number }) {
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
                    if (!window.location.href.includes('job-page')) {
                        navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '')}?job-page=${page}`)
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
            </div>


            <div className='job_show'>
                {
                    jobStore.jobs?.map(item => {
                        return (
                            <div key={Date.now() * Math.random()} className='item'>
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
                                    window.location.href = `/job-info/${item.id}`
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
                    if (!window.location.href.includes('job-page')) {
                        navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '')}?job-page=${currentPage - 1}`)
                    } else {
                        navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '').replace(/(job-page=)[^\&]+/, `$1${currentPage - 1}`)}`)
                    }
                }}>&lt;</span>
                {renderPageNumbers()}
                <span onClick={() => {
                    onPageChange(currentPage + 1)
                    if (!window.location.href.includes('job-page')) {
                        navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '')}?job-page=${currentPage - 1}`)
                    } else {
                        navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '').replace(/(job-page=)[^\&]+/, `$1${currentPage + 1}`)}`)
                    }
                }}>&gt;</span>
            </div>

        </div>
    )
}

