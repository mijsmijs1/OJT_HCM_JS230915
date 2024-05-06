

import { Store } from '@/store';
import './goodJob.scss'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchJobForHomePage } from '@/store/slices/job/job.slice';
import { Skeleton } from 'antd';
import { formatTimeAgo } from '@/utils/common/format_time_ago_function';

export default function GoodJob() {
    const dispatch = useDispatch();
    const jobStore = useSelector((store: Store) => store.jobStore)
    const companyStore = useSelector((store: Store) => store.companyStore)
    useEffect(() => {
        dispatch(fetchJobForHomePage() as any)
    }, [])
    console.log(jobStore.jobs)
    return (
        <div className='good_job_container'>
            <div className='content'>
                <div className='label'>
                    <p>Công việc nổi bật</p>
                    <div className='more'>
                        <p>Xem thêm</p>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12H19" stroke="#BC2228" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12 5L19 12L12 19" stroke="#BC2228" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                    </div>
                </div>
                {
                    jobStore.loadingJobs ? <Skeleton active></Skeleton> : <div className='jobs'>
                        {
                            jobStore.jobs?.map(item => {
                                return (
                                    <div key={Date.now() * Math.random()} className='item' >
                                        <div className='work' onClick={() => {
                                            window.location.href = `/job-info/${item.id}`
                                        }}>
                                            <div className='title'>
                                                <div className='title_content'>
                                                    <p>{item.title}</p>
                                                    <div className='type'><span>{item.levelJob?.name}</span></div>
                                                </div>

                                                <div>
                                                    {
                                                        item.typeJobs?.map(item => {
                                                            return (<div className='featured'>
                                                                <span>{item.name}</span>
                                                            </div>)
                                                        })
                                                    }
                                                </div>
                                            </div>

                                            <div>

                                                <span>Lương: {item.salary}</span>
                                                <span style={{ marginLeft: 15 }}>ー</span>
                                                <span style={{ marginLeft: 15 }}>Cập nhật: {formatTimeAgo(item.updated_at)}</span>
                                            </div>
                                        </div>
                                        <div className='company_info'>
                                            <div className='info' onClick={() => {
                                                window.location.href = `/company-info/${item.company?.id}`
                                            }}>
                                                <img src={item.company?.logo} alt='logo'></img>
                                                <div>
                                                    <p>{item.company?.name}</p>
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
                                            <div className='save'>
                                                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M18.5 21L12.4993 17.25L6.5 21V4.5C6.5 4.30109 6.57902 4.11032 6.71967 3.96967C6.86032 3.82902 7.05109 3.75 7.25 3.75H17.75C17.9489 3.75 18.1397 3.82902 18.2803 3.96967C18.421 4.11032 18.5 4.30109 18.5 4.5V21Z" stroke="#C8CCD1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>

                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                }

            </div>
        </div>
    )
}
