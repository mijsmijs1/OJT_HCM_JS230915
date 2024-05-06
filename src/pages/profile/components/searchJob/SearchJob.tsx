import { useDispatch, useSelector } from 'react-redux';
import './searchJob.scss'
import { Store } from '@/store';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Select, Skeleton } from 'antd';
import { OptionLocation } from '@/constants/constants';
import { getJobForSearch } from '@/store/slices/job/job.slice';
import { formatTimeAgo } from '@/utils/common/format_time_ago_function';


export default function SearchJob() {

    const dispatch = useDispatch()
    const companyStore = useSelector((store: Store) => store.companyStore)
    const jobStore = useSelector((store: Store) => store.jobStore)
    const navigate = useNavigate()
    const searchParams = new URLSearchParams(location.search);
    let page = Number(searchParams.get('page') || 1);
    let keyword = String(searchParams.get('keyword') || 'all')
    let address = String(searchParams.get('address') || 'all')
    let levelJobId = Number(searchParams.get('level') || 0)
    let typeJobId = Number(searchParams.get('type') || 0)
    let timeString = String(searchParams.get('time') || 'created_at')
    const [currentPage, setCurrentPage] = useState(page || 1);
    const [totalPages, setTotalPages] = useState(0);
    const [displayFilter, setDisplayFilter] = useState(false)
    const [levelJob, setLevelJob] = useState<number | null>(jobStore.job?.levelJob?.id || 0);
    const [selectedTypeValues, setSelectedTypeValues] = useState<number>(0);
    const [time, setTime] = useState<string | null>('created_at');
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    useEffect(() => {
        if (jobStore.jobCount) {
            setTotalPages(Math.ceil(jobStore.jobCount / 12))
        }
    })
    useEffect(() => {
        // dispatch(fetchJobForCompanyPage({ companyId, page: page || 1 }) as any)
    }, [page])
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
                        navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '')}?page=${page}`)
                    } else {
                        navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '').replace(/(page=)[^\&]+/, `$1${page}`)}`)
                    }
                }}
            >
                {page}
            </span>
        ));
    };

    const [selectedCity, setSelectedCity] = useState(address != 'all' ? address : '')
    useEffect(() => {
        console.log(page, keyword, address, levelJobId, typeJobId, timeString)
        dispatch(getJobForSearch({ page, pageSize: 12, keyword, address, typeJobId, levelJobId, time: timeString }) as any)
    }, [page, keyword, address, levelJobId, typeJobId, timeString])
    const handleRadioChange = (value: string) => {
        setSelectedOption(value);

        if (value === 'option1') {
            setTime('updated_at');
        } else if (value === 'option2') {
            setTime('created_at');
        }
    };
    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '')}?page=${1}`)
            if (!window.location.href.includes('keyword')) {
                if (!window.location.href.includes('search-job?')) {
                    navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '')}?keyword=${(e.target as any).keyword.value || 'all'}`)
                }
                navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '')}&keyword=${(e.target as any).keyword.value || 'all'}`)
            } else {
                navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '').replace(/(keyword=)[^\&]+/, `$1${(e.target as any).keyword.value || 'all'}`)}`)
            }
            if (!window.location.href.includes('address')) {
                if (!window.location.href.includes('search-job?')) {
                    navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '')}?address=${selectedCity || 'all'}`)
                }
                navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '')}&address=${selectedCity || 'all'}`)
            } else {
                navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '').replace(/(address=)[^\&]+/, `$1${selectedCity || 'all'}`)}`)
            }
            if (!window.location.href.includes('level')) {
                if (!window.location.href.includes('search-job?')) {
                    navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '')}?level=${levelJob || 0}`)
                }
                navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '')}&level=${levelJob || 0}`)
            } else {
                navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '').replace(/(level=)[^\&]+/, `$1${levelJob || 0}`)}`)
            }
            if (!window.location.href.includes('type')) {
                if (!window.location.href.includes('search-job?')) {
                    navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '')}?type=${selectedTypeValues || 0}`)
                }
                navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '')}&type=${selectedTypeValues || 0}`)
            } else {
                navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '').replace(/(type=)[^\&]+/, `$1${selectedTypeValues || 0}`)}`)
            }
            if (!window.location.href.includes('time')) {
                if (!window.location.href.includes('search-job?')) {
                    navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '')}?time=${time || 'created_at'}`)
                }
                navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '')}&time=${time || 'created_at'}`)
            } else {
                navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '').replace(/(time=)[^\&]+/, `$1${time || 'created_at'}`)}`)
            }
        } catch (err) {

        }
    }
    const handleOnChangeLocation = async (address: string) => {
        try {
            if (!window.location.href.includes('address')) {
                if (!window.location.href.includes('search-job?')) {
                    navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '')}?address=${address || 'all'}`)
                }
                navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '')}&address=${address || 'all'}`)
            } else {
                navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '').replace(/(address=)[^\&]+/, `$1${address || 'all'}`)}`)
            }
        } catch (err) {

        }
    }
    const handleOnChangeLevel = async (levelId: number) => {
        try {
            if (!window.location.href.includes('level')) {
                if (!window.location.href.includes('search-job?')) {
                    navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '')}?level=${levelId || 0}`)
                }
                navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '')}&level=${levelId || 0}`)
            } else {
                navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '').replace(/(level=)[^\&]+/, `$1${levelId || 0}`)}`)
            }
        } catch (err) {

        }
    }
    const handleOnChangeType = async (typeId: number) => {
        try {
            if (!window.location.href.includes('type')) {
                if (!window.location.href.includes('search-job?')) {
                    navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '')}?type=${typeId || 0}`)
                }
                navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '')}&type=${typeId || 0}`)
            } else {
                navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '').replace(/(type=)[^\&]+/, `$1${typeId || 0}`)}`)
            }
        } catch (err) {

        }
    }
    const handleOnChangeTime = async (time: string) => {
        try {
            if (!window.location.href.includes('time')) {
                if (!window.location.href.includes('search-job?')) {
                    navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '')}?time=${time || 'created_at'}`)
                }
                navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '')}&time=${time || 'created_at'}`)
            } else {
                navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '').replace(/(time=)[^\&]+/, `$1${time || 'created_at'}`)}`)
            }
        } catch (err) {

        }
    }
    console.log(jobStore.jobs)
    return (
        <>
            {/* <Breadcrumb /> */}
            <div className='search_candidate_container'>
                <div className='content'>
                    <div className='search_input'>
                        <form onSubmit={(e) => {
                            handleSearch(e)
                        }}>
                            <div className='keyword'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#BC2228" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M20.9999 20.9999L16.6499 16.6499" stroke="#BC2228" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>

                                <input type='text' id="keyword" placeholder='Search by: Job Title...' defaultValue={keyword != 'all' ? keyword : undefined}>

                                </input>
                            </div>
                            <div className='location'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 12.75C13.6569 12.75 15 11.4069 15 9.75C15 8.09315 13.6569 6.75 12 6.75C10.3431 6.75 9 8.09315 9 9.75C9 11.4069 10.3431 12.75 12 12.75Z" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M19.5 9.75C19.5 16.5 12 21.75 12 21.75C12 21.75 4.5 16.5 4.5 9.75C4.5 7.76088 5.29018 5.85322 6.6967 4.4467C8.10322 3.04018 10.0109 2.25 12 2.25C13.9891 2.25 15.8968 3.04018 17.3033 4.4467C18.7098 5.85322 19.5 7.76088 19.5 9.75V9.75Z" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>

                                <Select value={selectedCity || ''} onChange={(value) => {
                                    setSelectedCity(value)
                                    handleOnChangeLocation(value)
                                }}>
                                    <Select.Option value="" disabled hidden>Chọn thành phố</Select.Option>
                                    {OptionLocation.map(province => (
                                        <Select.Option key={province} value={province}>
                                            {province}
                                        </Select.Option>
                                    ))}
                                </Select>


                            </div>
                            <div className='filters' style={{ backgroundColor: displayFilter ? '#cacdd3' : '#F1F2F4', border: displayFilter ? '2px solid #b2c8f3' : 'none' }} onClick={() => { setDisplayFilter(!displayFilter) }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 10.125L12 20.25" stroke="#18191C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M12 3.75L12 6.375" stroke="#18191C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M12 10.125C13.0355 10.125 13.875 9.28553 13.875 8.25C13.875 7.21447 13.0355 6.375 12 6.375C10.9645 6.375 10.125 7.21447 10.125 8.25C10.125 9.28553 10.9645 10.125 12 10.125Z" stroke="#18191C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M18.75 17.625L18.7501 20.25" stroke="#18191C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M18.7501 3.75L18.75 13.875" stroke="#18191C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M18.75 17.625C19.7855 17.625 20.625 16.7855 20.625 15.75C20.625 14.7145 19.7855 13.875 18.75 13.875C17.7145 13.875 16.875 14.7145 16.875 15.75C16.875 16.7855 17.7145 17.625 18.75 17.625Z" stroke="#18191C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M5.25007 14.625L5.25 20.25" stroke="#18191C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M5.25 3.75L5.25007 10.875" stroke="#18191C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M5.25 14.625C6.28553 14.625 7.125 13.7855 7.125 12.75C7.125 11.7145 6.28553 10.875 5.25 10.875C4.21447 10.875 3.375 11.7145 3.375 12.75C3.375 13.7855 4.21447 14.625 5.25 14.625Z" stroke="#18191C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <span>
                                    Filters
                                </span>
                            </div>
                            <button type='submit'>
                                Find Job
                            </button>
                        </form>
                    </div>
                    {
                        displayFilter && <div className='search_input sort_content'>
                            <div className='sort_content'>
                                <div className='experiece item'>
                                    <Select value={levelJob || ""} onChange={
                                        (value) => {
                                            setLevelJob(Number(value))
                                            handleOnChangeLevel(Number(value))
                                        }
                                    } >
                                        <Select.Option value="" disabled hidden>Chọn loại Level</Select.Option>
                                        {[{ id: 0, name: 'Tát cả' }, ...(Array.isArray(jobStore.levelJob) ? jobStore.levelJob : [])]?.map(item => (
                                            <Select.Option key={Date.now() * Math.random()} value={item.id}>
                                                {item.name}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </div>
                                <div className='tech item'>
                                    <Select value={selectedTypeValues || ""} onChange={
                                        (value) => {
                                            setSelectedTypeValues(Number(value))
                                            handleOnChangeType(Number(value))
                                        }
                                    } >
                                        <Select.Option value="" disabled hidden>Chọn công nghệ</Select.Option>
                                        {[{ id: 0, name: 'Tát cả' }, ...(Array.isArray(jobStore.typeJob) ? jobStore.typeJob : [])]?.map(item => (
                                            <Select.Option key={Date.now() * Math.random()} value={item.id}>
                                                {item.name}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </div>
                                <div className='languagues item' onClick={
                                    () => {
                                        handleRadioChange('option1')
                                        handleOnChangeTime("updated_at")
                                    }
                                }>
                                    <input type="radio" id="updated_at" name="updated_at" value="option1" checked={selectedOption === 'option1'} />
                                    <label htmlFor="option1">Mới cập nhật</label><br />
                                </div>
                                <div className='position item' onClick={
                                    () => {
                                        handleRadioChange('option2')
                                        handleOnChangeTime("created_at")
                                    }
                                }>
                                    <input type="radio" id="created_at" name="created_at" value="option2" checked={selectedOption === 'option2'} />
                                    <label htmlFor="option2">Mới đăng</label><br />
                                </div>
                                <div className='sort item'>
                                    <span>Lọc</span>

                                </div>
                            </div>
                        </div>
                    }
                    <div className='search_result'>
                        <div className='label'>
                            <p>Kết quả tìm kiếm</p>
                        </div>
                        {
                            jobStore.jobs ? (
                                <>
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
                                </>
                            ) : <img
                                style={{ width: 800, height: 600 }}
                                src='https://cdn.dribbble.com/users/2382015/screenshots/6065978/no_result.gif'></img>
                        }


                    </div>
                    {/* <GoodCandidate /> */}
                    {/* Phan trang */}
                    <div className="pagination">
                        <span onClick={() => {
                            onPageChange(currentPage - 1)
                            if (!window.location.href.includes('page')) {
                                navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '')}?page=${currentPage - 1}`)
                            } else {
                                navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '').replace(/(page=)[^\&]+/, `$1${currentPage - 1}`)}`)
                            }
                        }}>&lt;</span>
                        {renderPageNumbers()}
                        <span onClick={() => {
                            onPageChange(currentPage + 1)
                            if (!window.location.href.includes('page')) {
                                navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '')}?page=${currentPage - 1}`)
                            } else {
                                navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '').replace(/(page=)[^\&]+/, `$1${currentPage + 1}`)}`)
                            }
                        }}>&gt;</span>
                    </div>
                </div>
            </div >
        </>

    )
}
