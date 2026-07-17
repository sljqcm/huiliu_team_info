import { useState } from 'react';
import {
  Users,
  FileText,
  Plus,
  Settings as SettingsIcon,
  Download,
  Upload,
  ChevronDown,
  ChevronUp,
  Github,
  Trash2,
  Edit3,
} from 'lucide-react';
import { ContentModule } from '../components/ContentModule';
import { SkinSelector } from '../components/SkinSelector';
import { AddModuleModal } from '../components/AddModuleModal';
import { SettingsModal } from '../components/SettingsModal';
import { useStore } from '../store/useStore';
import { Module } from '../types';

export default function Home() {
  const {
    modules,
    currentTheme,
    themes,
    settings,
    addModule,
    deleteModule,
    updateModule,
    addSubItem,
    deleteSubItem,
    updateSubItem,
    toggleSubItem,
    addPerson,
    deletePerson,
    updatePerson,
    setTheme,
    updateSettings,
    exportData,
    importData,
  } = useStore();

  const [showSkinSelector, setShowSkinSelector] = useState(false);
  const [showAddModuleModal, setShowAddModuleModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null);

  const handleAddModule = (title: string, type: 'standard' | 'personnel') => {
    const newModule: Omit<Module, 'id'> = {
      title,
      type,
      items: [],
      persons: type === 'personnel' ? [] : undefined,
    };
    addModule(newModule);
  };

  const toggleModule = (id: string) => {
    if (!settings.animation) {
      setExpandedModuleId(expandedModuleId === id ? null : id);
      return;
    }
    setExpandedModuleId(expandedModuleId === id ? null : id);
  };

  const isDark = currentTheme.id === 'warm-dark';
  const glassBg = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.85)';
  const glassBorder = isDark ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.6)';
  const cardHeaderBg = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.5)';
  const cardShadow = isDark
    ? '0 8px 32px rgba(0,0,0,0.3)'
    : '0 10px 30px -10px rgba(0,0,0,0.1)';
  const primary = currentTheme.secondaryColor;

  const glassStyle = settings.glassEffect
    ? {
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }
    : {};

  const cardWidth = settings.cardMode === 'grid' ? 260 * settings.scale : '100%';

  return (
    <div
      className="min-h-screen relative flex flex-col"
      style={{ backgroundColor: currentTheme.backgroundColor }}
    >
      <div className="container mx-auto px-3 md:px-6 py-4 md:py-6 flex-1 w-full max-w-7xl">
        {/* 顶部导航栏 */}
        <nav
          className="flex items-center justify-between px-4 md:px-5 py-3 mb-5"
          style={{
            backgroundColor: isDark ? 'rgba(30,24,20,0.92)' : 'rgba(255,255,255,0.92)',
            border: `1px solid ${glassBorder}`,
            borderRadius: '16px',
            boxShadow: cardShadow,
            ...glassStyle,
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg md:text-xl flex-shrink-0"
              style={{
                background: `linear-gradient(135deg, ${currentTheme.primaryColor}, ${primary})`,
                boxShadow: `0 4px 12px ${primary}40`,
              }}
            >
              灰
            </div>
            <div>
              <h1
                className="font-bold text-lg md:text-2xl leading-tight"
                style={{ color: currentTheme.textColor }}
              >
                灰硫班组信息
              </h1>
              <p
                className="text-xs md:text-sm"
                style={{ color: `${currentTheme.textColor}80` }}
              >
                脱硫脱硝班组管理平台
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddModuleModal(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-white text-sm font-medium transition-all hover:-translate-y-0.5"
              style={{
                background: `linear-gradient(135deg, ${currentTheme.primaryColor}, ${primary})`,
                boxShadow: `0 4px 12px ${primary}40`,
              }}
              title="添加大项"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">添加大项</span>
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 rounded-lg transition-all hover:scale-110"
              style={{ backgroundColor: `${primary}20`, color: primary }}
              title="设置"
            >
              <SettingsIcon size={18} />
            </button>
            <button
              onClick={exportData}
              className="p-2 rounded-lg transition-all hover:scale-110 hidden md:block"
              style={{ backgroundColor: `${primary}20`, color: primary }}
              title="导出数据"
            >
              <Download size={18} />
            </button>
            <label
              className="p-2 rounded-lg transition-all hover:scale-110 cursor-pointer hidden md:block"
              style={{ backgroundColor: `${primary}20`, color: primary }}
              title="导入数据"
            >
              <Upload size={18} />
              <input
                type="file"
                accept=".json"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  try {
                    const text = await file.text();
                    const data = JSON.parse(text);
                    importData(data);
                  } catch {
                    alert('导入失败：文件格式错误');
                  }
                  e.target.value = '';
                }}
              />
            </label>
          </div>
        </nav>

        {/* 统计栏 */}
        <div
          className="flex items-center justify-between flex-wrap gap-3 px-4 md:px-6 py-3 mb-5"
          style={{
            backgroundColor: glassBg,
            border: `1px solid ${glassBorder}`,
            borderRadius: '16px',
            boxShadow: cardShadow,
            ...glassStyle,
          }}
        >
          <div className="flex items-center gap-2">
            <FileText size={20} style={{ color: primary }} />
            <h2 className="text-base md:text-xl font-bold" style={{ color: currentTheme.textColor }}>
              模块总览
            </h2>
            <span
              className="text-xs px-2 py-0.5 rounded-md font-medium"
              style={{ backgroundColor: `${primary}20`, color: primary }}
            >
              共 {modules.length} 个
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm" style={{ color: `${currentTheme.textColor}80` }}>
            <span>点击卡片展开查看详情</span>
          </div>
        </div>

        {/* 模块卡片列表（手风琴式展开） */}
        <div
          className={settings.cardMode === 'grid' ? '' : 'space-y-3'}
          style={{
            display: settings.cardMode === 'grid' ? 'grid' : 'block',
            gridTemplateColumns: `repeat(auto-fill, minmax(${cardWidth}px, 1fr))`,
            gap: settings.cardMode === 'grid' ? '1rem' : '0',
          }}
        >
          {modules.length === 0 ? (
            <div
              className="text-center py-16 rounded-2xl"
              style={{
                backgroundColor: glassBg,
                border: `1px solid ${glassBorder}`,
                color: `${currentTheme.textColor}80`,
                ...glassStyle,
              }}
            >
              <p className="text-lg">暂无模块，请点击右上角"添加大项"</p>
            </div>
          ) : (
            modules.map((module) => {
              const isExpanded = expandedModuleId === module.id;
              const count =
                module.type === 'personnel'
                  ? (module.persons || []).length
                  : module.items.length;
              const Icon = module.type === 'personnel' ? Users : FileText;

              return (
                <div
                  key={module.id}
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    backgroundColor: glassBg,
                    border: `1px solid ${glassBorder}`,
                    borderRadius: '16px',
                    boxShadow: isExpanded
                      ? '0 20px 40px -10px rgba(0,0,0,0.15)'
                      : cardShadow,
                    ...glassStyle,
                    transform: isExpanded && settings.animation ? 'translateY(-2px)' : 'translateY(0)',
                  }}
                >
                  {/* 卡片头部 - 可点击展开/收起 */}
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="w-full text-left"
                  >
                    <div
                      className="relative overflow-hidden"
                      style={{
                        padding: `${14 * settings.scale}px ${20 * settings.scale}px`,
                      }}
                    >
                      {/* 顶部彩条 */}
                      <div
                        className="absolute top-0 left-0 right-0"
                        style={{
                          height: `${4 * settings.scale}px`,
                          background: `linear-gradient(90deg, ${currentTheme.primaryColor}, ${primary})`,
                        }}
                      />
                      {/* 光晕 */}
                      <div
                        className="absolute -top-6 -right-6 rounded-full opacity-20"
                        style={{
                          width: `${60 * settings.scale}px`,
                          height: `${60 * settings.scale}px`,
                          background: `radial-gradient(circle, ${primary}, transparent 70%)`,
                        }}
                      />

                      <div className="relative flex items-center justify-between gap-3 pt-1">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div
                            className="flex-shrink-0 flex items-center justify-center text-white rounded-xl"
                            style={{
                              width: `${36 * settings.scale}px`,
                              height: `${36 * settings.scale}px`,
                              background: `linear-gradient(135deg, ${currentTheme.primaryColor}, ${primary})`,
                              boxShadow: `0 2px 8px ${primary}40`,
                              fontSize: `${18 * settings.scale}px`,
                            }}
                          >
                            <Icon size={18 * settings.scale} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3
                              className="font-bold truncate leading-tight"
                              style={{
                                fontSize: `${1.05 * settings.scale}rem`,
                                color: currentTheme.textColor,
                              }}
                            >
                              {module.title}
                            </h3>
                            <p
                              className="text-xs truncate"
                              style={{ color: `${currentTheme.textColor}80` }}
                            >
                              {count} 个{module.type === 'personnel' ? '成员' : '条目'}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 flex-shrink-0">
                          <span
                            className="text-xs px-2 py-0.5 rounded-md font-medium"
                            style={{
                              backgroundColor: `${primary}20`,
                              color: primary,
                            }}
                          >
                            {module.type === 'personnel' ? '人员' : '内容'}
                          </span>
                          <div
                            className="p-1 rounded-lg transition-transform"
                            style={{
                              color: primary,
                              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                            }}
                          >
                            <ChevronDown size={18} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* 展开内容区 */}
                  {isExpanded && (
                    <div
                      className="border-t pt-3 px-4 pb-4"
                      style={{
                        borderColor: glassBorder,
                        animation: settings.animation ? 'slideDown 0.25s ease-out' : 'none',
                      }}
                    >
                      <ContentModule
                        module={module}
                        theme={currentTheme}
                        onAddSubItem={(parentId, item) =>
                          addSubItem(module.id, parentId, item)
                        }
                        onDeleteSubItem={(itemId) =>
                          deleteSubItem(module.id, itemId)
                        }
                        onUpdateSubItem={(itemId, updates) =>
                          updateSubItem(module.id, itemId, updates)
                        }
                        onToggleSubItem={(itemId) =>
                          toggleSubItem(module.id, itemId)
                        }
                        onAddPerson={(person) => addPerson(module.id, person)}
                        onDeletePerson={(personId) =>
                          deletePerson(module.id, personId)
                        }
                        onUpdatePerson={(personId, updates) =>
                          updatePerson(module.id, personId, updates)
                        }
                        onDeleteModule={() => deleteModule(module.id)}
                        onUpdateModule={(updates) => updateModule(module.id, updates)}
                        compact
                      />
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 吸底 footer */}
      <footer
        className="text-center py-3 px-4 mt-auto"
        style={{
          borderTop: `1px solid ${glassBorder}`,
          backgroundColor: glassBg,
          color: `${currentTheme.textColor}80`,
          ...glassStyle,
        }}
      >
        <p className="text-xs md:text-sm flex items-center justify-center gap-2">
          <span>Copyright © 2026 灰硫班组信息</span>
          <a
            href="https://github.com/sljqcm/huiliu_team_info"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:underline"
            style={{ color: primary }}
          >
            <Github size={14} />
            GitHub Repository
          </a>
        </p>
      </footer>

      {showSkinSelector && (
        <SkinSelector
          themes={themes}
          currentTheme={currentTheme}
          onSelectTheme={setTheme}
          onClose={() => setShowSkinSelector(false)}
        />
      )}

      {showAddModuleModal && (
        <AddModuleModal
          theme={currentTheme}
          onClose={() => setShowAddModuleModal(false)}
          onAddModule={handleAddModule}
        />
      )}

      {showSettings && (
        <SettingsModal
          theme={currentTheme}
          settings={settings}
          themes={themes}
          onClose={() => setShowSettings(false)}
          onUpdateSettings={updateSettings}
          onThemeChange={setTheme}
        />
      )}

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
