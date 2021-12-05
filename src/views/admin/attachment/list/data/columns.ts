import { BasicColumn,} from '/@/components/Table';

/**
 * 表格头
 */
export const tableColumns: BasicColumn[] = [
  {
    title: '文件名',
    dataIndex: 'name',
    slots: { 
      customRender: 'name', 
    },
  },
  {
    title: '文件大小',
    dataIndex: 'size',
    width: 100,
    align: 'center',
    slots: { 
      customRender: 'size', 
    },
  },
  {
    title: '文件路径',
    dataIndex: 'path',
    width: 120,
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
    slots: { 
      customRender: 'extension', 
    },
  },
  {
    title: '添加时间',
    dataIndex: 'add_time',
    width: 160,
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
