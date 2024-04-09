import pictures from '@/pictures'

import './navigation.scss'

export default function Navigation() {
    return (
        <div className='nav-container'>
            {/* LOGO */}
            <div className='logo'>
                <img src={pictures.main_logo} alt="logo" />
            </div>
            {/* END LOGO */}

            {/* SEARCH */}
            <div className='search-box'>
                <select>
                    <option>Hà Nội</option>
                </select>
                <div className='line'></div>
                <div className='search-content'>
                    <svg viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.3549 19.3242C15.7732 19.3242 19.3549 15.7425 19.3549 11.3242C19.3549 6.90594 15.7732 3.32422 11.3549 3.32422C6.93661 3.32422 3.35489 6.90594 3.35489 11.3242C3.35489 15.7425 6.93661 19.3242 11.3549 19.3242Z" stroke="#BC2228" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M21.3549 21.3241L17.0049 16.9741" stroke="#BC2228" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <input type='text' placeholder='Job title, keyword, company' />
                </div>
            </div>
            {/* END SEARCH */}

            {/* BUTTON GROUP */}
            <div className='button-group'>
                {/* login */}
                <button className='login-button layout'>Đăng nhập</button>

                {/* register */}
                <button className='register-button layout'>Đăng kí</button>

                {/* recruit */}
                <button className='recruit-button layout'>Đăng tuyển</button>

            </div>
            {/* END BUTTON GROUP */}

        </div>
    )
}
