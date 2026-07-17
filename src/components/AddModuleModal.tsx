import { useState } from 'react';
import { X, Users, FileText } from 'lucide-react';
import { Theme } from '../types';

interface AddModuleModalProps {
  theme: Theme;
  onClose: () => void;
  onAddModule: (title: string, type: 'standard' | 'personnel') => void;
}

export function AddModuleModal({ theme, onClose, onAddModule }: AddModuleModalProps) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'standard' | 'personnel'>('standard');

  const handleSubmit = () => {
    if (title.trim()) {
      onAddModule(title.trim(), type);
      setTitle('');
      setType('standard');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-md p-6"
        style={{ borderColor: theme.borderColor, borderWidth: 2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold" style={{ color: theme.textColor }}>
            添加大项
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="请输入大项名称..."
          className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-opacity-50 text-lg"
          style={{
            borderColor: theme.borderColor,
            color: theme.textColor,
            '--tw-ring-color': theme.secondaryColor,
          } as React.CSSProperties}
          autoFocus
        />
        <div className="mt-4">
          <p className="text-sm mb-2" style={{ color: `${theme.textColor}80` }}>
            选择类型：
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setType('standard')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border-2 transition-all duration-200 ${
                type === 'standard' ? 'border-transparent' : ''
              }`}
              style={{
                backgroundColor:
                  type === 'standard' ? theme.secondaryColor : theme.backgroundColor,
                borderColor: type === 'standard' ? theme.secondaryColor : theme.borderColor,
                color: type === 'standard' ? '#ffffff' : theme.textColor,
              }}
            >
              <FileText size={20} />
              普通模块
            </button>
            <button
              onClick={() => setType('personnel')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border-2 transition-all duration-200 ${
                type === 'personnel' ? 'border-transparent' : ''
              }`}
              style={{
                backgroundColor:
                  type === 'personnel' ? theme.secondaryColor : theme.backgroundColor,
                borderColor: type === 'personnel' ? theme.secondaryColor : theme.borderColor,
                color: type === 'personnel' ? '#ffffff' : theme.textColor,
              }}
            >
              <Users size={20} />
              人员模块
            </button>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg font-medium transition-colors"
            style={{
              backgroundColor: `${theme.borderColor}`,
              color: theme.textColor,
            }}
          >
            取消
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-2.5 rounded-lg font-medium transition-colors"
            style={{
              backgroundColor: theme.secondaryColor,
              color: '#ffffff',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme.buttonHoverColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = theme.secondaryColor;
            }}
          >
            添加
          </button>
        </div>
      </div>
    </div>
  );
}