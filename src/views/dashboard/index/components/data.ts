interface GroupItem {
  title: string;
  icon: string;
  color: string;
  desc: string;
  date: string;
  group: string;
}

interface NavItem {
  title: string;
  icon: string;
  color: string;
}

interface DynamicInfoItem {
  avatar: string;
  name: string;
  date: string;
  desc: string;
}

export const navItems: NavItem[] = [
  {
    title: '首页',
    icon: 'ion:home-outline',
    color: '#1fdaca',
  },
  {
    title: '仪表盘',
    icon: 'ion:grid-outline',
    color: '#bf0c2c',
  },
  {
    title: '组件',
    icon: 'ion:layers-outline',
    color: '#e18525',
  },
  {
    title: '系统管理',
    icon: 'ion:settings-outline',
    color: '#3fb27f',
  },
  {
    title: '权限管理',
    icon: 'ion:key-outline',
    color: '#4daf1bc9',
  },
  {
    title: '图表',
    icon: 'ion:bar-chart-outline',
    color: '#00d8ff',
  },
];

export const groupItems: GroupItem[] = [
  {
    title: 'Deatil',
    icon: 'carbon:logo-github',
    color: '',
    desc: '项目开发者 github 地址。',
    group: '开发者',
    date: '2021-11-28',
  },
  {
    title: '前端项目',
    icon: 'ion:logo-vue',
    color: '#3fb27f',
    desc: '基于 vue, vite 和 antd 的后台管理系统前端页面。',
    group: 'lakego-frontend',
    date: '2021-11-28',
  },
  {
    title: '后端项目',
    icon: 'ion:layers-outline',
    color: '#e18525',
    desc: '基于 gin, rbac 和 jwt 的 go 后端 api 后台管理系统。',
    group: 'lakego-admin',
    date: '2021-11-28',
  },
];
