import pictures from '@/pictures'

import './work.scss'

export default function OutstandingWork() {
    const work_item = [
        {
            title: 'Techical Support Specialist',
            position: 'Part-time',
            salary: '$20,000 - $25,000',
            logo_google: pictures.logo_google,
            company_title: 'Google Inc.',
            company_location: 'Dhaka, Bangladesh',
        },
        {
            title: 'Senior UX Designer',
            position: 'Full-Time',
            salary: '$20,000 - $25,000',
            logo_google: pictures.logo_google,
            company_title: 'Google Inc.',
            company_location: 'Dhaka, Bangladesh',
        },
        {
            title: 'Marketing Officer',
            position: 'Internship',
            salary: '$20,000 - $25,000',
            logo_google: pictures.logo_google,
            company_title: 'Google Inc.',
            company_location: 'Dhaka, Bangladesh',
        },
        {
            title: 'Junior Graphic Designer',
            position: 'Internship',
            salary: '$20,000 - $25,000',
            logo_google: pictures.logo_google,
            company_title: 'Google Inc.',
            company_location: 'Dhaka, Bangladesh',
        },
        {
            title: 'Interaction Designer',
            position: 'Part-time',
            salary: '$20,000 - $25,000',
            logo_google: pictures.logo_google,
            company_title: 'Google Inc.',
            company_location: 'Dhaka, Bangladesh',
        },
        {
            title: 'Project Manager',
            position: 'Full-Time',
            salary: '$20,000 - $25,000',
            logo_google: pictures.logo_google,
            company_title: 'Google Inc.',
            company_location: 'Dhaka, Bangladesh',
        },
        {
            title: 'Software Engineer',
            position: 'Full-Time',
            salary: '$20,000 - $25,000',
            logo_google: pictures.logo_google,
            company_title: 'Google Inc.',
            company_location: 'Dhaka, Bangladesh',
        },
        {
            title: 'Visual Designer',
            position: 'Full-Time',
            salary: '$20,000 - $25,000',
            logo_google: pictures.logo_google,
            company_title: 'Google Inc.',
            company_location: 'Dhaka, Bangladesh',
        },
        {
            title: 'Project Manager',
            position: 'Full-Time',
            salary: '$20,000 - $25,000',
            logo_google: pictures.logo_google,
            company_title: 'Google Inc.',
            company_location: 'Dhaka, Bangladesh',
        },
        {
            title: 'Front End Developer',
            position: 'Part-time',
            salary: '$20,000 - $25,000',
            logo_google: pictures.logo_google,
            company_title: 'Google Inc.',
            company_location: 'Dhaka, Bangladesh',
        },
        {
            title: 'Senior UX Designer',
            position: 'Full-Time',
            salary: '$20,000 - $25,000',
            logo_google: pictures.logo_google,
            company_title: 'Google Inc.',
            company_location: 'Dhaka, Bangladesh',
        },
        {
            title: 'Marketing Manager',
            position: 'Internship',
            salary: '$20,000 - $25,000',
            logo_google: pictures.logo_google,
            company_title: 'Google Inc.',
            company_location: 'Dhaka, Bangladesh',
        },
    ]

    return (
        <>
            {/* OUTSTANDING WORK */}
            <section className='outstanding_work'>
                {/* title */}
                <div className='outstanding-title'>
                    <h2>Công việc nổi bật</h2>
                    <div className='view-more'>
                        <span>Xem thêm</span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12H19" stroke="#BC2228" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12 5L19 12L12 19" stroke="#BC2228" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                </div>

                {/* outstanding-jobs */}
                <div className='outstanding-jobs' key={Date.now() * Math.random()}>
                    {
                        work_item.map((item) => (
                            <div className='job-item'>
                                {/* heading */}
                                <div className="job-header">
                                    <div className="job_title-box">
                                        <div className="title">{item.title}</div>
                                    </div>
                                    <div className="job_pos_sala">
                                        <div className="position">{item.position}</div>
                                        <div className="salary">Salary: {item.salary}</div>
                                    </div>
                                </div>

                                {/* company */}
                                <div className='job-company'>
                                    <div className="company-icon">
                                        <img src={item.logo_google} alt={item.company_title} />
                                    </div>
                                    <div className='company-content'>
                                        <div className="title">{item.company_title}</div>
                                        <div className="location">
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9 9.5625C10.2426 9.5625 11.25 8.55514 11.25 7.3125C11.25 6.06986 10.2426 5.0625 9 5.0625C7.75736 5.0625 6.75 6.06986 6.75 7.3125C6.75 8.55514 7.75736 9.5625 9 9.5625Z" stroke="#767F8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M14.625 7.3125C14.625 12.375 9 16.3125 9 16.3125C9 16.3125 3.375 12.375 3.375 7.3125C3.375 5.82066 3.96763 4.38992 5.02252 3.33502C6.07742 2.28013 7.50816 1.6875 9 1.6875C10.4918 1.6875 11.9226 2.28013 12.9775 3.33502C14.0324 4.38992 14.625 5.82066 14.625 7.3125V7.3125Z" stroke="#767F8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            <span>{item.company_location}</span>
                                        </div>
                                    </div>
                                    <div className="bookmark">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M18 21L11.9993 17.25L6 21V4.5C6 4.30109 6.07902 4.11032 6.21967 3.96967C6.36032 3.82902 6.55109 3.75 6.75 3.75H17.25C17.4489 3.75 17.6397 3.82902 17.7803 3.96967C17.921 4.11032 18 4.30109 18 4.5V21Z" stroke="#C8CCD1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </section>
            {/* END OUTSTANDING WORK */}
        </>
    )
}
