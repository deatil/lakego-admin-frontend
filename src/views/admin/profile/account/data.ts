import { FormSchema } from '/@/components/Form/index';

export interface ListItem {
  key: string;
  title: string;
  description: string;
  extra?: string;
  avatar?: string;
  color?: string;
}

// tab的list
export const settingList = [
  {
    key: '1',
    name: '基本设置',
    component: 'BaseSetting',
  },
  {
    key: '2',
    name: '头像设置',
    component: 'AvatarSetting',
  },
];

// 基础设置 form
export const baseSetschemas: FormSchema[] = [
  {
    field: 'nickname',
    component: 'Input',
    componentProps: {
      placeholder: '请输入昵称',
    },
    label: '昵称',
    helpMessage: '请输入昵称',
    required: true,
    colProps: { 
      span: 18 
    },
  },
  {
    field: 'email',
    component: 'Input',
    componentProps: {
      placeholder: '请输入邮箱',
    },
    label: '邮箱',
    helpMessage: '请输入邮箱',
    required: true,
    colProps: { 
      span: 18 
    },
  },
  {
    field: 'introduce',
    component: 'InputTextArea',
    componentProps: {
      placeholder: '请输入简介信息',
      rows: 3,
    },
    label: '个人简介',
    colProps: { 
      span: 18,
      style: "height: 50px;",
    },
  },
];
