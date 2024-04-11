

import './navigate.scss'

export default function Navigate() {
    const item=[
        {
            title:'Hồ sơ',
            link:'',
            isAcitve:''
        },
        {
            title:'Quản lý công việc',
            link:'',
            isAcitve:'active'
        },
        {
            title:'Tiêu chí tìm việc',
            link:'',
            isAcitve:''
        }
    ]
  return (
    <>
    <div className='nav_box' key={Date.now() * Math.random()}>
    {
        item.map((item)=>(
            <div className={`nav_item ${item.isAcitve}`}>{item.title}</div>
        ))
    }
    </div>
    </>
  )
}
