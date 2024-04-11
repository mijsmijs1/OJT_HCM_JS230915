import pictures from '@/pictures'

import './homepage.scss'

export default function HomePage() {
    const items = [
        {
            icon: pictures.job,
            number: '1,75,324',
            text: 'Live Job'
        },
        {
            icon: pictures.company,
            number: '97,354',
            text: 'Companies'
        },
        {
            icon: pictures.candidate,
            number: '38,47,154',
            text: 'Candidates'
        },
        {
            icon: pictures.new_job,
            number: '7,532',
            text: 'New Jobs'
        }
    ]

    const work_item = [
        {
            title: 'Techical Support Specialist',
            position: 'Part-time',
            salary: '$20,000 - $25,000',
            company_icon: pictures.company_icon,
            company_title: 'Google Inc.',
            company_location: 'Dhaka, Bangladesh',
        },
        {
            title: 'Senior UX Designer',
            position: 'Full-Time',
            salary: '$20,000 - $25,000',
            company_icon: pictures.company_icon,
            company_title: 'Google Inc.',
            company_location: 'Dhaka, Bangladesh',
        },
        {
            title: 'Marketing Officer',
            position: 'Internship',
            salary: '$20,000 - $25,000',
            company_icon: pictures.company_icon,
            company_title: 'Google Inc.',
            company_location: 'Dhaka, Bangladesh',
        },
        {
            title: 'Junior Graphic Designer',
            position: 'Internship',
            salary: '$20,000 - $25,000',
            company_icon: pictures.company_icon,
            company_title: 'Google Inc.',
            company_location: 'Dhaka, Bangladesh',
        },
        {
            title: 'Interaction Designer',
            position: 'Part-time',
            salary: '$20,000 - $25,000',
            company_icon: pictures.company_icon,
            company_title: 'Google Inc.',
            company_location: 'Dhaka, Bangladesh',
        },
        {
            title: 'Project Manager',
            position: 'Full-Time',
            salary: '$20,000 - $25,000',
            company_icon: pictures.company_icon,
            company_title: 'Google Inc.',
            company_location: 'Dhaka, Bangladesh',
        },
        {
            title: 'Software Engineer',
            position: 'Full-Time',
            salary: '$20,000 - $25,000',
            company_icon: pictures.company_icon,
            company_title: 'Google Inc.',
            company_location: 'Dhaka, Bangladesh',
        },
        {
            title: 'Visual Designer',
            position: 'Full-Time',
            salary: '$20,000 - $25,000',
            company_icon: pictures.company_icon,
            company_title: 'Google Inc.',
            company_location: 'Dhaka, Bangladesh',
        },
        {
            title: 'Project Manager',
            position: 'Full-Time',
            salary: '$20,000 - $25,000',
            company_icon: pictures.company_icon,
            company_title: 'Google Inc.',
            company_location: 'Dhaka, Bangladesh',
        },
        {
            title: 'Front End Developer',
            position: 'Part-time',
            salary: '$20,000 - $25,000',
            company_icon: pictures.company_icon,
            company_title: 'Google Inc.',
            company_location: 'Dhaka, Bangladesh',
        },
        {
            title: 'Senior UX Designer',
            position: 'Full-Time',
            salary: '$20,000 - $25,000',
            company_icon: pictures.company_icon,
            company_title: 'Google Inc.',
            company_location: 'Dhaka, Bangladesh',
        },
        {
            title: 'Marketing Manager',
            position: 'Internship',
            salary: '$20,000 - $25,000',
            company_icon: pictures.company_icon,
            company_title: 'Google Inc.',
            company_location: 'Dhaka, Bangladesh',
        },
    ]

    const reviews = [
        {
            star: '5',
            comment: '“Ut ullamcorper hendrerit tempor. Aliquam in rutrum dui. Maecenas ac placerat metus, in faucibus est.”',
            ava: pictures.robert,
            name: 'Robert Fox',
            role: 'UI/UX Designer'
        },
        {
            star: '5',
            comment: '“Mauris eget lorem odio. Mauris convallis justo molestie metus aliquam lacinia. Suspendisse ut dui vulputate augue condimentum ornare. Morbi vitae tristique ante”',
            ava: pictures.bessie,
            name: 'Bessie Cooper',
            role: 'Creative Director'
        },
        {
            star: '5',
            comment: '“Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse et magna quis nibh accumsan venenatis sit amet id orci. Duis vestibulum bibendum dapibus.”',
            ava: pictures.jane,
            name: 'Jane Cooper',
            role: 'Photographer'
        }
    ]
    return (
        <>
            {/* INFORMATION */}
            <section className='information'>
                <div className='info-main-content'>
                    {/* left */}
                    <div className='info-left'>
                        <div className='info-title'>
                            <h2>Tìm kiếm công việc phù hợp với năng lực của bạn cùng chúng tôi</h2>
                            <p>Aliquam vitae turpis in diam convallis finibus in at risus. Nullam in scelerisque leo, eget sollicitudin velit bestibulum.</p>
                        </div>
                        <div className='info-search'>
                            <div className='search-box'>
                                {/* title search */}
                                <div className='search-title'>
                                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.499 19.3203C15.9172 19.3203 19.499 15.7386 19.499 11.3203C19.499 6.90203 15.9172 3.32031 11.499 3.32031C7.08068 3.32031 3.49896 6.90203 3.49896 11.3203C3.49896 15.7386 7.08068 19.3203 11.499 19.3203Z" stroke="#BC2228" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M21.499 21.3207L17.149 16.9707" stroke="#BC2228" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <input type="text" placeholder='Job tittle, Keyword...' />
                                </div>

                                {/* line */}
                                <div className='line'></div>

                                {/* location search */}
                                <div className='search-location'>
                                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_21_4568)">
                                            <path d="M21.499 10.3203C21.499 17.3203 12.499 23.3203 12.499 23.3203C12.499 23.3203 3.49896 17.3203 3.49896 10.3203C3.49896 7.93336 4.44717 5.64418 6.135 3.95635C7.82283 2.26852 10.112 1.32031 12.499 1.32031C14.8859 1.32031 17.1751 2.26852 18.8629 3.95635C20.5508 5.64418 21.499 7.93336 21.499 10.3203Z" stroke="#BC2228" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M12.499 13.3203C14.1558 13.3203 15.499 11.9772 15.499 10.3203C15.499 8.66346 14.1558 7.32031 12.499 7.32031C10.8421 7.32031 9.49896 8.66346 9.49896 10.3203C9.49896 11.9772 10.8421 13.3203 12.499 13.3203Z" stroke="#BC2228" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_21_4568">
                                                <rect width="24" height="24" fill="white" transform="translate(0.498962 0.320312)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <input type="text" placeholder='Your Location' />
                                </div>

                                {/* find button */}
                                <button>Find Job</button>
                            </div>

                            {/* sugestion */}
                            <div className='sugestion-box'>
                                <small>Suggestion:</small>
                                <span> Designer,</span>
                                <span className='program'> Programing,</span>
                                <span className='digistal'> Digital Marketing,</span>
                                <span> Video,</span>
                                <span> Animation.</span>
                            </div>
                        </div>
                    </div>

                    {/* right */}
                    <div className='info-right'>
                        <img src={pictures.info} />
                    </div>
                </div>

                {/* bottom */}
                <div className='info-bottom'>
                    {
                        items.map((item) => (
                            <div className='info-item-box' key={Date.now() * Math.random()}>
                                <div className='info-box-left'>
                                    <img src={item.icon} alt={item.text} />
                                </div>
                                <div className='info-box-right'>
                                    <h2>{item.number}</h2>
                                    <p>{item.text}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </section>
            {/* END INFORMATION */}

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
                <div className='outstanding-jobs'>
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
                                        <img src={item.company_icon} alt={item.company_title} />
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

            {/* TESTIMONIAL*/}
            <section className='testimonial-container'>
                <h2>Clients Testimonial</h2>

                <div className="testimonial-box">
                    {/* arrow */}
                    <div className="arrow_left arrow">
                        <img src={pictures.arrow_left} />
                    </div>
                    <div className="arrow_right arrow">
                        <img src={pictures.arrow_right} />
                    </div>

                    {/* dots */}
                    <div className='dots'>
                        <svg width="96" height="10" viewBox="0 0 96 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="10" height="10" rx="5" fill="#BC2228" fill-opacity="0.53" />
                            <rect x="18" width="10" height="10" rx="5" fill="#BC2228" fill-opacity="0.53" />
                            <rect x="36" width="24" height="10" rx="5" fill="#BC2228" />
                            <rect x="68" width="10" height="10" rx="5" fill="#BC2228" fill-opacity="0.53" />
                            <rect x="86" width="10" height="10" rx="5" fill="#BC2228" fill-opacity="0.53" />
                        </svg>

                    </div>

                    {/* content */}
                    <div className='testimonial-content-box'>
                        <div className='testimonial-content'>
                            {
                                reviews.map((item) => (
                                    <div className="comment-box">
                                        <div className="comment-top-box">
                                            {/* star */}
                                            <div className='comment-star'>
                                                {[...Array(parseInt(item.star, 10))].map((_, index) => (
                                                    <svg
                                                        key={index}
                                                        width="28"
                                                        height="28"
                                                        viewBox="0 0 28 28"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M12.9241 4.51296C13.3643 3.62116 14.636 3.62116 15.0762 4.51296L17.3262 9.07125C17.5009 9.42507 17.8383 9.67042 18.2287 9.72748L23.2623 10.4632C24.2462 10.607 24.6383 11.8164 23.926 12.5102L20.2856 16.0559C20.0026 16.3316 19.8734 16.729 19.9402 17.1184L20.7991 22.1262C20.9672 23.1065 19.9382 23.8541 19.0578 23.3911L14.5587 21.0251C14.209 20.8412 13.7913 20.8412 13.4416 21.0251L8.94252 23.3911C8.06217 23.8541 7.03311 23.1065 7.20125 22.1262L8.06013 17.1184C8.12693 16.729 7.99773 16.3316 7.71468 16.0559L4.07431 12.5102C3.362 11.8164 3.75414 10.607 4.73804 10.4632L9.7716 9.72748C10.162 9.67042 10.4995 9.42507 10.6741 9.07125L12.9241 4.51296Z"
                                                            fill="#FFAA00"
                                                        />
                                                    </svg>
                                                ))}
                                            </div>

                                            {/* content */}
                                            <div className='comment-content'>
                                                {item.comment}
                                            </div>
                                        </div>
                                        {/* bottom */}
                                        <div className='comment-bottom-box'>
                                            {/* left */}
                                            <div className='comment-left'>
                                                {/* ava */}
                                                <div className='comment-ava-box'>
                                                    <div className="comment-ava">
                                                        <img src={item.ava} />
                                                    </div>
                                                </div>

                                                {/* name & role */}
                                                <div className='comment-name-role'>
                                                    <div className="comment-name">{item.name}</div>
                                                    <div className="comment-role">{item.role}</div>
                                                </div>
                                            </div>

                                            {/* right */}
                                            <div className='comment-right'>
                                                {/* quote */}
                                                <div className="quote">
                                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M22 34C22 36.1217 21.1571 38.1566 19.6569 39.6569C18.1566 41.1571 16.1217 42 14 42C11.8783 42 9.84344 41.1571 8.34315 39.6569C6.84285 38.1566 6 36.1217 6 34C6 29.58 14 6 14 6H18L14 26C16.1217 26 18.1566 26.8429 19.6569 28.3431C21.1571 29.8434 22 31.8783 22 34ZM42 34C42 36.1217 41.1571 38.1566 39.6569 39.6569C38.1566 41.1571 36.1217 42 34 42C31.8783 42 29.8434 41.1571 28.3431 39.6569C26.8429 38.1566 26 36.1217 26 34C26 29.58 34 6 34 6H38L34 26C36.1217 26 38.1566 26.8429 39.6569 28.3431C41.1571 29.8434 42 31.8783 42 34Z" fill="#DADDE6" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                </div>
            </section>
            {/* END TESTIMONIAL*/}

        </>
    )
}
