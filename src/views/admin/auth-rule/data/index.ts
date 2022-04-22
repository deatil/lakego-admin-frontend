import { BasicColumn, FormProps } from '/@/components/Table';

/**
 * 表格头
 */
export const tableColumns: BasicColumn[] = [
  {
    title: '路由名称',
    dataIndex: 'title',
    width: 80,
    align: 'left',
    slots: { 
      customRender: 'title', 
    },
  },
  {
    title: '路由',
    dataIndex: 'url',
    width: 150,
    align: 'left',
    slots: { 
      customRender: 'url', 
    },
  },
  {
    title: '添加时间',
    dataIndex: 'add_time',
    width: 130,
    align: 'left',
    slots: { 
      customRender: 'add_time', 
    },
  },
  {
    title: '排序',
    dataIndex: 'listorder',
    width: 100,
    align: 'center',
    edit: true,
    editRule: true,
    editComponent: 'Input',
},
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    edit: true,
    editComponent: 'Switch',
    editValueMap: (value) => {
      return value ? '启用' : '禁用';
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
        field: `method`,
        label: `请求方式`,
        component: 'Select',
        componentProps: {
          placeholder: '请选择请求方式',
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
              label: '名称倒序',
              value: 'title__DESC',
              key: 'title__DESC',
            },
            {
              label: '名称顺序',
              value: 'title__ASC',
              key: 'title__ASC',
            },
            {
              label: '路由倒序',
              value: 'url__DESC',
              key: 'url__DESC',
            },
            {
              label: '路由顺序',
              value: 'url__ASC',
              key: 'url__ASC',
            },
            {
              label: '请求方式倒序',
              value: 'method__DESC',
              key: 'method__DESC',
            },
            {
              label: '请求方式顺序',
              value: 'method__ASC',
              key: 'method__ASC',
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
