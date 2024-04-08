

import './footer.scss'
import pictures from '@/pictures'
export default function Footer({ handleBackToTop }: {
  handleBackToTop: any
}) {
  return (
    <div className='footer_container'>
      <div className='footer_content'>
        <div className='left'>
          <img className='Rikkei_logo' src={pictures.logo_RikkeiEdu} alt='Rikkei_logo'></img>
          <div className='left_content'>
            <div className='top'>
              <p>Tầng 7 tháp A toà Sông Đà, đường Phạm Hùng, quận Nam Từ Liêm, Hà Nội</p>
              <p>0862 069 233</p>
              <p>academy@rikkeisoft.com</p>
            </div>
            <div className='bottom'>
              <img src={pictures.logo_facebook} alt='Rikkei_logo'></img>
              <img src={pictures.logo_youtube} alt='Rikkei_logo'></img>
            </div>
          </div>
        </div>
        <div className='right'>
          <div className='right_content'>
            <div className='content'>
              <p>Khóa học</p>
              <ul>
                <li>Làm quen với Code</li>
                <li>Bootcamp Fulltime</li>
                <li>Bootcamp Parttime</li>
                <li>Kỹ sư CNTT - PTIT</li>
                <li>Bổ trợ cho nghề</li>
              </ul>
            </div>
            <div className='content'>
              <p>Tài nguyên học tập</p>
              <ul>
                <li>Blog</li>
                <li>Ebook - Report</li>
                <li>Khóa học miễn phí</li>
                <li>Sự kiện - Webinar</li>
                <li>Cộng đồng</li>
              </ul>
            </div>
            <div className='content'>
              <p>Vì sao chọn Rikkei Academy</p>
              <ul>
                <li>Về Rikkei Academy</li>
                <li>Hệ sinh thái Rikkei</li>
                <li>Cơ hội nghề nghiệp</li>
                <li>Tấm gương sáng</li>
                <li>Liên hệ</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
      <div className='copyright'>
        <p>Copyright 2023 © Rikkei Education. All Rights Reserved.</p>
      </div>
    </div>
  )
}
