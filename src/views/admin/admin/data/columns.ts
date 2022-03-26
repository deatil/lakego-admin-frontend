import { BasicColumn, FormProps } from '/@/components/Table';

/**
 * 表格头
 */
export const tableColumns: BasicColumn[] = [
  {
    title: '文件名',
    dataIndex: 'name',
    align: 'left',
    slots: { 
      customRender: 'name', 
    },
  },
  {
    title: '文件大小',
    dataIndex: 'size',
    width: 100,
    align: 'left',
    slots: { 
      customRender: 'size', 
    },
  },
  {
    title: '文件路径',
    dataIndex: 'path',
    width: 120,
    align: 'left',
    helpMessage: ['存储时的文件路径', '相当于相对路径'],
    defaultHidden: true,
    slots: { 
      customRender: 'path', 
    },
  },
  {
    title: '文件类型',
    dataIndex: 'extension',
    width: 80,
    align: 'left',
    slots: { 
      customRender: 'extension', 
    },
  },
  {
    title: '添加时间',
    dataIndex: 'add_time',
    width: 160,
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
    ],
  };
}
