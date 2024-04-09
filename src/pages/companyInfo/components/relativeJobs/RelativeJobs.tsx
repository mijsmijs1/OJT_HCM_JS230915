import pictures from '@/pictures'
import './relativeJobs.scss'

export default function RelativeJobs() {
    let relavetiveJobs = [{
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
    },
    {
        workName: "Techical Support Specialist",
        type: "FULL-TIME",
        salary: "$20,000 - $25,000",
        companyLogo: pictures.logo_google,
        companyName: "Google Inc.",
        address: "Dhaka, Bangladesh"
    }]
    return (
        <div className='relavetiveJobs_container'>
            <p>Related Jobs</p>
            <div className='content'>
                {
                    relavetiveJobs?.map(item => {
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
