
import './search.scss'
import { Select } from 'antd'
import { useEffect, useState } from 'react'
import { OptionLocation } from '@/constants/constants'
import { useNavigate } from 'react-router-dom'
import { Store } from '@/store'
import { useDispatch, useSelector } from 'react-redux'
import { searchCompany } from '@/store/slices/company/company.slice'

export default function SearchCompany() {
    const dispatch = useDispatch()
    const companyStore = useSelector((store: Store) => store.companyStore)
    const navigate = useNavigate()
    const searchParams = new URLSearchParams(location.search);
    let page = Number(searchParams.get('page') || 1);
    let keyword = String(searchParams.get('keyword') || 'all')
    let address = String(searchParams.get('address') || 'all')
    const [currentPage, setCurrentPage] = useState(page || 1);
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        if (companyStore.companyCount) {
            setTotalPages(Math.ceil(companyStore.companyCount / 9))
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
        console.log(page, keyword, address)
        dispatch(searchCompany({ page, pageSize: 9, keyword, address }) as any)
    }, [page, keyword, address])
    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '')}?page=${1}`)
            if (!window.location.href.includes('keyword')) {
                if (!window.location.href.includes('search-company?')) {
                    navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '')}?keyword=${(e.target as any).keyword.value || 'all'}`)
                }
                navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '')}&keyword=${(e.target as any).keyword.value || 'all'}`)
            } else {
                navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '').replace(/(keyword=)[^\&]+/, `$1${(e.target as any).keyword.value || 'all'}`)}`)
            }
            if (!window.location.href.includes('address')) {
                if (!window.location.href.includes('search-company?')) {
                    navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '')}?address=${selectedCity || 'all'}`)
                }
                navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '')}&address=${selectedCity || 'all'}`)
            } else {
                navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '').replace(/(address=)[^\&]+/, `$1${selectedCity || 'all'}`)}`)
            }
        } catch (err) {

        }
    }
    return (
        <>
            {/* <Breadcrumb /> */}
            <div className='search_container'>
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

                                <input type='text' id="keyword" placeholder='Search by: Company Name...' defaultValue={keyword != 'all' ? keyword : undefined}>

                                </input>
                            </div>
                            <div className='location'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 12.75C13.6569 12.75 15 11.4069 15 9.75C15 8.09315 13.6569 6.75 12 6.75C10.3431 6.75 9 8.09315 9 9.75C9 11.4069 10.3431 12.75 12 12.75Z" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M19.5 9.75C19.5 16.5 12 21.75 12 21.75C12 21.75 4.5 16.5 4.5 9.75C4.5 7.76088 5.29018 5.85322 6.6967 4.4467C8.10322 3.04018 10.0109 2.25 12 2.25C13.9891 2.25 15.8968 3.04018 17.3033 4.4467C18.7098 5.85322 19.5 7.76088 19.5 9.75V9.75Z" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>

                                <Select value={selectedCity || ''} onChange={setSelectedCity}>
                                    <Select.Option value="" disabled hidden>Chọn thành phố</Select.Option>
                                    {OptionLocation.map(province => (
                                        <Select.Option key={province} value={province}>
                                            {province}
                                        </Select.Option>
                                    ))}
                                </Select>


                            </div>
                            <button type='submit'>
                                Find Company
                            </button>
                        </form>
                    </div>
                    <div className='search_result'>
                        <div className='label'>
                            <p>Kết quả tìm kiếm</p>
                        </div>
                        {
                            companyStore.companies ? (
                                <>
                                    {
                                        companyStore.companies?.map(item => {
                                            return (
                                                <div key={Date.now() * Math.random()} className='item'>
                                                    <div className='info'>
                                                        <img src={item.logo} alt='logo'></img>

                                                        <div className='name'>
                                                            <p>{item.name}</p>
                                                            <div className='featured'>
                                                                <span>{item.type_company?.name}</span>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <span className='address'>
                                                        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M9.5 9.5625C10.7426 9.5625 11.75 8.55514 11.75 7.3125C11.75 6.06986 10.7426 5.0625 9.5 5.0625C8.25736 5.0625 7.25 6.06986 7.25 7.3125C7.25 8.55514 8.25736 9.5625 9.5 9.5625Z" stroke="#767F8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <path d="M15.125 7.3125C15.125 12.375 9.5 16.3125 9.5 16.3125C9.5 16.3125 3.875 12.375 3.875 7.3125C3.875 5.82066 4.46763 4.38992 5.52252 3.33502C6.57742 2.28013 8.00816 1.6875 9.5 1.6875C10.9918 1.6875 12.4226 2.28013 13.4775 3.33502C14.5324 4.38992 15.125 5.82066 15.125 7.3125V7.3125Z" stroke="#767F8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        </svg>
                                                        {
                                                            item.address_companies[0].address
                                                        }
                                                    </span>
                                                    <div className='more' onClick={() => { window.location.href = `/company-info/${item.id}` }}>
                                                        <span>Open Jobs ({item.jobs.length})</span>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </>
                            ) : <img
                                style={{ width: 800, height: 600 }}
                                src='https://cdn.dribbble.com/users/2382015/screenshots/6065978/no_result.gif'></img>
                        }
                    </div>
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

            </div>
        </>

    )
}
