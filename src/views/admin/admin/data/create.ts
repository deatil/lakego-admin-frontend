import { FormSchema } from '/@/components/Form/index';

export const schemas: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '登录账号',
    defaultValue: '',
    required: true,
  },
  {
    field: 'nickname',
    component: 'Input',
    label: '账号昵称',
    defaultValue: '',
    required: true,
  },
  {
    field: 'email',
    component: 'Input',
    label: '账号邮箱',
    defaultValue: '',
    required: true,
  },
  {
    field: 'group_id',
    label: '账号分组',
    component: 'TreeSelect',

    componentProps: {
      replaceFields: {
        title: 'title',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    required: true,
  },
  {
    field: 'introduce',
    component: 'InputTextArea',
    label: '简介',
  },
  {
    field: 'status',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '启用',
          value: 1,
          key: '1',
        },
        {
          label: '禁用',
          value: 0,
          key: '0',
        },
      ],
    },
    label: '状态',
    defaultValue: 1,
    required: true,
  },
];
