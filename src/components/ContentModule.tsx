import { useState } from 'react';
import {
  Edit2,
  Trash2,
  ChevronDown,
  ChevronRight,
  Plus,
  FileText,
  Calendar,
} from 'lucide-react';
import { Module, SubItem, Person, Theme } from '../types';
import { PersonnelCard } from './PersonnelCard';

interface ContentModuleProps {
  module: Module;
  theme: Theme;
  onAddSubItem: (parentItemId: string | null, item: Omit<SubItem, 'id' | 'children'>) => void;
  onDeleteSubItem: (itemId: string) => void;
  onUpdateSubItem: (itemId: string, updates: Partial<SubItem>) => void;
  onToggleSubItem: (itemId: string) => void;
  onAddPerson: (person: Omit<Person, 'id'>) => void;
  onDeletePerson: (personId: string) => void;
  onUpdatePerson: (personId: string, updates: Partial<Person>) => void;
  onDeleteModule: () => void;
  onUpdateModule: (updates: Partial<Module>) => void;
  compact?: boolean;
}

export function ContentModule({
  module,
  theme,
  onAddSubItem,
  onDeleteSubItem,
  onUpdateSubItem,
  onToggleSubItem,
  onAddPerson,
  onDeletePerson,
  onUpdatePerson,
  onDeleteModule,
  onUpdateModule,
  compact = false,
}: ContentModuleProps) {
  const [showAddItem, setShowAddItem] = useState(false);
  const [showAddPerson, setShowAddPerson] = useState(false);
  const [editingItem, setEditingItem] = useState<SubItem | null>(null);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const [addingChildTo, setAddingChildTo] = useState<string | null>(null);
  const [itemContent, setItemContent] = useState('');
  const [itemDate, setItemDate] = useState('');
  const [personName, setPersonName] = useState('');
  const [personPosition, setPersonPosition] = useState('');
  const [personContact, setPersonContact] = useState('');
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState(module.title);

  const isDark = theme.id === 'warm-dark';
  const cardBg = isDark ? 'rgba(255,255,255,0.05)' : `${theme.secondaryColor}0a`;
  const cardBorder = isDark ? 'rgba(255,255,255,0.1)' : `${theme.secondaryColor}30`;
  const cardHoverBg = isDark ? 'rgba(255,255,255,0.08)' : `${theme.secondaryColor}15`;
  const primary = theme.secondaryColor;

  const resetAddItem = () => {
    setShowAddItem(false);
    setItemContent('');
    setItemDate('');
    setAddingChildTo(null);
  };

  const handleAddItem = () => {
    if (!itemContent.trim()) return;
    onAddSubItem(addingChildTo, { content: itemContent.trim(), date: itemDate || undefined });
    resetAddItem();
  };

  const openAddChild = (parentId: string) => {
    setAddingChildTo(parentId);
    setItemContent('');
    setItemDate('');
    setShowAddItem(false);
  };

  const openEditItem = (item: SubItem) => {
    setEditingItem(item);
    setItemContent(item.content);
    setItemDate(item.date || '');
  };

  const handleUpdateItem = () => {
    if (!editingItem || !itemContent.trim()) return;
    onUpdateSubItem(editingItem.id, { content: itemContent.trim(), date: itemDate || undefined });
    setEditingItem(null);
    setItemContent('');
    setItemDate('');
  };

  const resetAddPerson = () => {
    setShowAddPerson(false);
    setPersonName('');
    setPersonPosition('');
    setPersonContact('');
  };

  const handleAddPerson = () => {
    if (!personName.trim()) return;
    onAddPerson({
      name: personName.trim(),
      position: personPosition.trim(),
      contact: personContact.trim(),
    });
    resetAddPerson();
  };

  const openEditPerson = (person: Person) => {
    setEditingPerson(person);
    setPersonName(person.name);
    setPersonPosition(person.position);
    setPersonContact(person.contact);
  };

  const handleUpdatePerson = () => {
    if (!editingPerson || !personName.trim()) return;
    onUpdatePerson(editingPerson.id, {
      name: personName.trim(),
      position: personPosition.trim(),
      contact: personContact.trim(),
    });
    setEditingPerson(null);
    resetAddPerson();
  };

  const handleSaveTitle = () => {
    if (titleInput.trim()) {
      onUpdateModule({ title: titleInput.trim() });
    } else {
      setTitleInput(module.title);
    }
    setEditingTitle(false);
  };

  const renderSubItem = (item: SubItem, depth: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isCollapsed = item.collapsed;
    const isAddingChild = addingChildTo === item.id;

    return (
      <div key={item.id} className="w-full">
        <div
          className="group rounded-xl p-3 flex items-start gap-3 transition-all cursor-pointer hover:shadow-md"
          style={{
            backgroundColor: cardBg,
            border: `1px solid ${cardBorder}`,
            marginLeft: depth > 0 ? `${depth * 24}px` : 0,
          }}
          onClick={() => hasChildren && onToggleSubItem(item.id)}
        >
          {/* 折叠图标 */}
          {hasChildren ? (
            <button
              className="flex-shrink-0 mt-0.5 p-1 rounded-md transition-colors"
              style={{ color: primary, backgroundColor: `${primary}15` }}
              onClick={(e) => {
                e.stopPropagation();
                onToggleSubItem(item.id);
              }}
            >
              {isCollapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
            </button>
          ) : (
            <div
              className="flex-shrink-0 mt-1 w-2 h-2 rounded-full"
              style={{ backgroundColor: primary, marginTop: '8px' }}
            />
          )}

          {/* 内容 */}
          <div className="flex-1 min-w-0" onClick={(e) => e.stopPropagation()}>
            <p className="text-sm font-medium leading-snug" style={{ color: theme.textColor }}>
              {item.content}
            </p>
            {item.date && (
              <div
                className="flex items-center gap-1 mt-1 text-xs"
                style={{ color: `${theme.textColor}60` }}
              >
                <Calendar size={12} />
                {item.date}
              </div>
            )}
          </div>

          {/* 操作按钮 */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                openAddChild(item.id);
              }}
              className="p-1.5 rounded-lg transition-colors"
              style={{ backgroundColor: `${primary}15`, color: primary }}
              title="添加子项"
            >
              <Plus size={14} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                openEditItem(item);
              }}
              className="p-1.5 rounded-lg transition-colors"
              style={{ backgroundColor: `${primary}15`, color: primary }}
              title="编辑"
            >
              <Edit2 size={14} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (confirm('确定删除该子项及其子子项？')) onDeleteSubItem(item.id);
              }}
              className="p-1.5 rounded-lg transition-colors"
              style={{ backgroundColor: 'rgba(239,68,68,0.15)', color: '#ef4444' }}
              title="删除"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        {/* 添加子子项输入框 */}
        {isAddingChild && (
          <div
            className="mt-2 p-3 rounded-xl"
            style={{
              marginLeft: depth > 0 ? `${depth * 24}px` : 0,
              backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : `${primary}05`,
              border: `1px dashed ${cardBorder}`,
            }}
          >
            <p className="text-xs mb-2" style={{ color: `${theme.textColor}70` }}>
              添加子子项到：{item.content}
            </p>
            <input
              type="text"
              value={itemContent}
              onChange={(e) => setItemContent(e.target.value)}
              placeholder="输入内容..."
              className="w-full px-3 py-2 rounded-lg text-sm mb-2"
              style={{
                backgroundColor: theme.cardBackgroundColor,
                border: `1px solid ${cardBorder}`,
                color: theme.textColor,
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
              autoFocus
            />
            <input
              type="date"
              value={itemDate}
              onChange={(e) => setItemDate(e.target.value)}
              className="w-full px-3 py-2 rounded-lg text-sm mb-2"
              style={{
                backgroundColor: theme.cardBackgroundColor,
                border: `1px solid ${cardBorder}`,
                color: theme.textColor,
              }}
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddItem}
                className="flex-1 py-2 rounded-lg text-white text-sm font-medium"
                style={{ backgroundColor: primary }}
              >
                添加
              </button>
              <button
                onClick={() => setAddingChildTo(null)}
                className="flex-1 py-2 rounded-lg text-sm"
                style={{ color: theme.textColor, backgroundColor: `${primary}10` }}
              >
                取消
              </button>
            </div>
          </div>
        )}

        {/* 子子项列表 */}
        {hasChildren && !isCollapsed && (
          <div className="mt-2 space-y-2">
            {item.children!.map((child) => renderSubItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-3">
      {/* 模块标题编辑 */}
      {compact && (
        <div className="flex items-center justify-between mb-2">
          {editingTitle ? (
            <input
              type="text"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              onBlur={handleSaveTitle}
              onKeyDown={(e) => e.key === 'Enter' && handleSaveTitle()}
              className="flex-1 px-2 py-1 rounded-lg text-sm font-bold"
              style={{
                backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                color: theme.textColor,
                border: `1px solid ${cardBorder}`,
              }}
              autoFocus
            />
          ) : (
            <button
              onClick={() => {
                setEditingTitle(true);
                setTitleInput(module.title);
              }}
              className="text-sm font-medium flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity"
              style={{ color: primary }}
            >
              <Edit2 size={14} />
              编辑标题
            </button>
          )}
          <button
            onClick={() => {
              if (confirm('确定删除整个模块？')) onDeleteModule();
            }}
            className="text-sm flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity"
            style={{ color: '#ef4444' }}
          >
            <Trash2 size={14} />
            删除模块
          </button>
        </div>
      )}

      {module.type === 'standard' ? (
        <>
          {/* 子项列表 */}
          {module.items.length === 0 ? (
            <div
              className="text-center py-6 rounded-xl text-sm"
              style={{
                backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : `${primary}05`,
                color: `${theme.textColor}50`,
              }}
            >
              暂无子项，点击下方按钮添加
            </div>
          ) : (
            <div className="space-y-2">
              {module.items.map((item) => renderSubItem(item, 0))}
            </div>
          )}

          {/* 添加子项按钮 / 输入框 */}
          {showAddItem ? (
            <div
              className="mt-3 p-3 rounded-xl"
              style={{
                backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : `${primary}05`,
                border: `1px dashed ${cardBorder}`,
              }}
            >
              <input
                type="text"
                value={itemContent}
                onChange={(e) => setItemContent(e.target.value)}
                placeholder="输入子项内容..."
                className="w-full px-3 py-2 rounded-lg text-sm mb-2"
                style={{
                  backgroundColor: theme.cardBackgroundColor,
                  border: `1px solid ${cardBorder}`,
                  color: theme.textColor,
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
                autoFocus
              />
              <input
                type="date"
                value={itemDate}
                onChange={(e) => setItemDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-sm mb-2"
                style={{
                  backgroundColor: theme.cardBackgroundColor,
                  border: `1px solid ${cardBorder}`,
                  color: theme.textColor,
                }}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAddItem}
                  className="flex-1 py-2 rounded-lg text-white text-sm font-medium"
                  style={{ backgroundColor: primary }}
                >
                  添加
                </button>
                <button
                  onClick={resetAddItem}
                  className="flex-1 py-2 rounded-lg text-sm"
                  style={{ color: theme.textColor, backgroundColor: `${primary}10` }}
                >
                  取消
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAddItem(true)}
              className="w-full py-2.5 rounded-xl border-2 border-dashed text-sm font-medium transition-all hover:border-solid"
              style={{
                borderColor: cardBorder,
                color: primary,
                backgroundColor: 'transparent',
              }}
            >
              <Plus size={16} className="inline mr-1" />
              添加子项
            </button>
          )}
        </>
      ) : (
        <>
          {/* 人员卡片网格 */}
          {!module.persons || module.persons.length === 0 ? (
            <div
              className="text-center py-6 rounded-xl text-sm"
              style={{
                backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : `${primary}05`,
                color: `${theme.textColor}50`,
              }}
            >
              暂无人员，点击下方按钮添加
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {module.persons.map((person) => (
                <PersonnelCard
                  key={person.id}
                  person={person}
                  theme={theme}
                  onEdit={() => openEditPerson(person)}
                  onDelete={() => {
                    if (confirm('确定删除该人员？')) onDeletePerson(person.id);
                  }}
                />
              ))}
            </div>
          )}

          {/* 添加人员按钮 */}
          {showAddPerson ? (
            <div
              className="mt-3 p-4 rounded-xl"
              style={{
                backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : `${primary}05`,
                border: `1px dashed ${cardBorder}`,
              }}
            >
              <input
                type="text"
                value={personName}
                onChange={(e) => setPersonName(e.target.value)}
                placeholder="姓名"
                className="w-full px-3 py-2 rounded-lg text-sm mb-2"
                style={{
                  backgroundColor: theme.cardBackgroundColor,
                  border: `1px solid ${cardBorder}`,
                  color: theme.textColor,
                }}
                autoFocus
              />
              <input
                type="text"
                value={personPosition}
                onChange={(e) => setPersonPosition(e.target.value)}
                placeholder="职位"
                className="w-full px-3 py-2 rounded-lg text-sm mb-2"
                style={{
                  backgroundColor: theme.cardBackgroundColor,
                  border: `1px solid ${cardBorder}`,
                  color: theme.textColor,
                }}
              />
              <input
                type="text"
                value={personContact}
                onChange={(e) => setPersonContact(e.target.value)}
                placeholder="联系方式"
                className="w-full px-3 py-2 rounded-lg text-sm mb-3"
                style={{
                  backgroundColor: theme.cardBackgroundColor,
                  border: `1px solid ${cardBorder}`,
                  color: theme.textColor,
                }}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAddPerson}
                  className="flex-1 py-2 rounded-lg text-white text-sm font-medium"
                  style={{ backgroundColor: primary }}
                >
                  添加
                </button>
                <button
                  onClick={resetAddPerson}
                  className="flex-1 py-2 rounded-lg text-sm"
                  style={{ color: theme.textColor, backgroundColor: `${primary}10` }}
                >
                  取消
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAddPerson(true)}
              className="w-full py-2.5 rounded-xl border-2 border-dashed text-sm font-medium transition-all hover:border-solid"
              style={{
                borderColor: cardBorder,
                color: primary,
                backgroundColor: 'transparent',
              }}
            >
              <Plus size={16} className="inline mr-1" />
              添加人员
            </button>
          )}
        </>
      )}

      {/* 编辑子项弹窗 */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div
            className="w-full max-w-sm rounded-2xl p-6 shadow-2xl"
            style={{ backgroundColor: theme.cardBackgroundColor }}
          >
            <h3 className="text-lg font-bold mb-4" style={{ color: theme.textColor }}>
              编辑子项
            </h3>
            <textarea
              value={itemContent}
              onChange={(e) => setItemContent(e.target.value)}
              className="w-full px-3 py-2 rounded-lg text-sm mb-3 resize-none h-24"
              style={{
                backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc',
                border: `1px solid ${cardBorder}`,
                color: theme.textColor,
              }}
              autoFocus
            />
            <input
              type="date"
              value={itemDate}
              onChange={(e) => setItemDate(e.target.value)}
              className="w-full px-3 py-2 rounded-lg text-sm mb-4"
              style={{
                backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc',
                border: `1px solid ${cardBorder}`,
                color: theme.textColor,
              }}
            />
            <div className="flex gap-2">
              <button
                onClick={handleUpdateItem}
                className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium"
                style={{ backgroundColor: primary }}
              >
                保存
              </button>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setItemContent('');
                  setItemDate('');
                }}
                className="flex-1 py-2.5 rounded-xl text-sm"
                style={{ color: theme.textColor, backgroundColor: `${primary}10` }}
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 编辑人员弹窗 */}
      {editingPerson && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div
            className="w-full max-w-sm rounded-2xl p-6 shadow-2xl"
            style={{ backgroundColor: theme.cardBackgroundColor }}
          >
            <h3 className="text-lg font-bold mb-4" style={{ color: theme.textColor }}>
              编辑人员
            </h3>
            <input
              type="text"
              value={personName}
              onChange={(e) => setPersonName(e.target.value)}
              placeholder="姓名"
              className="w-full px-3 py-2 rounded-lg text-sm mb-2"
              style={{
                backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc',
                border: `1px solid ${cardBorder}`,
                color: theme.textColor,
              }}
              autoFocus
            />
            <input
              type="text"
              value={personPosition}
              onChange={(e) => setPersonPosition(e.target.value)}
              placeholder="职位"
              className="w-full px-3 py-2 rounded-lg text-sm mb-2"
              style={{
                backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc',
                border: `1px solid ${cardBorder}`,
                color: theme.textColor,
              }}
            />
            <input
              type="text"
              value={personContact}
              onChange={(e) => setPersonContact(e.target.value)}
              placeholder="联系方式"
              className="w-full px-3 py-2 rounded-lg text-sm mb-4"
              style={{
                backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc',
                border: `1px solid ${cardBorder}`,
                color: theme.textColor,
              }}
            />
            <div className="flex gap-2">
              <button
                onClick={handleUpdatePerson}
                className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium"
                style={{ backgroundColor: primary }}
              >
                保存
              </button>
              <button
                onClick={() => {
                  setEditingPerson(null);
                  resetAddPerson();
                }}
                className="flex-1 py-2.5 rounded-xl text-sm"
                style={{ color: theme.textColor, backgroundColor: `${primary}10` }}
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
