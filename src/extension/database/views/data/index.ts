import { BasicColumn, FormProps } from '/@/components/Table';

/**
 * 表格头
 */
export const tableColumns: BasicColumn[] = [
  {
    title: '表名',
    dataIndex: 'name',
    align: 'left',
    slots: { 
      customRender: 'name', 
    },
  },
  {
    title: '引擎',
    dataIndex: 'engine',
    width: 90,
    align: 'left',
    slots: { 
      customRender: 'engine', 
    },
  },
  {
    title: '排序规则',
    dataIndex: 'collation',
    align: 'left',
    slots: { 
      customRender: 'collation', 
    },
  },
  {
    title: '表大小',
    dataIndex: 'data_length',
    align: 'left',
    slots: { 
      customRender: 'data_length', 
    },
  },
  {
    title: '注释',
    dataIndex: 'comment',
    align: 'left',
    slots: { 
      customRender: 'comment', 
    },
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    align: 'left',
    slots: { 
      customRender: 'create_time', 
    },
  },
  {
    title: '更新时间',
    dataIndex: 'update_time',
    align: 'left',
    slots: { 
      customRender: 'update_time', 
    },
  },
];

