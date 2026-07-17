import { Plus, Palette } from 'lucide-react';
import { Theme } from '../types';

interface HeaderProps {
  theme: Theme;
  onAddModule: () => void;
  onOpenSkinSelector: () => void;
}

export function Header({ theme, onAddModule, onOpenSkinSelector }: HeaderProps) {
  return (
    <header
      className="w-full py-8 px-4 text-center"
      style={{ backgroundColor: theme.primaryColor }}
    >
      <h1
        className="text-4xl md:text-5xl font-bold mb-2"
        style={{ color: '#ffffff' }}
      >
        灰硫班组信息
      </h1>
      <p className="text-white/80 mb-6">脱硫脱硝班组管理平台</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onAddModule}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all duration-200"
          style={{
            backgroundColor: '#ffffff',
            color: theme.primaryColor,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = theme.borderColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#ffffff';
          }}
        >
          <Plus size={20} />
          添加大项
        </button>
        <button
          onClick={onOpenSkinSelector}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all duration-200"
          style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: '#ffffff',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
          }}
        >
          <Palette size={20} />
          切换皮肤
        </button>
      </div>
    </header>
  );
}