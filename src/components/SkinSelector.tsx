import { X, Check } from 'lucide-react';
import { Theme } from '../types';

interface SkinSelectorProps {
  themes: Theme[];
  currentTheme: Theme;
  onSelectTheme: (themeId: string) => void;
  onClose: () => void;
}

export function SkinSelector({
  themes,
  currentTheme,
  onSelectTheme,
  onClose,
}: SkinSelectorProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        style={{ borderColor: currentTheme.borderColor, borderWidth: 2 }}
      >
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ backgroundColor: currentTheme.primaryColor }}
        >
          <h2 className="text-xl font-bold text-white">选择皮肤</h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6 space-y-3">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => onSelectTheme(theme.id)}
              className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 ${
                currentTheme.id === theme.id
                  ? 'border-transparent scale-[1.02]'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              style={{
                backgroundColor: theme.backgroundColor,
                borderColor:
                  currentTheme.id === theme.id ? theme.secondaryColor : undefined,
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full"
                  style={{ backgroundColor: theme.secondaryColor }}
                />
                <span
                  className="font-medium text-lg"
                  style={{ color: theme.textColor }}
                >
                  {theme.name}
                </span>
              </div>
              {currentTheme.id === theme.id && (
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: theme.secondaryColor }}
                >
                  <Check size={18} className="text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}