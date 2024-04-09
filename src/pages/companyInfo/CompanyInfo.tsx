import pictures from '@/pictures'
import './companyInfo.scss'

export default function CompanyInfo() {
  return (
    <div className='companyInfo_container'>
      <div className='content'>
        <div className='header'>
          <div className='header_left'>
            <img className='company_logo' src={pictures.logo_FPT} alt='logo'></img>
            <div className='company_info'>
              <p>Senior UX Designer</p>
              <div>
                <span>at FPT Software</span>
                <div className='full_time'>
                  <span>FULL-TIME</span>
                </div>
                <div className='featured'>
                  <span>Featured</span>
                </div>
              </div>
            </div>
          </div>
          <div className='header_right'>
            <div className='save'>
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 21.2637L11.9993 17.5137L6 21.2637V4.76367C6 4.56476 6.07902 4.37399 6.21967 4.23334C6.36032 4.09269 6.55109 4.01367 6.75 4.01367H17.25C17.4489 4.01367 17.6397 4.09269 17.7803 4.23334C17.921 4.37399 18 4.56476 18 4.76367V21.2637Z" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

            </div>
            <div className='apply'>
              <span>
                Ứng tuyển Ngay
              </span>
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12.2637H19" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M12 5.26367L19 12.2637L12 19.2637" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

            </div>
          </div>
        </div>
        <div className='info'>
          <div className='info_left'>
            <h3>Job Description</h3>
            <div className='description'>
              <span>
                Velstar is a Shopify Plus agency, and we partner with brands to help them grow, we also do the same with our people!
              </span>
              <span>
                Here at Velstar, we don't just make websites, we create exceptional digital experiences that consumers love. Our team of designers, developers, strategists, and creators work together to push brands to the next level. From Platform Migration, User Experience & User Interface Design, to Digital Marketing, we have a proven track record in delivering outstanding eCommerce solutions and driving sales for our clients.
              </span>
              <span>
                The role will involve translating project specifications into clean, test-driven, easily maintainable code. You will work with the Project and Development teams as well as with the Technical Director, adhering closely to project plans and delivering work that meets functional & non-functional requirements. You will have the opportunity to create new, innovative, secure and scalable features for our clients on the Shopify platform
              </span>
              <span>Want to work with us? You're in good company!</span>
            </div>
            <p>Requirements:</p>
            <ul>
              <li>Great troubleshooting and analytical skills combined with the desire to tackle challenges head-on</li>
              <li>Great troubleshooting and analytical skills combined with the desire to tackle challenges head-on</li>
              <li>Great troubleshooting and analytical skills combined with the desire to tackle challenges head-on</li>
              <li>Great troubleshooting and analytical skills combined with the desire to tackle challenges head-on</li>
              <li>Great troubleshooting and analytical skills combined with the desire to tackle challenges head-on</li>
              <li>Great troubleshooting and analytical skills combined with the desire to tackle challenges head-on</li>
              <li>Great troubleshooting and analytical skills combined with the desire to tackle challenges head-on</li>
              <li>Great troubleshooting and analytical skills combined with the desire to tackle challenges head-on</li>
            </ul>
            <p>Desirable:</p>
            <ul>
              <li>Working knowledge of eCommerce platforms, ideally Shopify but also others e.g. Magento, WooCommerce, Visualsoft to enable seamless migrations.</li>
              <li>Working knowledge of payment gateways</li>
              <li>Working knowledge of payment gateways</li>
            </ul>
            <p>Benefits</p>
            <ul>
              <li>Early finish on Fridays for our end of week catch up (4:30 finish, and drink of your choice from the bar)</li>
              <li>Early finish on Fridays for our end of week catch up (4:30 finish, and drink of your choice from the bar)</li>
              <li>Early finish on Fridays for our end of week catch up (4:30 finish, and drink of your choice from the bar)</li>
              <li>Early finish on Fridays for our end of week catch up (4:30 finish, and drink of your choice from the bar)</li>
              <li>Early finish on Fridays for our end of week catch up (4:30 finish, and drink of your choice from the bar)</li>
              <li>Early finish on Fridays for our end of week catch up (4:30 finish, and drink of your choice from the bar)</li>
              <li>Early finish on Fridays for our end of week catch up (4:30 finish, and drink of your choice from the bar)</li>
              <li>Early finish on Fridays for our end of week catch up (4:30 finish, and drink of your choice from the bar)</li>
              <li>Early finish on Fridays for our end of week catch up (4:30 finish, and drink of your choice from the bar)</li>
              <li>Early finish on Fridays for our end of week catch up (4:30 finish, and drink of your choice from the bar)</li>
            </ul>
          </div>
          <div className='info_right'>
              <div className='info_right_top'>

              </div>
              <div className='info_right_bottom'>
                
              </div>
          </div>
        </div>
      </div>

    </div>
  )
}
