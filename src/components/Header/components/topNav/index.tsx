import pictures from '@/pictures'

import './topnav.scss'

export default function TopNav() {
    const item = [
        {
            title: 'Trang chủ',
            isActive: ''
        },
        {
            title: 'Việc làm',
            isActive: 'active'
        },
        {
            title: 'CV của bạn',
            isActive: ''
        },
        {
            title: 'Customer Supports',
            isActive: ''
        }]

    return (
        <>
            <div className='top-nav-container'>
                {/* left */}
                <div className='left'>
                    {
                        item.map((item) => (
                            <div className={`item ${item.isActive}`}>{item.title}</div>
                        ))
                    }
                </div>

                {/* right */}
                <div className='right'>
                    {/* phone */}
                    <div className='phone'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.9454 3.75C16.2168 4.09194 17.3761 4.76196 18.3071 5.69294C19.238 6.62392 19.908 7.78319 20.25 9.05462" stroke="#18191C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M14.1687 6.64844C14.9316 6.8536 15.6271 7.25561 16.1857 7.8142C16.7443 8.37279 17.1463 9.06835 17.3515 9.83121" stroke="#18191C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M8.66965 11.7014C9.44762 13.2919 10.7369 14.5753 12.3309 15.346C12.4475 15.4013 12.5765 15.4252 12.7052 15.4155C12.8339 15.4058 12.9579 15.3627 13.0648 15.2905L15.4119 13.7254C15.5157 13.6562 15.6352 13.6139 15.7594 13.6025C15.8837 13.5911 16.0088 13.6109 16.1235 13.66L20.5144 15.5419C20.6636 15.6052 20.7881 15.7154 20.8693 15.8556C20.9504 15.9959 20.9838 16.1588 20.9643 16.3197C20.8255 17.4057 20.2956 18.4039 19.4739 19.1273C18.6521 19.8508 17.5948 20.2499 16.5 20.25C13.1185 20.25 9.87548 18.9067 7.48439 16.5156C5.0933 14.1245 3.75 10.8815 3.75 7.49997C3.75006 6.40513 4.14918 5.34786 4.87264 4.5261C5.5961 3.70435 6.59428 3.17448 7.68028 3.03569C7.84117 3.01622 8.00403 3.04956 8.14432 3.1307C8.28461 3.21183 8.39473 3.33636 8.4581 3.48552L10.3416 7.88032C10.3903 7.994 10.4101 8.11796 10.3994 8.24116C10.3886 8.36436 10.3475 8.48299 10.2798 8.58647L8.72011 10.9696C8.64912 11.0768 8.60716 11.2006 8.59831 11.3288C8.58947 11.4571 8.61405 11.5855 8.66965 11.7014V11.7014Z" stroke="#18191C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <div>+1-202-555-0178</div>
                    </div>

                    {/* language */}
                    <div className='language'>
                        <img src={pictures.flagEN} alt="flag EN" />
                        <select>
                            <option>English</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    )
}
