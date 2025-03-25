import { NavItem } from '@/types';

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};
export const users: User[] = [
  {
    id: 1,
    name: 'Candice Schiner',
    company: 'Dell',
    role: 'Frontend Developer',
    verified: false,
    status: 'Active'
  },
  {
    id: 2,
    name: 'John Doe',
    company: 'TechCorp',
    role: 'Backend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    company: 'WebTech',
    role: 'UI Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 4,
    name: 'David Smith',
    company: 'Innovate Inc.',
    role: 'Fullstack Developer',
    verified: false,
    status: 'Inactive'
  },
  {
    id: 5,
    name: 'Emma Wilson',
    company: 'TechGuru',
    role: 'Product Manager',
    verified: true,
    status: 'Active'
  },
  {
    id: 6,
    name: 'James Brown',
    company: 'CodeGenius',
    role: 'QA Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 7,
    name: 'Laura White',
    company: 'SoftWorks',
    role: 'UX Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 8,
    name: 'Michael Lee',
    company: 'DevCraft',
    role: 'DevOps Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 9,
    name: 'Olivia Green',
    company: 'WebSolutions',
    role: 'Frontend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 10,
    name: 'Robert Taylor',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active'
  }
];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

export const homeNavItems: NavItem[] = [
  {
    title: '首页',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: '商店',
    url: '/dashboard/store',
    icon: 'billing',
    isActive: true
  }
];

export const storeNavItems: NavItem[] = [
  {
    title: '账单',
    url: '/dashboard/billing',
    icon: 'billing',
    isActive: true
  },
  // {
  //   title: '订阅中心',
  //   url: '/dashboard/subscribe',
  //   icon: 'product',
  //   isActive: false,
  //   items: [] // No child items
  // },
  {
    title: '使用记录',
    url: '/dashboard/records',
    icon: 'repeat',
    isActive: false,
    items: [] // No child items
  }

  // {
  //   title: '我的钱包',
  //   url: '/dashboard/profile',
  //   icon: 'billing',
  //   isActive: true
  // },
];
export const managerNavItems: NavItem[] = [
  {
    title: '使用记录管理',
    url: '/manager/usageRecord',
    icon: 'user',
    isActive: false,
    items: [] // No child items
  },

  {
    title: '用户管理',
    url: '/manager/user',
    icon: 'user',
    isActive: false,
    items: [] // No child items
  },
  {
    title: '套餐管理',
    url: '/manager/pacakage',
    icon: 'user',
    isActive: false,
    items: [] // No child items
  },
  {
    title: '订单管理',
    url: '/manager/orders',
    icon: 'user',
    isActive: false,
    items: [] // No child items
  }
  // {
  //   title: '服务器管理',
  //   url: '/manager/server',
  //   icon: 'user',
  //   isActive: false,
  //   items: [] // No child items
  // }
];

export const useNavItems: NavItem[] = [
  {
    title: '使用教程',
    url: '/dashboard/tutorial',
    icon: 'user',
    isActive: false,
    items: [] // No child items
  },
  {
    title: '安全审计',
    url: '/dashboard/detect',
    icon: 'user',
    isActive: false,
    items: [] // No child items
  }
];
