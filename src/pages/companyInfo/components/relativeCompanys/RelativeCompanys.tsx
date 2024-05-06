
import './relativeCompanys.scss'
import { useSelector } from 'react-redux'
import { Store } from '@/store'

export default function RelativeCompanys() {
    const companyStore = useSelector((store: Store) => store.companyStore)
    console.log(companyStore.companies)
    return (
        <div className='content_relative'>
            <p className='title'>Công ty cùng lĩnh vực</p>
            <div className='more_company'>
                <span>
                    Xem thêm
                </span>
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12.2637H19" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M12 5.26367L19 12.2637L12 19.2637" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
            <div className='search_result'>
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
                                    <span>Open Position ({item.jobs.length})</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
