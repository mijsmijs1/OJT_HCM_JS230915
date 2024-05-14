import pictures from '@/pictures'
import Testimonial from '../testimonial'


import './home.scss'
import GoodJob from './components/goodJob/GoodJob'
import GoodCandidate from './components/goodCandidate/GoodCandidate'
import { Select } from 'antd'
import { OptionLocation } from '@/constants/constants'
import React, { useState } from 'react'


export default function Home() {
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
    const [selectedCity, setSelectedCity] = useState('')
    const handleSearchCompany = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            window.location.href = `/search-company?page=1&keyword=${(e.target as any).keyword.value || 'all'}&address=${selectedCity || 'all'}`
        } catch (err) {
        }
    }
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
                            <form onSubmit={(e) => { handleSearchCompany(e) }}>
                                <div className='search-box'>

                                    {/* title search */}
                                    <div className='search-title'>
                                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.499 19.3203C15.9172 19.3203 19.499 15.7386 19.499 11.3203C19.499 6.90203 15.9172 3.32031 11.499 3.32031C7.08068 3.32031 3.49896 6.90203 3.49896 11.3203C3.49896 15.7386 7.08068 19.3203 11.499 19.3203Z" stroke="#BC2228" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M21.499 21.3207L17.149 16.9707" stroke="#BC2228" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <input type="text" placeholder='Company name, Keyword...' name='keyword' />
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
                                        <Select value={selectedCity || ''} onChange={setSelectedCity}>
                                            <Select.Option value="" disabled hidden>Chọn thành phố</Select.Option>
                                            {OptionLocation.map(province => (
                                                <Select.Option key={province} value={province}>
                                                    {province}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </div>

                                    {/* find button */}
                                    <button type='submit'>Find Company</button>
                                </div>
                            </form>
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

            <GoodJob />
            <GoodCandidate />
            <Testimonial />
        </>
    )
}
