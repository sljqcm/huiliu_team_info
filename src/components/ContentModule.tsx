import { useState } from 'react';
import { Plus, Trash2, Edit2, Users, FileText, X, Save } from 'lucide-react';
import { Module, Theme, SubItem, Person } from '../types';
import { PersonnelCard } from './PersonnelCard';

interface ContentModuleProps {
  module: Module;
  theme: Theme;
  onAddSubItem: (moduleId: string, item: Omit<SubItem, 'id'>) => void;
  onDeleteSubItem: (moduleId: string, itemId: string) => void;
  onUpdateSubItem: (moduleId: string, itemId: string, updates: Partial<SubItem>) => void;
  onAddPerson: (moduleId: string, person: Omit<Person, 'id'>) => void;
  onDeletePerson: (moduleId: string, personId: string) => void;
  onUpdatePerson: (moduleId: string, personId: string, updates: Partial<Person>) => void;
  onDeleteModule: (id: string) => void;
  onUpdateModule: (id: string, updates: Partial<Module>) => void;
}

export function ContentModule({
  module,
  theme,
  onAddSubItem,
  onDeleteSubItem,
  onUpdateSubItem,
  onAddPerson,
  onDeletePerson,
  onUpdatePerson,
  onDeleteModule,
  onUpdateModule,
}: ContentModuleProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddPersonModal, setShowAddPersonModal] = useState(false);
  const [editingItem, setEditingItem] = useState<SubItem | null>(null);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const [editModuleTitle, setEditModuleTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(module.title);

  const [newItemContent, setNewItemContent] = useState('');
  const [newItemDate, setNewItemDate] = useState('');

  const [newPersonName, setNewPersonName] = useState('');
  const [newPersonPosition, setNewPersonPosition] = useState('');
  const [newPersonContact, setNewPersonContact] = useState('');

  const handleAddItem = () => {
    if (newItemContent.trim()) {
      onAddSubItem(module.id, {
        content: newItemContent.trim(),
        date: newItemDate || undefined,
      });
      setNewItemContent('');
      setNewItemDate('');
      setShowAddModal(false);
    }
  };

  const handleAddPerson = () => {
    if (newPersonName.trim()) {
      onAddPerson(module.id, {
        name: newPersonName.trim(),
        position: newPersonPosition.trim(),
        contact: newPersonContact.trim(),
      });
      setNewPersonName('');
      setNewPersonPosition('');
      setNewPersonContact('');
      setShowAddPersonModal(false);
    }
  };

  const handleUpdateItem = () => {
    if (editingItem) {
      onUpdateSubItem(module.id, editingItem.id, {
        content: newItemContent.trim(),
        date: newItemDate || undefined,
      });
      setEditingItem(null);
      setNewItemContent('');
      setNewItemDate('');
    }
  };

  const handleUpdatePerson = () => {
    if (editingPerson) {
      onUpdatePerson(module.id, editingPerson.id, {
        name: newPersonName.trim(),
        position: newPersonPosition.trim(),
        contact: newPersonContact.trim(),
      });
      setEditingPerson(null);
      setNewPersonName('');
      setNewPersonPosition('');
      setNewPersonContact('');
    }
  };

  const handleSaveTitle = () => {
    if (newTitle.trim()) {
      onUpdateModule(module.id, { title: newTitle.trim() });
      setEditModuleTitle(false);
    } else {
      setNewTitle(module.title);
      setEditModuleTitle(false);
    }
  };

  const startEditItem = (item: SubItem) => {
    setEditingItem(item);
    setNewItemContent(item.content);
    setNewItemDate(item.date || '');
  };

  const startEditPerson = (person: Person) => {
    setEditingPerson(person);
    setNewPersonName(person.name);
    setNewPersonPosition(person.position);
    setNewPersonContact(person.contact);
  };

  const inputStyle = {
    borderColor: theme.borderColor,
    color: theme.textColor,
    '--tw-ring-color': theme.secondaryColor,
  } as React.CSSProperties;

  return (
    <div
      className="rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
      style={{ backgroundColor: theme.cardBackgroundColor }}
    >
      <div
        className="flex items-center justify-between px-6 py-4"
        style={{ backgroundColor: theme.primaryColor }}
      >
        <div className="flex items-center gap-3">
          {module.type === 'personnel' ? (
            <Users size={24} className="text-white" />
          ) : (
            <FileText size={24} className="text-white" />
          )}
          {editModuleTitle ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="bg-white/90 text-black px-3 py-1.5 rounded-lg font-bold text-lg focus:outline-none focus:ring-2 focus:ring-white"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveTitle();
                  if (e.key === 'Escape') {
                    setNewTitle(module.title);
                    setEditModuleTitle(false);
                  }
                }}
              />
              <button onClick={handleSaveTitle} className="text-white hover:text-white/80">
                <Save size={20} />
              </button>
            </div>
          ) : (
            <h2
              className="text-xl font-bold cursor-pointer hover:text-white/80 transition-colors"
              style={{ color: '#ffffff' }}
              onClick={() => setEditModuleTitle(true)}
            >
              {module.title}
              <Edit2 size={16} className="inline ml-2 opacity-60" />
            </h2>
          )}
        </div>
        <button
          onClick={() => onDeleteModule(module.id)}
          className="p-2 rounded-lg transition-colors hover:bg-white/20"
          title="删除此模块"
        >
          <Trash2 size={20} className="text-white" />
        </button>
      </div>

      <div className="p-6">
        {module.type === 'personnel' ? (
          <>
            <div className="space-y-3">
              {(module.persons || []).map((person) => (
                <PersonnelCard
                  key={person.id}
                  person={person}
                  theme={theme}
                  onEdit={() => startEditPerson(person)}
                  onDelete={() => onDeletePerson(module.id, person.id)}
                />
              ))}
            </div>
            <button
              onClick={() => setShowAddPersonModal(true)}
              className="w-full mt-4 py-3 rounded-xl border-2 border-dashed flex items-center justify-center gap-2 transition-all duration-200"
              style={{
                borderColor: theme.borderColor,
                color: theme.textColor,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = theme.secondaryColor;
                e.currentTarget.style.backgroundColor = `${theme.secondaryColor}10`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = theme.borderColor;
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <Plus size={20} />
              添加人员
            </button>
          </>
        ) : (
          <>
            <div className="space-y-3">
              {module.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between p-4 rounded-xl border transition-all duration-200 group"
                  style={{
                    backgroundColor: theme.backgroundColor,
                    borderColor: theme.borderColor,
                  }}
                >
                  <div className="flex-1">
                    <p style={{ color: theme.textColor }}>{item.content}</p>
                    {item.date && (
                      <span
                        className="text-sm mt-1 inline-block"
                        style={{ color: `${theme.textColor}60` }}
                      >
                        {item.date}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => startEditItem(item)}
                      className="p-2 rounded-lg transition-colors"
                      style={{ backgroundColor: `${theme.secondaryColor}20`, color: theme.secondaryColor }}
                      title="编辑"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => onDeleteSubItem(module.id, item.id)}
                      className="p-2 rounded-lg transition-colors hover:bg-red-100 hover:text-red-600"
                      title="删除"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="w-full mt-4 py-3 rounded-xl border-2 border-dashed flex items-center justify-center gap-2 transition-all duration-200"
              style={{
                borderColor: theme.borderColor,
                color: theme.textColor,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = theme.secondaryColor;
                e.currentTarget.style.backgroundColor = `${theme.secondaryColor}10`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = theme.borderColor;
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <Plus size={20} />
              添加子项
            </button>
          </>
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div
            className="bg-white rounded-xl shadow-xl w-full max-w-md p-6"
            style={{ borderColor: theme.borderColor, borderWidth: 2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold" style={{ color: theme.textColor }}>
                添加子项
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <textarea
              value={newItemContent}
              onChange={(e) => setNewItemContent(e.target.value)}
              placeholder="请输入内容..."
              className="w-full h-24 px-4 py-3 rounded-lg border resize-none focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={inputStyle}
              autoFocus
            />
            <input
              type="date"
              value={newItemDate}
              onChange={(e) => setNewItemDate(e.target.value)}
              className="w-full mt-3 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={inputStyle}
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2.5 rounded-lg font-medium transition-colors"
                style={{
                  backgroundColor: `${theme.borderColor}`,
                  color: theme.textColor,
                }}
              >
                取消
              </button>
              <button
                onClick={handleAddItem}
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
      )}

      {editingItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div
            className="bg-white rounded-xl shadow-xl w-full max-w-md p-6"
            style={{ borderColor: theme.borderColor, borderWidth: 2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold" style={{ color: theme.textColor }}>
                编辑子项
              </h3>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setNewItemContent('');
                  setNewItemDate('');
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <textarea
              value={newItemContent}
              onChange={(e) => setNewItemContent(e.target.value)}
              placeholder="请输入内容..."
              className="w-full h-24 px-4 py-3 rounded-lg border resize-none focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={inputStyle}
              autoFocus
            />
            <input
              type="date"
              value={newItemDate}
              onChange={(e) => setNewItemDate(e.target.value)}
              className="w-full mt-3 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={inputStyle}
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => {
                  setEditingItem(null);
                  setNewItemContent('');
                  setNewItemDate('');
                }}
                className="flex-1 py-2.5 rounded-lg font-medium transition-colors"
                style={{
                  backgroundColor: `${theme.borderColor}`,
                  color: theme.textColor,
                }}
              >
                取消
              </button>
              <button
                onClick={handleUpdateItem}
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
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddPersonModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div
            className="bg-white rounded-xl shadow-xl w-full max-w-md p-6"
            style={{ borderColor: theme.borderColor, borderWidth: 2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold" style={{ color: theme.textColor }}>
                添加人员
              </h3>
              <button
                onClick={() => setShowAddPersonModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                value={newPersonName}
                onChange={(e) => setNewPersonName(e.target.value)}
                placeholder="姓名"
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={inputStyle}
                autoFocus
              />
              <input
                type="text"
                value={newPersonPosition}
                onChange={(e) => setNewPersonPosition(e.target.value)}
                placeholder="职位"
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={inputStyle}
              />
              <input
                type="text"
                value={newPersonContact}
                onChange={(e) => setNewPersonContact(e.target.value)}
                placeholder="联系方式"
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={inputStyle}
              />
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowAddPersonModal(false)}
                className="flex-1 py-2.5 rounded-lg font-medium transition-colors"
                style={{
                  backgroundColor: `${theme.borderColor}`,
                  color: theme.textColor,
                }}
              >
                取消
              </button>
              <button
                onClick={handleAddPerson}
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
      )}

      {editingPerson && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div
            className="bg-white rounded-xl shadow-xl w-full max-w-md p-6"
            style={{ borderColor: theme.borderColor, borderWidth: 2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold" style={{ color: theme.textColor }}>
                编辑人员
              </h3>
              <button
                onClick={() => {
                  setEditingPerson(null);
                  setNewPersonName('');
                  setNewPersonPosition('');
                  setNewPersonContact('');
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                value={newPersonName}
                onChange={(e) => setNewPersonName(e.target.value)}
                placeholder="姓名"
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={inputStyle}
                autoFocus
              />
              <input
                type="text"
                value={newPersonPosition}
                onChange={(e) => setNewPersonPosition(e.target.value)}
                placeholder="职位"
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={inputStyle}
              />
              <input
                type="text"
                value={newPersonContact}
                onChange={(e) => setNewPersonContact(e.target.value)}
                placeholder="联系方式"
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={inputStyle}
              />
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => {
                  setEditingPerson(null);
                  setNewPersonName('');
                  setNewPersonPosition('');
                  setNewPersonContact('');
                }}
                className="flex-1 py-2.5 rounded-lg font-medium transition-colors"
                style={{
                  backgroundColor: `${theme.borderColor}`,
                  color: theme.textColor,
                }}
              >
                取消
              </button>
              <button
                onClick={handleUpdatePerson}
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
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}