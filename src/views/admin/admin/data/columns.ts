import { BasicColumn, FormProps } from '/@/components/Table';

/**
 * 表格头
 */
export const tableColumns: BasicColumn[] = [
  {
    title: '头像',
    dataIndex: 'avatar_url',
    width: 60,
    align: 'center',
    slots: { 
      customRender: 'avatar_url', 
    },
  },
  {
    title: '登录账号',
    dataIndex: 'name',
    width: 100,
    align: 'left',
    slots: { 
      customRender: 'name', 
    },
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    width: 120,
    align: 'left',
    slots: { 
      customRender: 'nickname', 
    },
  },
  {
    title: '最后登录',
    dataIndex: 'last_active',
    width: 130,
    align: 'left',
    slots: { 
      customRender: 'last_active', 
    },
  },
  {
    title: '注册时间',
    dataIndex: 'add_time',
    width: 130,
    align: 'left',
    slots: { 
      customRender: 'add_time', 
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 60,
    slots: { 
      customRender: 'status', 
    },
  },
];

export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    labelAlign: 'right',
    schemas: [
      {
        field: `searchword`,
        label: `关键字`,
        component: 'Input',
        componentProps: {
          placeholder: '请输入关键字',
        },
        colProps: {
          xl: 8,
          xxl: 4,
        },
      },
      {
        field: `order`,
        label: `数据排序`,
        component: 'Select',
        componentProps: {
          placeholder: '请选择排序',
          options: [
            {
              label: 'ID倒序',
              value: 'id__DESC',
              key: 'id__DESC',
            },
            {
              label: 'ID顺序',
              value: 'id__ASC',
              key: 'id__ASC',
            },
            {
              label: '账号倒序',
              value: 'name__DESC',
              key: 'name__DESC',
            },
            {
              label: '账号顺序',
              value: 'name__ASC',
              key: 'name__ASC',
            },
            {
              label: '最后在线倒序',
              value: 'last_active__DESC',
              key: 'last_active__DESC',
            },
            {
              label: '最后在线顺序',
              value: 'last_active__ASC',
              key: 'last_active__ASC',
            },
            {
              label: '添加时间倒序',
              value: 'add_time__DESC',
              key: 'add_time__DESC',
            },
            {
              label: '添加时间顺序',
              value: 'add_time__ASC',
              key: 'add_time__ASC',
            },
          ],
        },
        itemProps: {
        },
        colProps: {
          xl: 8,
          xxl: 4,
        },
      },
      {
        field: `status`,
        label: `状态`,
        component: 'Select',
        componentProps: {
          placeholder: '请选择状态',
          options: [
            {
              label: '启用',
              value: 'open',
              key: 'open',
            },
            {
              label: '禁用',
              value: 'close',
              key: 'close',
            },
          ],
        },
        itemProps: {
        },
        colProps: {
          xl: 8,
          xxl: 4,
        },
      },
      {
        field: `start_time`,
        label: `开始时间`,
        component: 'DatePicker',
        componentProps: {
          placeholder: '请选择时间',
          format: "YYYY-MM-DD HH:mm:ss",
          "show-time": true,
        },
        colProps: {
          xl: 8,
          xxl: 4,
        },
      },
      {
        field: `end_time`,
        label: `结束时间`,
        component: 'DatePicker',
        componentProps: {
          placeholder: '请选择时间',
          format: "YYYY-MM-DD HH:mm:ss",
          "show-time": true,
        },
        colProps: {
          xl: 8,
          xxl: 4,
        },
      },
    ],
  };
}
