import { Plus, Palette, Download, Upload } from 'lucide-react';
import { useRef } from 'react';
import { Theme, Module } from '../types';

interface HeaderProps {
  theme: Theme;
  onAddModule: () => void;
  onOpenSkinSelector: () => void;
  onExport: () => void;
  onImport: (data: { modules: Module[]; currentThemeId: string }) => void;
}

export function Header({ theme, onAddModule, onOpenSkinSelector, onExport, onImport }: HeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.modules && Array.isArray(data.modules)) {
          onImport(data);
          alert('导入成功！');
        } else {
          alert('文件格式不正确');
        }
      } catch {
        alert('文件解析失败，请确认是有效的JSON文件');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

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
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={onAddModule}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm md:text-base"
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
          <Plus size={18} />
          添加大项
        </button>
        <button
          onClick={onOpenSkinSelector}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm md:text-base"
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
          <Palette size={18} />
          切换皮肤
        </button>
        <button
          onClick={onExport}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm md:text-base"
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
          <Download size={18} />
          导出数据
        </button>
        <button
          onClick={handleImportClick}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm md:text-base"
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
          <Upload size={18} />
          导入数据
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </header>
  );
}