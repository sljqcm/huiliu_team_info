import { Module, Theme } from '../types';

export const initialModules: Module[] = [
  {
    id: '1',
    title: '工作范围',
    type: 'standard',
    items: [
      { id: '1-1', content: '负责脱硫脱硝系统的日常运行与维护' },
      { id: '1-2', content: '监控烟气排放指标，确保达标' },
      { id: '1-3', content: '处理脱硫剂的制备与供应' },
      { id: '1-4', content: '配合检修工作，完成系统消缺' },
    ],
  },
  {
    id: '2',
    title: '人员架构',
    type: 'personnel',
    items: [],
    persons: [
      { id: '2-1', name: '张伟', position: '班长', contact: '13800138001' },
      { id: '2-2', name: '李强', position: '副班长', contact: '13800138002' },
      { id: '2-3', name: '王磊', position: '操作员', contact: '13800138003' },
      { id: '2-4', name: '赵鹏', position: '操作员', contact: '13800138004' },
    ],
  },
  {
    id: '3',
    title: '工作理念',
    type: 'standard',
    items: [
      { id: '3-1', content: '安全第一，预防为主' },
      { id: '3-2', content: '精益求精，追求卓越' },
      { id: '3-3', content: '团结协作，共同进步' },
      { id: '3-4', content: '节能减排，绿色发展' },
    ],
  },
  {
    id: '4',
    title: '班前会',
    type: 'standard',
    items: [
      { id: '4-1', content: '检查人员到岗情况，确认精神状态', date: '2024-01-15' },
      { id: '4-2', content: '通报当班任务和注意事项', date: '2024-01-15' },
      { id: '4-3', content: '强调安全风险点和防控措施', date: '2024-01-15' },
    ],
  },
  {
    id: '5',
    title: '班后会',
    type: 'standard',
    items: [
      { id: '5-1', content: '总结当班工作完成情况', date: '2024-01-14' },
      { id: '5-2', content: '汇报异常情况和处理措施', date: '2024-01-14' },
      { id: '5-3', content: '提出改进建议和注意事项', date: '2024-01-14' },
    ],
  },
  {
    id: '6',
    title: '违章记录',
    type: 'standard',
    items: [
      { id: '6-1', content: '李强：未按规定佩戴安全帽，已整改', date: '2024-01-10' },
    ],
  },
  {
    id: '7',
    title: '奖惩记录',
    type: 'standard',
    items: [
      { id: '7-1', content: '张伟：月度优秀员工，奖励500元', date: '2024-01-01' },
      { id: '7-2', content: '班组：季度安全先进班组，奖励2000元', date: '2024-01-01' },
    ],
  },
];

export const themes: Theme[] = [
  {
    id: 'industrial-blue',
    name: '工业蓝',
    primaryColor: '#1e3a5f',
    secondaryColor: '#3b82f6',
    backgroundColor: '#f0f4f8',
    cardBackgroundColor: '#ffffff',
    textColor: '#1e293b',
    borderColor: '#e2e8f0',
    buttonHoverColor: '#1d4ed8',
  },
  {
    id: 'vibrant-orange',
    name: '活力橙',
    primaryColor: '#9a3412',
    secondaryColor: '#f97316',
    backgroundColor: '#fff7ed',
    cardBackgroundColor: '#ffffff',
    textColor: '#431407',
    borderColor: '#fed7aa',
    buttonHoverColor: '#ea580c',
  },
  {
    id: 'fresh-green',
    name: '清新绿',
    primaryColor: '#14532d',
    secondaryColor: '#22c55e',
    backgroundColor: '#f0fdf4',
    cardBackgroundColor: '#ffffff',
    textColor: '#14532d',
    borderColor: '#bbf7d0',
    buttonHoverColor: '#16a34a',
  },
  {
    id: 'tech-purple',
    name: '科技紫',
    primaryColor: '#4c1d95',
    secondaryColor: '#8b5cf6',
    backgroundColor: '#faf5ff',
    cardBackgroundColor: '#ffffff',
    textColor: '#3b0764',
    borderColor: '#e9d5ff',
    buttonHoverColor: '#7c3aed',
  },
];

export const defaultTheme = themes[0];