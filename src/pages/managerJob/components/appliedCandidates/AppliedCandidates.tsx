
import './appliedCandidate.scss'
import { useDispatch, useSelector } from "react-redux"
import { Store } from "@/store"
import { useEffect, useState } from "react"
import { fetchAppliedCandidates } from "@/store/slices/candidate/candidate.slice"
import { useNavigate } from "react-router-dom"

export default function AppliedCandidates() {
    const navigate = useNavigate()
    const jobStore = useSelector((store: Store) => store.jobStore)
    const candidateStore = useSelector((store: Store) => store.candidateStore)
    const dispatch = useDispatch()
    const searchParams = new URLSearchParams(location.search);
    let page = Number(searchParams.get('candidate-page'));
    const [currentPage, setCurrentPage] = useState(page || 1);
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        dispatch(fetchAppliedCandidates({ jobId: jobStore.job?.id || 0, page: page || 1, pageSize: 3 }) as any)
    }, [page])
    useEffect(() => {
        if (candidateStore.candidates) {
            setTotalPages(Math.ceil(candidateStore.countCandidate / 3))
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
                    if (!window.location.href.includes('candidate-page')) {
                        navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '')}?candidate-page=${page}`)
                    } else {
                        navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '').replace(/(candidate-page=)[^\&]+/, `$1${page}`)}`)
                    }
                }}
            >
                {page}
            </span>
        ));
    };

    return (
        <div className='applied_candidate_container'>
            <div className='content'>
                <div className='label'>
                    <p>Ứng viên đã nộp CV</p>
                    <div className='more'>
                        <p>Xem thêm</p>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12H19" stroke="#BC2228" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12 5L19 12L12 19" stroke="#BC2228" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                    </div>
                </div>
                <div className='candidate'>
                    {candidateStore.candidates?.map(item => {
                        return (<div className='item' key={Date.now() * Math.random()} onClick={() => { window.location.href = `/candidate-info/${item.id}/info?jobId=${jobStore.job?.id}` }}>
                            <div className='info'>
                                <div className='left'>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png" alt='avatar'></img>
                                    <div className='candidate_info'>
                                        <p>{item.name}</p>
                                        <div>
                                            <div className='position'>
                                                <span>{item.education[0]?.name_education || 'Updating'}</span>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className='right'>
                                    <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_368_8854)">
                                            <path d="M19 7.99511C19 7.74772 18.9024 7.52962 18.707 7.34082L12.2324 0.885742C12.1282 0.781576 12.0224 0.706706 11.915 0.661133C11.8076 0.61556 11.6953 0.592773 11.5781 0.592773C11.3373 0.592773 11.1354 0.672526 10.9726 0.832031C10.8099 0.991537 10.7285 1.19173 10.7285 1.43262C10.7285 1.5498 10.748 1.66211 10.7871 1.76953C10.8262 1.87695 10.8848 1.96973 10.9629 2.04785L13.1504 4.27441L17.0273 7.80957L17.2226 7.32129L14.0781 7.12597H1.72461C1.4707 7.12597 1.264 7.20735 1.10449 7.37011C0.944987 7.53287 0.865234 7.74121 0.865234 7.99511C0.865234 8.24902 0.944987 8.45735 1.10449 8.62011C1.264 8.78287 1.4707 8.86425 1.72461 8.86425H14.0781L17.2226 8.66894L17.0273 8.19043L13.1504 11.7158L10.9629 13.9424C10.8848 14.0205 10.8262 14.1133 10.7871 14.2207C10.748 14.3281 10.7285 14.4404 10.7285 14.5576C10.7285 14.7985 10.8099 14.9987 10.9726 15.1582C11.1354 15.3177 11.3373 15.3975 11.5781 15.3975C11.8125 15.3975 12.0241 15.3063 12.2129 15.124L18.707 8.64941C18.9024 8.46061 19 8.24251 19 7.99511Z" fill="#BC2228" fill-opacity="0.85" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_368_8854">
                                                <rect width="18.1348" height="14.8145" fill="white" transform="translate(0.865234 0.592773)" />
                                            </clipPath>
                                        </defs>
                                    </svg>

                                </div>
                            </div>
                            <div className='skill'>
                                <div className='tech'>
                                    <p>Technical in use:</p>
                                    {
                                        item.skills?.length != 0 ? (
                                            item.skills?.slice(0, 3).map(item => {
                                                return (
                                                    <>
                                                        <div className='each' key={Date.now() * Math.random()}>
                                                            <span>
                                                                {
                                                                    item.name
                                                                }
                                                            </span>
                                                        </div>
                                                    </>
                                                )
                                            })
                                        ) : <p>Updating</p>
                                    }

                                </div>
                                <div className='languages'>
                                    <p>Certificates:</p>
                                    {
                                        item.certificates?.length != 0 ? (
                                            item.certificates?.slice(0, 3).map(item => {
                                                return (
                                                    <>
                                                        <div className='each' key={Date.now() * Math.random()}>
                                                            <span>
                                                                {
                                                                    item.name
                                                                }
                                                            </span>
                                                        </div>
                                                    </>
                                                )
                                            })
                                        ) : <p>Updating</p>
                                    }

                                </div>
                            </div>
                            <div className='address'>
                                <span>
                                    <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.5 9.5625C10.7426 9.5625 11.75 8.55514 11.75 7.3125C11.75 6.06986 10.7426 5.0625 9.5 5.0625C8.25736 5.0625 7.25 6.06986 7.25 7.3125C7.25 8.55514 8.25736 9.5625 9.5 9.5625Z" stroke="#767F8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M15.125 7.3125C15.125 12.375 9.5 16.3125 9.5 16.3125C9.5 16.3125 3.875 12.375 3.875 7.3125C3.875 5.82066 4.46763 4.38992 5.52252 3.33502C6.57742 2.28013 8.00816 1.6875 9.5 1.6875C10.9918 1.6875 12.4226 2.28013 13.4775 3.33502C14.5324 4.38992 15.125 5.82066 15.125 7.3125V7.3125Z" stroke="#767F8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    {
                                        item.address
                                    }
                                </span>
                            </div>
                        </div>)
                    })}
                </div>
                {/* Phan trang */}
                <div className="pagination">
                    <span onClick={() => {
                        onPageChange(currentPage - 1)
                        if (!window.location.href.includes('candidate-page')) {
                            navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '')}?candidate-page=${currentPage - 1}`)
                        } else {
                            navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '').replace(/(candidate-page=)[^\&]+/, `$1${currentPage - 1}`)}`)
                        }
                    }}>&lt;</span>
                    {renderPageNumbers()}
                    <span onClick={() => {
                        onPageChange(currentPage + 1)
                        if (!window.location.href.includes('candidate-page')) {
                            navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '')}?candidate-page=${currentPage - 1}`)
                        } else {
                            navigate(`${window.location.href.replace(`${import.meta.env.VITE_WEBSITE_URL}`, '').replace(/(candidate-page=)[^\&]+/, `$1${currentPage + 1}`)}`)
                        }
                    }}>&gt;</span>
                </div>
            </div>
        </div>
    )
}
