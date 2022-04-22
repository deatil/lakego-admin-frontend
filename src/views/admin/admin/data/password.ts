import { FormSchema } from '/@/components/Form/index';

export const schemas: FormSchema[] = [
  {
    field: 'id',
    component: 'Input',
    label: '账号ID',
    defaultValue: '',
    dynamicDisabled: true,
  },
  {
    field: 'name',
    component: 'Input',
    label: '登录账号',
    defaultValue: '',
    dynamicDisabled: true,
  },
  {
    field: 'password',
    label: '新的密码',
    component: 'StrengthMeter',
    componentProps: {
      placeholder: '新密码',
    },
    rules: [
      {
        required: true,
        message: '请输入新密码',
      },
    ],
  },
];
