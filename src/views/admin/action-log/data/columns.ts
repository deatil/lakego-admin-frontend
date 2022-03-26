import { BasicColumn, FormProps } from '/@/components/Table';

/**
 * 表格头
 */
export const tableColumns: BasicColumn[] = [
  {
    title: '操作账号',
    dataIndex: 'name',
    align: 'left',
    slots: { 
      customRender: 'name', 
    },
  },
  {
    title: '请求方法',
    dataIndex: 'method',
    width: 80,
    align: 'left',
    slots: { 
      customRender: 'method', 
    },
  },
  {
    title: '记录时间',
    dataIndex: 'time',
    width: 160,
    align: 'left',
    slots: { 
      customRender: 'time', 
    },
  },
  {
    title: '状态码',
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
              label: '添加时间倒序',
              value: 'time__DESC',
              key: 'time__DESC',
            },
            {
              label: '添加时间顺序',
              value: 'time__ASC',
              key: 'time__ASC',
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
        label: `状态码`,
        component: 'Input',
        componentProps: {
          placeholder: '请输入状态码',
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
