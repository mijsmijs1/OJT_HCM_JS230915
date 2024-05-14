
import './navigate.scss';
export default function Navigate() {
  const items = [
    {
      title: 'Hồ sơ',
      link: '/profile',
      isActive: '',
    },
    {
      title: 'Công việc đã ứng tuyển',
      link: `/applied-jobs`,
      isActive: '',
    },
    {
      title: 'Tiêu chí tìm việc',
      link: '/job-criteria',
      isActive: '',
    },
  ];
  if (window.location.href.includes('profile')) {
    items[0].isActive = 'active'
  }
  if (window.location.href.includes('applied-jobs')) {
    items[1].isActive = 'active'
  }
  const handleItemClick = (link: any) => {
    window.location.href = link;
  };

  return (
    <div className='nav_box'>
      {items.map((item) => (
        <div
          key={item.title}
          className={`nav_item ${item.isActive}`}
          onClick={() => handleItemClick(item.link)}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
}
