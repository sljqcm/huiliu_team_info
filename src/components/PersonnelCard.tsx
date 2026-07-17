import { Edit2, Trash2, Phone } from 'lucide-react';
import { Person, Theme } from '../types';

interface PersonnelCardProps {
  person: Person;
  theme: Theme;
  onEdit: () => void;
  onDelete: () => void;
}

export function PersonnelCard({ person, theme, onEdit, onDelete }: PersonnelCardProps) {
  return (
    <div
      className="flex items-center justify-between p-4 rounded-xl border transition-all duration-200 hover:shadow-md"
      style={{
        backgroundColor: theme.cardBackgroundColor,
        borderColor: theme.borderColor,
      }}
    >
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
          style={{ backgroundColor: theme.secondaryColor }}
        >
          {person.name.charAt(0)}
        </div>
        <div>
          <h4 className="font-semibold" style={{ color: theme.textColor }}>
            {person.name}
          </h4>
          <p className="text-sm" style={{ color: `${theme.textColor}80` }}>
            {person.position}
          </p>
          <div className="flex items-center gap-1 text-sm mt-1" style={{ color: `${theme.textColor}60` }}>
            <Phone size={12} />
            {person.contact}
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="p-2 rounded-lg transition-colors"
          style={{ backgroundColor: `${theme.secondaryColor}20`, color: theme.secondaryColor }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = `${theme.secondaryColor}30`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = `${theme.secondaryColor}20`;
          }}
          title="编辑"
        >
          <Edit2 size={18} />
        </button>
        <button
          onClick={onDelete}
          className="p-2 rounded-lg transition-colors hover:bg-red-100 hover:text-red-600"
          title="删除"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}