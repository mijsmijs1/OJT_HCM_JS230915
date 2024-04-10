import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import './searchCandidate.scss'
import GoodCandidate from '../home/components/goodCandidate/GoodCandidate'

export default function SearchCandidate() {
    return (
        <>
            <Breadcrumb />
            <div className='search_candidate_container'>
                <div className='content'>
                    <div className='search_input'>
                        <form>
                            <div className='keyword'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#BC2228" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M20.9999 20.9999L16.6499 16.6499" stroke="#BC2228" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>

                                <input type='text' id="keyword" placeholder='Search by: Company Name...'>

                                </input>
                            </div>
                            <div className='location'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 12.75C13.6569 12.75 15 11.4069 15 9.75C15 8.09315 13.6569 6.75 12 6.75C10.3431 6.75 9 8.09315 9 9.75C9 11.4069 10.3431 12.75 12 12.75Z" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M19.5 9.75C19.5 16.5 12 21.75 12 21.75C12 21.75 4.5 16.5 4.5 9.75C4.5 7.76088 5.29018 5.85322 6.6967 4.4467C8.10322 3.04018 10.0109 2.25 12 2.25C13.9891 2.25 15.8968 3.04018 17.3033 4.4467C18.7098 5.85322 19.5 7.76088 19.5 9.75V9.75Z" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>

                                <input type='text' id="location" placeholder='City, state or zip code'>

                                </input>


                            </div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 20.25C16.5563 20.25 20.25 16.5563 20.25 12C20.25 7.44365 16.5563 3.75 12 3.75C7.44365 3.75 3.75 7.44365 3.75 12C3.75 16.5563 7.44365 20.25 12 20.25Z" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M12 1.875V5.625" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M1.875 12H5.625" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M12 22.125V18.375" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M22.125 12H18.375" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <div className='filters'>
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
                                Find Company
                            </button>
                        </form>
                    </div>
                    <div className='search_input sort_content'>
                        <div className='sort_content'>
                            <div className='experiece item'>
                                <span>Kinh nghiệm</span>
                                <svg width="13" height="6" viewBox="0 0 13 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.50345 6.00009C6.59096 6.00009 6.67501 5.986 6.75561 5.95781C6.83621 5.92965 6.90644 5.88929 6.96631 5.83672L12.3135 1.36911C12.4378 1.2677 12.5 1.14751 12.5 1.00855C12.5 0.910892 12.4724 0.822628 12.4171 0.743754C12.3618 0.66488 12.287 0.602909 12.1926 0.55784C12.0981 0.51277 11.9911 0.490234 11.8713 0.490234C11.7009 0.490234 11.5512 0.539062 11.4223 0.636716L6.13039 5.04798H6.8696L1.57772 0.636716C1.45337 0.539062 1.30369 0.490234 1.12867 0.490234C1.00892 0.490234 0.901842 0.51277 0.807426 0.55784C0.713011 0.602909 0.638169 0.66488 0.582902 0.743754C0.527634 0.822628 0.5 0.910892 0.5 1.00855C0.5 1.0799 0.51612 1.14657 0.548359 1.20855C0.580599 1.27052 0.626655 1.32591 0.686528 1.37474L6.03368 5.83672C6.17184 5.94563 6.32843 6.00009 6.50345 6.00009Z" fill="black" fill-opacity="0.85" />
                                </svg>
                            </div>
                            <div className='tech item'>
                                <span>Công nghệ sử dụng</span>
                                <svg width="13" height="6" viewBox="0 0 13 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.50345 6.00009C6.59096 6.00009 6.67501 5.986 6.75561 5.95781C6.83621 5.92965 6.90644 5.88929 6.96631 5.83672L12.3135 1.36911C12.4378 1.2677 12.5 1.14751 12.5 1.00855C12.5 0.910892 12.4724 0.822628 12.4171 0.743754C12.3618 0.66488 12.287 0.602909 12.1926 0.55784C12.0981 0.51277 11.9911 0.490234 11.8713 0.490234C11.7009 0.490234 11.5512 0.539062 11.4223 0.636716L6.13039 5.04798H6.8696L1.57772 0.636716C1.45337 0.539062 1.30369 0.490234 1.12867 0.490234C1.00892 0.490234 0.901842 0.51277 0.807426 0.55784C0.713011 0.602909 0.638169 0.66488 0.582902 0.743754C0.527634 0.822628 0.5 0.910892 0.5 1.00855C0.5 1.0799 0.51612 1.14657 0.548359 1.20855C0.580599 1.27052 0.626655 1.32591 0.686528 1.37474L6.03368 5.83672C6.17184 5.94563 6.32843 6.00009 6.50345 6.00009Z" fill="black" fill-opacity="0.85" />
                                </svg>
                            </div>
                            <div className='languagues item'>
                                <span>Ngoại ngữ</span>
                                <svg width="13" height="6" viewBox="0 0 13 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.50345 6.00009C6.59096 6.00009 6.67501 5.986 6.75561 5.95781C6.83621 5.92965 6.90644 5.88929 6.96631 5.83672L12.3135 1.36911C12.4378 1.2677 12.5 1.14751 12.5 1.00855C12.5 0.910892 12.4724 0.822628 12.4171 0.743754C12.3618 0.66488 12.287 0.602909 12.1926 0.55784C12.0981 0.51277 11.9911 0.490234 11.8713 0.490234C11.7009 0.490234 11.5512 0.539062 11.4223 0.636716L6.13039 5.04798H6.8696L1.57772 0.636716C1.45337 0.539062 1.30369 0.490234 1.12867 0.490234C1.00892 0.490234 0.901842 0.51277 0.807426 0.55784C0.713011 0.602909 0.638169 0.66488 0.582902 0.743754C0.527634 0.822628 0.5 0.910892 0.5 1.00855C0.5 1.0799 0.51612 1.14657 0.548359 1.20855C0.580599 1.27052 0.626655 1.32591 0.686528 1.37474L6.03368 5.83672C6.17184 5.94563 6.32843 6.00009 6.50345 6.00009Z" fill="black" fill-opacity="0.85" />
                                </svg>
                            </div>
                            <div className='position item'>
                                <span>Vị trí</span>
                                <svg width="13" height="6" viewBox="0 0 13 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.50345 6.00009C6.59096 6.00009 6.67501 5.986 6.75561 5.95781C6.83621 5.92965 6.90644 5.88929 6.96631 5.83672L12.3135 1.36911C12.4378 1.2677 12.5 1.14751 12.5 1.00855C12.5 0.910892 12.4724 0.822628 12.4171 0.743754C12.3618 0.66488 12.287 0.602909 12.1926 0.55784C12.0981 0.51277 11.9911 0.490234 11.8713 0.490234C11.7009 0.490234 11.5512 0.539062 11.4223 0.636716L6.13039 5.04798H6.8696L1.57772 0.636716C1.45337 0.539062 1.30369 0.490234 1.12867 0.490234C1.00892 0.490234 0.901842 0.51277 0.807426 0.55784C0.713011 0.602909 0.638169 0.66488 0.582902 0.743754C0.527634 0.822628 0.5 0.910892 0.5 1.00855C0.5 1.0799 0.51612 1.14657 0.548359 1.20855C0.580599 1.27052 0.626655 1.32591 0.686528 1.37474L6.03368 5.83672C6.17184 5.94563 6.32843 6.00009 6.50345 6.00009Z" fill="black" fill-opacity="0.85" />
                                </svg>
                            </div>
                            <div className='sort item'>
                                <span>Lọc</span>

                            </div>
                        </div>
                    </div>
                    <GoodCandidate />
                </div>
            </div>
        </>

    )
}
