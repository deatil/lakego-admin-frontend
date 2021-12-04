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
];

// 基础设置 form
export const baseSetschemas: FormSchema[] = [
  {
    field: 'nickname',
    component: 'Input',
    label: '昵称',
    helpMessage: '请输入昵称',
    required: true,
    colProps: { span: 18 },
  },
  {
    field: 'email',
    component: 'Input',
    label: '邮箱',
    helpMessage: '请输入邮箱',
    required: true,
    colProps: { span: 18 },
  },
  {
    field: 'introduce',
    component: 'InputTextArea',
    label: '个人简介',
    colProps: { 
      span: 18,
      style: "height: 50px;",
    },
  },
];
