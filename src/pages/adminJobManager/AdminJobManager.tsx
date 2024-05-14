import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import './adminJobManager.scss'

export default function AdminJobManager() {
    let jobs = [
        {
            id: 1,
            jobName: 'Full-stack Developer',
            company: 'FPT Software',
            email: 'victorkesangtao@gmail.com',
            expiries: '11/08/2001',
            salaryMin: '$20,000',
            salaryMax: '$25,000',
            status: true,
        },
        {
            id: 1,
            jobName: 'Full-stack Developer',
            company: 'FPT Software',
            email: 'victorkesangtao@gmail.com',
            expiries: '11/08/2001',
            salaryMin: '$20,000',
            salaryMax: '$25,000',
            status: true,
        },
        {
            id: 1,
            jobName: 'Full-stack Developer',
            company: 'FPT Software',
            email: 'victorkesangtao@gmail.com',
            expiries: '11/08/2001',
            salaryMin: '$20,000',
            salaryMax: '$25,000',
            status: true,
        },
        {
            id: 1,
            jobName: 'Full-stack Developer',
            company: 'FPT Software',
            email: 'victorkesangtao@gmail.com',
            expiries: '11/08/2001',
            salaryMin: '$20,000',
            salaryMax: '$25,000',
            status: true,
        },
        {
            id: 1,
            jobName: 'Full-stack Developer',
            company: 'FPT Software',
            email: 'victorkesangtao@gmail.com',
            expiries: '11/08/2001',
            salaryMin: '$20,000',
            salaryMax: '$25,000',
            status: true,
        },
        {
            id: 1,
            jobName: 'Full-stack Developer',
            company: 'FPT Software',
            email: 'victorkesangtao@gmail.com',
            expiries: '11/08/2001',
            salaryMin: '$20,000',
            salaryMax: '$25,000',
            status: true,
        },
        {
            id: 1,
            jobName: 'Full-stack Developer',
            company: 'FPT Software',
            email: 'victorkesangtao@gmail.com',
            expiries: '11/08/2001',
            salaryMin: '$20,000',
            salaryMax: '$25,000',
            status: true,
        },
        {
            id: 1,
            jobName: 'Full-stack Developer',
            company: 'FPT Software',
            email: 'victorkesangtao@gmail.com',
            expiries: '11/08/2001',
            salaryMin: '$20,000',
            salaryMax: '$25,000',
            status: true,
        },
        {
            id: 1,
            jobName: 'Full-stack Developer',
            company: 'FPT Software',
            email: 'victorkesangtao@gmail.com',
            expiries: '11/08/2001',
            salaryMin: '$20,000',
            salaryMax: '$25,000',
            status: false,
        },
        {
            id: 1,
            jobName: 'Full-stack Developer',
            company: 'FPT Software',
            email: 'victorkesangtao@gmail.com',
            expiries: '11/08/2001',
            salaryMin: '$20,000',
            salaryMax: '$25,000',
            status: true,
        },
    ]

 
    const toggleHandler = () => {
        
    };
    return (
        <>
            <Breadcrumb />
            <div className='admin_manager_job_container'>
                <div className='content'>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên công việc</th>
                                <th>Công ty</th>
                                <th>Email liên hệ</th>
                                <th>Thời hạn ứng tuyển</th>
                                <th>Khoảng lương</th>
                                <th>Trạng thái</th>
                                <th>Chi tiết thông tin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                jobs?.map(item => {
                                    return (
                                        <>
                                            <tr key={Date.now() * Math.random()}>
                                                <td className='id'>{item.id}</td>
                                                <td>{item.jobName}</td>
                                                <td className='bgc'>{item.company}</td>
                                                <td>{item.email}</td>
                                                <td>
                                                    <div className='content'>
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <g clip-path="url(#clip0_266_30841)">
                                                                <path d="M8.2 9.6C7.97333 9.6 7.78347 9.5232 7.6304 9.3696C7.4768 9.21653 7.4 9.02667 7.4 8.8C7.4 8.57333 7.4768 8.3832 7.6304 8.2296C7.78347 8.07653 7.97333 8 8.2 8C8.42667 8 8.6168 8.07653 8.7704 8.2296C8.92347 8.3832 9 8.57333 9 8.8C9 9.02667 8.92347 9.21653 8.7704 9.3696C8.6168 9.5232 8.42667 9.6 8.2 9.6ZM5 9.6C4.77333 9.6 4.5832 9.5232 4.4296 9.3696C4.27653 9.21653 4.2 9.02667 4.2 8.8C4.2 8.57333 4.27653 8.3832 4.4296 8.2296C4.5832 8.07653 4.77333 8 5 8C5.22667 8 5.4168 8.07653 5.5704 8.2296C5.72347 8.3832 5.8 8.57333 5.8 8.8C5.8 9.02667 5.72347 9.21653 5.5704 9.3696C5.4168 9.5232 5.22667 9.6 5 9.6ZM11.4 9.6C11.1733 9.6 10.9835 9.5232 10.8304 9.3696C10.6768 9.21653 10.6 9.02667 10.6 8.8C10.6 8.57333 10.6768 8.3832 10.8304 8.2296C10.9835 8.07653 11.1733 8 11.4 8C11.6267 8 11.8165 8.07653 11.9696 8.2296C12.1232 8.3832 12.2 8.57333 12.2 8.8C12.2 9.02667 12.1232 9.21653 11.9696 9.3696C11.8165 9.5232 11.6267 9.6 11.4 9.6ZM8.2 12.8C7.97333 12.8 7.78347 12.7232 7.6304 12.5696C7.4768 12.4165 7.4 12.2267 7.4 12C7.4 11.7733 7.4768 11.5835 7.6304 11.4304C7.78347 11.2768 7.97333 11.2 8.2 11.2C8.42667 11.2 8.6168 11.2768 8.7704 11.4304C8.92347 11.5835 9 11.7733 9 12C9 12.2267 8.92347 12.4165 8.7704 12.5696C8.6168 12.7232 8.42667 12.8 8.2 12.8ZM5 12.8C4.77333 12.8 4.5832 12.7232 4.4296 12.5696C4.27653 12.4165 4.2 12.2267 4.2 12C4.2 11.7733 4.27653 11.5835 4.4296 11.4304C4.5832 11.2768 4.77333 11.2 5 11.2C5.22667 11.2 5.4168 11.2768 5.5704 11.4304C5.72347 11.5835 5.8 11.7733 5.8 12C5.8 12.2267 5.72347 12.4165 5.5704 12.5696C5.4168 12.7232 5.22667 12.8 5 12.8ZM11.4 12.8C11.1733 12.8 10.9835 12.7232 10.8304 12.5696C10.6768 12.4165 10.6 12.2267 10.6 12C10.6 11.7733 10.6768 11.5835 10.8304 11.4304C10.9835 11.2768 11.1733 11.2 11.4 11.2C11.6267 11.2 11.8165 11.2768 11.9696 11.4304C12.1232 11.5835 12.2 11.7733 12.2 12C12.2 12.2267 12.1232 12.4165 11.9696 12.5696C11.8165 12.7232 11.6267 12.8 11.4 12.8ZM2.6 16C2.16 16 1.7832 15.8435 1.4696 15.5304C1.15653 15.2168 1 14.84 1 14.4V3.2C1 2.76 1.15653 2.38347 1.4696 2.0704C1.7832 1.7568 2.16 1.6 2.6 1.6H3.4V0H5V1.6H11.4V0H13V1.6H13.8C14.24 1.6 14.6168 1.7568 14.9304 2.0704C15.2435 2.38347 15.4 2.76 15.4 3.2V14.4C15.4 14.84 15.2435 15.2168 14.9304 15.5304C14.6168 15.8435 14.24 16 13.8 16H2.6ZM2.6 14.4H13.8V6.4H2.6V14.4Z" fill="#AAAAAA" />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_266_30841">
                                                                    <rect width="16" height="16" fill="white" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                        <span>{item.expiries}</span>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M11.9872 2.04239C9.25728 -0.680798 4.77739 -0.680798 2.04745 2.04239C-0.682484 4.76559 -0.682484 9.23441 2.04745 11.9576C4.77739 14.6808 9.18728 14.6808 11.9172 11.9576C14.6471 9.23441 14.7171 4.76559 11.9872 2.04239ZM8.97728 9.93267L7.01733 7.97756L5.05738 9.93267L4.0774 8.95511L6.03735 7L4.0774 5.04489L5.05738 4.06733L7.01733 6.02244L8.97728 4.06733L9.95726 5.04489L7.99731 7L9.95726 8.95511L8.97728 9.93267Z" fill="#AAAAAA" />
                                                        </svg>

                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='salary'>
                                                        <div className='number'>
                                                            <span>{item.salaryMin}</span>
                                                        </div>
                                                        <span>-</span>
                                                        <div className='number'>
                                                            <span>{item.salaryMax}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='bgc'>
                                                    <div className='status'>
                                                        <div className={`toggle-button ${item.status ? 'on' : 'off'}`} onClick={toggleHandler}>
                                                            <div className="circle"></div>
                                                            <span className="label">{item.status ? 'ON' : 'OFF'}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='link'>Truy cập</td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
