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
    label: '父级菜单',
    defaultValue: '',
    required: true,
  },
  {
    field: 'title',
    component: 'Input',
    label: '名称',
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
