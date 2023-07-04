import { BasicColumn, FormProps } from '/@/components/Table';

/**
 * 表格头
 */
export const tableColumns: BasicColumn[] = [
  {
    title: '扩展名称',
    dataIndex: 'title',
    align: 'left',
    slots: { 
      customRender: 'title', 
    },
  },
  {
    title: '版本',
    dataIndex: 'version',
    align: 'left',
  },
  {
    title: '适配版本',
    dataIndex: 'adaptation',
    align: 'left',
  },
  {
    title: '排序',
    dataIndex: 'listorder',
    width: 110,
    align: 'center',
    edit: true,
    editRule: true,
    editComponent: 'Input',
  },
  {
    title: '安装时间',
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
    edit: true,
    editComponent: 'Switch',
    editValueMap: (value) => {
      return value ? '启用' : '禁用';
    },
    width: 80,
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
              label: '排序倒序',
              value: 'listorder__DESC',
              key: 'listorder__DESC',
            },
            {
              label: '排序顺序',
              value: 'listorder__ASC',
              key: 'listorder__ASC',
            },
            {
              label: '安装时间倒序',
              value: 'add_time__DESC',
              key: 'add_time__DESC',
            },
            {
              label: '安装时间顺序',
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

/**
 * 表格头
 */
export const tableColumnsLocal: BasicColumn[] = [
  {
    title: '扩展名称',
    dataIndex: 'title',
    align: 'left',
    slots: { 
      customRender: 'title', 
    },
  },
  {
    title: '标识',
    dataIndex: 'name',
    align: 'left',
    slots: { 
      customRender: 'name', 
    },
  },
  {
    title: '扩展版本',
    dataIndex: 'version',
    align: 'left',
    slots: { 
      customRender: 'version', 
    },
  },
  {
    title: '适配系统版本',
    dataIndex: 'adaptation',
    align: 'left',
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
    slots: { 
      customRender: 'status', 
    },
  },
];
