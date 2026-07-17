import { X, Settings as SettingsIcon, Grid3X3, List, Sparkles, Zap } from 'lucide-react';
import { Theme, Settings } from '../types';

interface SettingsModalProps {
  theme: Theme;
  settings: Settings;
  onClose: () => void;
  onUpdateSettings: (settings: Partial<Settings>) => void;
  onThemeChange: (themeId: string) => void;
  themes: Theme[];
}

export function SettingsModal({
  theme,
  settings,
  onClose,
  onUpdateSettings,
  onThemeChange,
  themes,
}: SettingsModalProps) {
  const isDark = theme.id === 'warm-dark';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div
        className="w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
        style={{
          backgroundColor: theme.cardBackgroundColor,
          backdropFilter: settings.glassEffect ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: settings.glassEffect ? 'blur(20px)' : 'none',
        }}
      >
        {/* 头部 */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{
            background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
          }}
        >
          <div className="flex items-center gap-2 text-white">
            <SettingsIcon size={22} />
            <h3 className="text-lg font-bold">设置</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* 主题选择 */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2" style={{ color: theme.textColor }}>
              <Sparkles size={18} />
              主题选择
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => onThemeChange(t.id)}
                  className="rounded-xl p-3 border-2 transition-all hover:scale-105"
                  style={{
                    borderColor: theme.id === t.id ? theme.secondaryColor : 'transparent',
                    background: `linear-gradient(135deg, ${t.primaryColor}, ${t.secondaryColor})`,
                    boxShadow: theme.id === t.id ? `0 0 0 3px ${theme.secondaryColor}30` : 'none',
                  }}
                >
                  <p className="text-white text-sm font-medium">{t.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* 面板模式 */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2" style={{ color: theme.textColor }}>
              <Grid3X3 size={18} />
              面板模式
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onUpdateSettings({ cardMode: 'grid' })}
                className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all"
                style={{
                  borderColor: settings.cardMode === 'grid' ? theme.secondaryColor : theme.borderColor,
                  backgroundColor: settings.cardMode === 'grid' ? `${theme.secondaryColor}15` : 'transparent',
                  color: theme.textColor,
                }}
              >
                <Grid3X3 size={18} />
                网格布局
              </button>
              <button
                onClick={() => onUpdateSettings({ cardMode: 'list' })}
                className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all"
                style={{
                  borderColor: settings.cardMode === 'list' ? theme.secondaryColor : theme.borderColor,
                  backgroundColor: settings.cardMode === 'list' ? `${theme.secondaryColor}15` : 'transparent',
                  color: theme.textColor,
                }}
              >
                <List size={18} />
                列表布局
              </button>
            </div>
          </div>

          {/* 卡片大小 */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center justify-between" style={{ color: theme.textColor }}>
              <span className="flex items-center gap-2">
                <Zap size={18} />
                卡片大小
              </span>
              <span className="text-sm font-medium" style={{ color: theme.secondaryColor }}>
                {Math.round(settings.scale * 100)}%
              </span>
            </h4>
            <div className="flex items-center gap-3">
              <span className="text-sm" style={{ color: `${theme.textColor}60` }}>小</span>
              <input
                type="range"
                min="0.7"
                max="1.5"
                step="0.1"
                value={settings.scale}
                onChange={(e) => onUpdateSettings({ scale: parseFloat(e.target.value) })}
                className="flex-1 h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  backgroundColor: theme.borderColor,
                  accentColor: theme.secondaryColor,
                }}
              />
              <span className="text-sm" style={{ color: `${theme.textColor}60` }}>大</span>
            </div>
          </div>

          {/* 效果开关 */}
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2" style={{ color: theme.textColor }}>
              <Sparkles size={18} />
              视觉效果
            </h4>
            <div className="space-y-2">
              <label className="flex items-center justify-between py-2 cursor-pointer">
                <span className="text-sm" style={{ color: theme.textColor }}>毛玻璃效果</span>
                <button
                  onClick={() => onUpdateSettings({ glassEffect: !settings.glassEffect })}
                  className="relative w-12 h-6 rounded-full transition-colors"
                  style={{
                    backgroundColor: settings.glassEffect ? theme.secondaryColor : theme.borderColor,
                  }}
                >
                  <div
                    className="absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow"
                    style={{
                      transform: settings.glassEffect ? 'translateX(26px)' : 'translateX(2px)',
                    }}
                  />
                </button>
              </label>
              <label className="flex items-center justify-between py-2 cursor-pointer">
                <span className="text-sm" style={{ color: theme.textColor }}>动画效果</span>
                <button
                  onClick={() => onUpdateSettings({ animation: !settings.animation })}
                  className="relative w-12 h-6 rounded-full transition-colors"
                  style={{
                    backgroundColor: settings.animation ? theme.secondaryColor : theme.borderColor,
                  }}
                >
                  <div
                    className="absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow"
                    style={{
                      transform: settings.animation ? 'translateX(26px)' : 'translateX(2px)',
                    }}
                  />
                </button>
              </label>
            </div>
          </div>
        </div>

        {/* 底部 */}
        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl text-white font-medium transition-all hover:opacity-90"
            style={{
              background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
            }}
          >
            完成
          </button>
        </div>
      </div>
    </div>
  );
}
