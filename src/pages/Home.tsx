import { useState } from 'react';
import {
  Users,
  FileText,
  Plus,
  Palette,
  Download,
  Upload,
  ZoomIn,
  ZoomOut,
  ArrowLeft,
  Moon,
  Github,
} from 'lucide-react';
import { ContentModule } from '../components/ContentModule';
import { SkinSelector } from '../components/SkinSelector';
import { AddModuleModal } from '../components/AddModuleModal';
import { useStore } from '../store/useStore';

export default function Home() {
  const {
    modules,
    currentTheme,
    themes,
    addModule,
    deleteModule,
    updateModule,
    addSubItem,
    deleteSubItem,
    updateSubItem,
    addPerson,
    deletePerson,
    updatePerson,
    setTheme,
    exportData,
    importData,
  } = useStore();

  const [showSkinSelector, setShowSkinSelector] = useState(false);
  const [showAddModuleModal, setShowAddModuleModal] = useState(false);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [scale, setScale] = useState(1);

  const handleAddModule = (title: string, type: 'standard' | 'personnel') => {
    addModule({ title, type, items: [], persons: type === 'personnel' ? [] : undefined });
  };

  const activeModule = modules.find((m) => m.id === activeModuleId);

  const handleSelectModule = (id: string) => setActiveModuleId(id);
  const handleBackToList = () => setActiveModuleId(null);

  const handleDeleteModule = (id: string) => {
    deleteModule(id);
    if (activeModuleId === id) setActiveModuleId(null);
  };

  const isDark = currentTheme.id === 'starlight-black';

  // 玻璃变量
  const glassBg = isDark ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.85)';
  const glassBorder = isDark ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.6)';
  const glassHeaderBg = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.5)';
  const cardShadow = isDark
    ? '0 8px 32px rgba(0,0,0,0.3)'
    : '0 10px 30px -10px rgba(0,0,0,0.1)';
  const primaryColor = currentTheme.secondaryColor;

  return (
    <div
      className="min-h-screen relative flex flex-col"
      style={{ backgroundColor: currentTheme.backgroundColor }}
    >
      {/* 星空黑主题：星星背景 */}
      {isDark && (
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(2px 2px at 20px 30px, white, transparent),
              radial-gradient(1px 1px at 40px 70px, white, transparent),
              radial-gradient(1px 1px at 90px 40px, white, transparent),
              radial-gradient(2px 2px at 160px 120px, white, transparent),
              radial-gradient(1px 1px at 200px 200px, white, transparent),
              radial-gradient(1.5px 1.5px at 250px 80px, white, transparent),
              radial-gradient(1px 1px at 300px 150px, white, transparent),
              radial-gradient(2px 2px at 350px 250px, white, transparent),
              radial-gradient(1px 1px at 400px 100px, white, transparent),
              radial-gradient(1.5px 1.5px at 450px 200px, white, transparent)
            `,
            backgroundSize: '500px 300px',
            backgroundRepeat: 'repeat',
            opacity: 0.5,
          }}
        />
      )}

      <div className="container mx-auto px-3 md:px-6 py-4 md:py-6 flex-1 w-full max-w-7xl">
        {/* 顶部导航栏 */}
        <nav
          className="flex items-center justify-between px-4 md:px-5 py-3 mb-5"
          style={{
            backgroundColor: isDark ? 'rgba(30,30,40,0.92)' : 'rgba(255,255,255,0.92)',
            border: `1px solid ${glassBorder}`,
            borderRadius: '16px',
            boxShadow: cardShadow,
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg md:text-xl flex-shrink-0"
              style={{
                background: `linear-gradient(135deg, ${currentTheme.primaryColor}, ${primaryColor})`,
                boxShadow: `0 4px 12px ${primaryColor}40`,
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
                background: `linear-gradient(135deg, ${currentTheme.primaryColor}, ${primaryColor})`,
                boxShadow: `0 4px 12px ${primaryColor}40`,
              }}
              title="添加大项"
            >
              <Plus size={16} />
              <span className="hidden md:inline">添加大项</span>
            </button>
            <button
              onClick={() => setShowSkinSelector(true)}
              className="p-2 rounded-lg transition-all hover:scale-110"
              style={{
                backgroundColor: `${primaryColor}20`,
                color: primaryColor,
              }}
              title="切换皮肤"
            >
              {isDark ? <Moon size={18} /> : <Palette size={18} />}
            </button>
            <button
              onClick={exportData}
              className="p-2 rounded-lg transition-all hover:scale-110 hidden sm:block"
              style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
              title="导出数据"
            >
              <Download size={18} />
            </button>
            <label
              className="p-2 rounded-lg transition-all hover:scale-110 cursor-pointer hidden sm:block"
              style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
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
                  } catch (err) {
                    alert('导入失败：文件格式错误');
                  }
                  e.target.value = '';
                }}
              />
            </label>
          </div>
        </nav>

        {/* page-header 二级标题栏 */}
        <div
          className="flex items-center justify-between flex-wrap gap-3 px-4 md:px-6 py-3 md:py-4 mb-5"
          style={{
            backgroundColor: glassBg,
            border: `1px solid ${glassBorder}`,
            borderRadius: '16px',
            boxShadow: cardShadow,
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
        >
          <div className="flex items-center gap-2">
            {activeModule && (
              <button
                onClick={handleBackToList}
                className="p-1.5 rounded-lg transition-all hover:scale-110"
                style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
                title="返回总览"
              >
                <ArrowLeft size={18} />
              </button>
            )}
            <h2
              className="text-base md:text-xl font-bold flex items-center gap-2"
              style={{ color: currentTheme.textColor }}
            >
              {activeModule ? (
                <>
                  {activeModule.type === 'personnel' ? (
                    <Users size={20} />
                  ) : (
                    <FileText size={20} />
                  )}
                  {activeModule.title}
                </>
              ) : (
                <>
                  <FileText size={20} />
                  模块总览
                </>
              )}
            </h2>
            <span
              className="text-xs px-2 py-0.5 rounded-md font-medium"
              style={{
                backgroundColor: `${primaryColor}20`,
                color: primaryColor,
              }}
            >
              {activeModule
                ? activeModule.type === 'personnel'
                  ? `${(activeModule.persons || []).length} 人`
                  : `${activeModule.items.length} 项`
                : `共 ${modules.length} 个`}
            </span>
          </div>

          {!activeModule && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setScale((s) => Math.max(0.7, s - 0.1))}
                className="p-2 rounded-lg transition-all hover:scale-110 disabled:opacity-40"
                style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
                disabled={scale <= 0.7}
                title="缩小"
              >
                <ZoomOut size={16} />
              </button>
              <span
                className="text-sm font-medium w-12 text-center"
                style={{ color: currentTheme.textColor }}
              >
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={() => setScale((s) => Math.min(1.5, s + 0.1))}
                className="p-2 rounded-lg transition-all hover:scale-110 disabled:opacity-40"
                style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
                disabled={scale >= 1.5}
                title="放大"
              >
                <ZoomIn size={16} />
              </button>
            </div>
          )}
        </div>

        {/* 主内容区 */}
        <div className="flex-1">
          {activeModule ? (
            <ContentModule
              module={activeModule}
              theme={currentTheme}
              onAddSubItem={addSubItem}
              onDeleteSubItem={deleteSubItem}
              onUpdateSubItem={updateSubItem}
              onAddPerson={addPerson}
              onDeletePerson={deletePerson}
              onUpdatePerson={updatePerson}
              onDeleteModule={handleDeleteModule}
              onUpdateModule={updateModule}
            />
          ) : modules.length === 0 ? (
            <div
              className="text-center py-16 rounded-2xl"
              style={{
                backgroundColor: glassBg,
                border: `1px solid ${glassBorder}`,
                color: `${currentTheme.textColor}80`,
              }}
            >
              <p className="text-lg">暂无模块，请点击右上角"添加大项"</p>
            </div>
          ) : (
            // 三列瀑布流卡片网格（参考 domain-autocheck）
            <div
              className="grid gap-3 md:gap-4"
              style={{
                gridTemplateColumns: `repeat(auto-fill, minmax(${210 * scale}px, 1fr))`,
              }}
            >
              {modules.map((module) => {
                const count =
                  module.type === 'personnel'
                    ? (module.persons || []).length
                    : module.items.length;
                return (
                  <button
                    key={module.id}
                    onClick={() => handleSelectModule(module.id)}
                    className="group relative overflow-hidden text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                    style={{
                      height: `${150 * scale}px`,
                      backgroundColor: glassBg,
                      border: `1px solid ${glassBorder}`,
                      borderRadius: '16px',
                      boxShadow: cardShadow,
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                    }}
                  >
                    {/* 顶部彩色条 */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1.5"
                      style={{
                        background: `linear-gradient(90deg, ${currentTheme.primaryColor}, ${primaryColor})`,
                      }}
                    />
                    {/* 装饰光晕 */}
                    <div
                      className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-20 group-hover:opacity-40 transition-opacity"
                      style={{
                        background: `radial-gradient(circle, ${primaryColor}, transparent 70%)`,
                      }}
                    />

                    <div
                      className="relative h-full p-4 flex flex-col justify-between"
                      style={{ color: currentTheme.textColor }}
                    >
                      <div className="flex items-start justify-between">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                          style={{
                            background: `linear-gradient(135deg, ${currentTheme.primaryColor}, ${primaryColor})`,
                            boxShadow: `0 2px 8px ${primaryColor}40`,
                          }}
                        >
                          {module.type === 'personnel' ? (
                            <Users size={20} />
                          ) : (
                            <FileText size={20} />
                          )}
                        </div>
                        <span
                          className="text-xs px-2 py-0.5 rounded-md font-medium"
                          style={{
                            backgroundColor: `${primaryColor}20`,
                            color: primaryColor,
                          }}
                        >
                          {module.type === 'personnel' ? '人员' : '内容'}
                        </span>
                      </div>
                      <div>
                        <h3
                          className="font-bold leading-tight mb-1 truncate"
                          style={{ fontSize: `${1.05 * scale}rem` }}
                        >
                          {module.title}
                        </h3>
                        <p
                          className="text-xs"
                          style={{ color: `${currentTheme.textColor}80` }}
                        >
                          {count} 个{module.type === 'personnel' ? '成员' : '条目'}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
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
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        <p className="text-xs md:text-sm flex items-center justify-center gap-2">
          <span>Copyright © 2026 灰硫班组信息</span>
          <a
            href="https://github.com/sljqcm/huiliu_team_info"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:underline"
            style={{ color: primaryColor }}
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
    </div>
  );
}
