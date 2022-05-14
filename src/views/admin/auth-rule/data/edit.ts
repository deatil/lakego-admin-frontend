import { FormSchema } from '/@/components/Form/index';

export const schemas: FormSchema[] = [
  {
    field: 'parentid',
    component: 'Select',
    componentProps: {
      options: [], 
      // defalut [],
      placeholder: '请选择父级菜单',
    },
    slot: 'parentidSelect',
    label: '父级菜单',
    defaultValue: '',
    required: true,
  },
  {
    field: 'title',
    component: 'Input',
    label: '名称',
    defaultValue: '',
    rules: [
      {
        required: true,
        message: '请输入名称',
      },
    ],
  },
  {
    field: 'method',
    component: 'Select',
    label: '请求类型',
    defaultValue: '',
    componentProps: {
      options: [
        {
          label: 'GET',
          value: 'GET',
          key: 'GET',
        },
        {
          label: 'HEAD',
          value: 'HEAD',
          key: 'HEAD',
        },
        {
          label: 'POST',
          value: 'POST',
          key: 'POST',
        },
        {
          label: 'PUT',
          value: 'PUT',
          key: 'PUT',
        },
        {
          label: 'DELETE',
          value: 'DELETE',
          key: 'DELETE',
        },
        {
          label: 'PATCH',
          value: 'PATCH',
          key: 'PATCH',
        },
        {
          label: 'OPTIONS',
          value: 'OPTIONS',
          key: 'OPTIONS',
        },
      ],
    },
    required: true,
  },
  {
    field: 'url',
    component: 'Input',
    label: '请求链接',
    defaultValue: '',
    required: true,
  },
  {
    field: 'slug',
    component: 'Input',
    label: '链接标识[Slug]',
    defaultValue: '',
    required: true,
  },
  {
    field: 'description',
    component: 'InputTextArea',
    label: '描述',
  },
  {
    field: 'listorder',
    component: 'InputNumber',
    label: '排序',
    defaultValue: '',
    required: true,
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
    required: true,
  },
];
