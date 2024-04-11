import pictures from '@/pictures'
import './searchJob.scss'

export default function SearchJob() {
    let results = [
        {
            workName: "Techical Support Specialist",
            type: "FULL-TIME",
            salary: "$20,000 - $25,000",
            companyLogo: pictures.logo_google,
            companyName: "Google Inc.",
            address: "Dhaka, Bangladesh"
        },
        {
            workName: "Techical Support Specialist",
            type: "PART-TIME",
            salary: "$20,000 - $25,000",
            companyLogo: pictures.logo_google,
            companyName: "Google Inc.",
            address: "Dhaka, Bangladesh"
        }, {
            workName: "Techical Support Specialist",
            type: "FULL-TIME",
            salary: "$20,000 - $25,000",
            companyLogo: pictures.logo_google,
            companyName: "Google Inc.",
            address: "Dhaka, Bangladesh"
        },
        {
            workName: "Techical Support Specialist",
            type: "PART-TIME",
            salary: "$20,000 - $25,000",
            companyLogo: pictures.logo_google,
            companyName: "Google Inc.",
            address: "Dhaka, Bangladesh"
        },
        {
            workName: "Techical Support Specialist",
            type: "FULL-TIME",
            salary: "$20,000 - $25,000",
            companyLogo: pictures.logo_google,
            companyName: "Google Inc.",
            address: "Dhaka, Bangladesh"
        }
    ]
    return (
        <div className='search_container'>
            <p>Việc làm công ty đang mở</p>
            <div className='search_input'>
                <form>
                    <div className='keyword'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#BC2228" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M20.9999 20.9999L16.6499 16.6499" stroke="#BC2228" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                        <input type='text' id="keyword" placeholder='Search job...'>

                        </input>
                    </div>
                    <div className='location'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 12.75C13.6569 12.75 15 11.4069 15 9.75C15 8.09315 13.6569 6.75 12 6.75C10.3431 6.75 9 8.09315 9 9.75C9 11.4069 10.3431 12.75 12 12.75Z" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M19.5 9.75C19.5 16.5 12 21.75 12 21.75C12 21.75 4.5 16.5 4.5 9.75C4.5 7.76088 5.29018 5.85322 6.6967 4.4467C8.10322 3.04018 10.0109 2.25 12 2.25C13.9891 2.25 15.8968 3.04018 17.3033 4.4467C18.7098 5.85322 19.5 7.76088 19.5 9.75V9.75Z" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                        <input type='text' id="location" placeholder='Vị trí '>

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
            <div className='search_result'>
                {
                    results?.map(item => {
                        return (
                            <div key={Date.now() * Math.random()} className='item'>
                                <div className='work'>
                                    <p>{item.workName}</p>
                                    <div>
                                        <div className='type'><span>{item.type}</span></div>
                                        <span>Salary: {item.salary}</span>
                                    </div>
                                </div>
                                <div className='company'>
                                    <div className='info'>
                                        <img src={item.companyLogo} alt='logo'></img>
                                        <div>
                                            <p>{item.companyName}</p>
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
        </div>
    )
}
