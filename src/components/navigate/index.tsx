import React from 'react';
import './navigate.scss';

export default function Navigate() {
  const items = [
    {
      title: 'Hồ sơ',
      link: '/profile',
      isActive: 'active',
    },
    {
      title: 'Quản lý công việc',
      link: '/manage-jobs',
      isActive: '',
    },
    {
      title: 'Tiêu chí tìm việc',
      link: '/job-criteria',
      isActive: '',
    },
  ];

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
