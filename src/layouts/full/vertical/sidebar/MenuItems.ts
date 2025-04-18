import { useState, useEffect } from 'react';
import { uniqueId } from 'lodash';

interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}
import { IconDashboard, IconUsersGroup, IconNews } from '@tabler/icons-react';

const adminMenuItems: MenuitemsType[] = [
  {
    navlabel: true,
    subheader: 'HR Menu',
  },
  {
    id: uniqueId(),
    title: 'Admin Dashboard',
    icon: IconDashboard,
    href: '/admin/dashboard',
  },
  {
    id: uniqueId(),
    title: 'รายชื่อพนักงาน',
    icon: IconUsersGroup,
    href: '/admin/emp-lists',
  },
  {
    id: uniqueId(),
    title: 'เพิ่มข่าวประชาสัมพันธ์',
    icon: IconNews,
    href: '/admin/add-news',
  },
];

const userMenuItems: MenuitemsType[] = [
  {
    navlabel: true,
    subheader: 'Menu',
  },
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconDashboard,
    href: '/user/dashboard',
  },
  {
    id: uniqueId(),
    title: 'ข่าวประชาสัมพันธ์',
    icon: IconNews,
    href: '/user/news',
  },
];

const Menuitems = () => {
  const [menuItems, setMenuItems] = useState<MenuitemsType[]>([]);

  useEffect(() => {
    const empRole = localStorage.getItem('empRole') || '';
    if (empRole === 'admin') {
      setMenuItems(adminMenuItems);
    } else {
      setMenuItems(userMenuItems);
    }
  }, []);

  return menuItems;
};

export default Menuitems;
