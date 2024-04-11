import pictures from '@/pictures'

import './testimonial.scss'

export default function Testimonial() {
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
                        <div className='testimonial-content' key={Date.now() * Math.random()}>
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
