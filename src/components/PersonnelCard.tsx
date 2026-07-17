import { Edit2, Trash2, Phone } from 'lucide-react';
import { Person, Theme } from '../types';

interface PersonnelCardProps {
  person: Person;
  theme: Theme;
  onEdit: () => void;
  onDelete: () => void;
}

export function PersonnelCard({ person, theme, onEdit, onDelete }: PersonnelCardProps) {
  // 毛玻璃效果：半透明背景 + 高斯模糊 + 细边框
  const isDark = theme.id === 'starlight-black';
  const glassBg = isDark
    ? 'rgba(255,255,255,0.08)'
    : `${theme.secondaryColor}14`;
  const glassBorder = isDark
    ? 'rgba(255,255,255,0.15)'
    : `${theme.secondaryColor}40`;

  return (
    <div
      className="rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl relative overflow-hidden group"
      style={{
        backgroundColor: glassBg,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: `1px solid ${glassBorder}`,
        boxShadow: isDark
          ? '0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
          : '0 2px 8px rgba(0,0,0,0.05)',
      }}
    >
      {/* 顶部光晕装饰 */}
      <div
        className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-20 group-hover:opacity-40 transition-opacity"
        style={{
          background: `radial-gradient(circle, ${theme.secondaryColor}, transparent 70%)`,
        }}
      />

      <div className="relative flex flex-col gap-3">
        {/* 头部：头像 + 姓名 + 操作按钮 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* 小方块头像 */}
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-base flex-shrink-0"
              style={{
                background: `linear-gradient(135deg, ${theme.secondaryColor}, ${theme.primaryColor})`,
                boxShadow: `0 2px 8px ${theme.secondaryColor}50`,
              }}
            >
              {person.name.charAt(0)}
            </div>
            <div>
              <h4
                className="font-semibold text-base leading-tight"
                style={{ color: theme.textColor }}
              >
                {person.name}
              </h4>
              <p
                className="text-xs mt-0.5"
                style={{ color: `${theme.textColor}80` }}
              >
                {person.position}
              </p>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={onEdit}
              className="p-1.5 rounded-lg transition-all"
              style={{
                backgroundColor: isDark
                  ? 'rgba(255,255,255,0.1)'
                  : `${theme.secondaryColor}20`,
                color: isDark ? '#fff' : theme.secondaryColor,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
              title="编辑"
            >
              <Edit2 size={14} />
            </button>
            <button
              onClick={onDelete}
              className="p-1.5 rounded-lg transition-all"
              style={{
                backgroundColor: 'rgba(239,68,68,0.15)',
                color: '#ef4444',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
              title="删除"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        {/* 底部：联系方式 */}
        <div
          className="flex items-center gap-1.5 text-xs pt-2 border-t"
          style={{
            color: `${theme.textColor}80`,
            borderColor: isDark
              ? 'rgba(255,255,255,0.1)'
              : `${theme.borderColor}`,
          }}
        >
          <Phone size={11} />
          <span>{person.contact}</span>
        </div>
      </div>
    </div>
  );
}
