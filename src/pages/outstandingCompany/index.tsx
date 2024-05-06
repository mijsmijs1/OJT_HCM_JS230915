import pictures from '@/pictures'

import './company.scss'

export default function OutstandingCompany() {
    let searchResults = [
        {
            avatar: pictures.search_avatar,
            name: "Dribbble",
            location: "Dhaka, Bangladesh",
            openPosition: 3
        },
        {
            avatar: pictures.search_avatar,
            name: "Dribbble",
            location: "Dhaka, Bangladesh",
            openPosition: 3
        },
        {
            avatar: pictures.search_avatar,
            name: "Dribbble",
            location: "Dhaka, Bangladesh",
            openPosition: 3
        },
        {
            avatar: pictures.search_avatar,
            name: "Dribbble",
            location: "Dhaka, Bangladesh",
            openPosition: 3
        },
        {
            avatar: pictures.search_avatar,
            name: "Dribbble",
            location: "Dhaka, Bangladesh",
            openPosition: 3
        },
        {
            avatar: pictures.search_avatar,
            name: "Dribbble",
            location: "Dhaka, Bangladesh",
            openPosition: 3
        },
        {
            avatar: pictures.search_avatar,
            name: "Dribbble",
            location: "Dhaka, Bangladesh",
            openPosition: 3
        },
        {
            avatar: pictures.search_avatar,
            name: "Dribbble",
            location: "Dhaka, Bangladesh",
            openPosition: 3
        },
        {
            avatar: pictures.search_avatar,
            name: "Dribbble",
            location: "Dhaka, Bangladesh",
            openPosition: 3
        },
        {
            avatar: pictures.search_avatar,
            name: "Dribbble",
            location: "Dhaka, Bangladesh",
            openPosition: 3
        },
        {
            avatar: pictures.search_avatar,
            name: "Dribbble",
            location: "Dhaka, Bangladesh",
            openPosition: 3
        },
        {
            avatar: pictures.search_avatar,
            name: "Dribbble",
            location: "Dhaka, Bangladesh",
            openPosition: 3
        },

    ]
    return (
        <>
            <div className='outstanding_company'>
                    <div className='outstanding-title'>
                        <h2>Công ty nổi bật</h2>
                        <div className='view-more'>
                            <span>Xem thêm</span>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19" stroke="#BC2228" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M12 5L19 12L12 19" stroke="#BC2228" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>
                <div className='content'>
                    <div className='search_result'>
                        {
                            searchResults?.map(item => {
                                return (
                                    <div key={Date.now() * Math.random()} className='item'>
                                        <div className='info'>
                                            <img src={item.avatar} alt='logo'></img>
                                            <div>
                                                <div className='name'>
                                                    <p>{item.name}</p>
                                                    <div className='featured'>
                                                        <span>Featured</span>
                                                    </div>
                                                </div>
                                                <span>
                                                    <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M9.5 9.5625C10.7426 9.5625 11.75 8.55514 11.75 7.3125C11.75 6.06986 10.7426 5.0625 9.5 5.0625C8.25736 5.0625 7.25 6.06986 7.25 7.3125C7.25 8.55514 8.25736 9.5625 9.5 9.5625Z" stroke="#767F8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M15.125 7.3125C15.125 12.375 9.5 16.3125 9.5 16.3125C9.5 16.3125 3.875 12.375 3.875 7.3125C3.875 5.82066 4.46763 4.38992 5.52252 3.33502C6.57742 2.28013 8.00816 1.6875 9.5 1.6875C10.9918 1.6875 12.4226 2.28013 13.4775 3.33502C14.5324 4.38992 15.125 5.82066 15.125 7.3125V7.3125Z" stroke="#767F8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                    {
                                                        item.location
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                        <div className='more'>
                                            <span>Open Jobs ({item.openPosition})</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
