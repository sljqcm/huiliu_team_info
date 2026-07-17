import { useState } from 'react';
import { Users, FileText, Menu, X, ZoomIn, ZoomOut, ArrowLeft } from 'lucide-react';
import { Header } from '../components/Header';
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // 缩放比例：1 = 210×150px，范围 0.7 ~ 1.5
  const [scale, setScale] = useState(1);

  const handleAddModule = (title: string, type: 'standard' | 'personnel') => {
    addModule({
      title,
      type,
      items: [],
      persons: type === 'personnel' ? [] : undefined,
    });
  };

  const activeModule = modules.find((m) => m.id === activeModuleId);

  const handleSelectModule = (id: string) => {
    setActiveModuleId(id);
    setSidebarOpen(false);
  };

  const handleBackToList = () => {
    setActiveModuleId(null);
  };

  const handleDeleteModule = (id: string) => {
    deleteModule(id);
    if (activeModuleId === id) {
      setActiveModuleId(null);
    }
  };

  const isDark = currentTheme.id === 'starlight-black';

  return (
    <div
      className="min-h-screen relative"
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
            opacity: 0.4,
          }}
        />
      )}

      <Header
        theme={currentTheme}
        onAddModule={() => setShowAddModuleModal(true)}
        onOpenSkinSelector={() => setShowSkinSelector(true)}
        onExport={exportData}
        onImport={importData}
      />

      {/* 移动端目录切换 */}
      {activeModule && (
        <div className="md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="fixed top-4 right-4 z-30 p-2 rounded-lg shadow-lg"
            style={{
              backgroundColor: currentTheme.cardBackgroundColor,
              color: currentTheme.textColor,
              border: `1px solid ${currentTheme.borderColor}`,
            }}
          >
            <Menu size={20} />
          </button>
        </div>
      )}

      {/* 移动端遮罩 */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 左侧目录栏 - 仅在查看详情时显示 */}
      {activeModule && (
        <aside
          className={`fixed md:sticky top-0 md:top-4 left-0 h-screen md:h-auto md:self-start w-64 z-40 md:z-0 transform transition-transform duration-300 md:transform-none ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
          style={{
            backgroundColor: currentTheme.cardBackgroundColor,
            borderRight: `1px solid ${currentTheme.borderColor}`,
          }}
        >
          <div className="p-4 md:rounded-xl">
            <div className="flex items-center justify-between mb-4 md:hidden">
              <h3 className="font-bold" style={{ color: currentTheme.textColor }}>
                目录
              </h3>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1"
                style={{ color: currentTheme.textColor }}
              >
                <X size={20} />
              </button>
            </div>

            <button
              onClick={handleBackToList}
              className="flex items-center gap-2 mb-3 text-sm pb-2 w-full"
              style={{
                color: currentTheme.textColor,
                borderBottom: `1px solid ${currentTheme.borderColor}`,
              }}
            >
              <ArrowLeft size={16} />
              返回总览
            </button>

            <h3
              className="font-bold mb-3 hidden md:block pb-2"
              style={{
                color: currentTheme.textColor,
                borderBottom: `1px solid ${currentTheme.borderColor}`,
              }}
            >
              模块目录
            </h3>

            <nav className="space-y-1 max-h-[60vh] md:max-h-[70vh] overflow-y-auto">
              {modules.map((module) => {
                const isActive = activeModule?.id === module.id;
                return (
                  <button
                    key={module.id}
                    onClick={() => handleSelectModule(module.id)}
                    className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-left transition-all duration-200 text-sm"
                    style={{
                      backgroundColor: isActive
                        ? currentTheme.secondaryColor
                        : 'transparent',
                      color: isActive ? '#ffffff' : currentTheme.textColor,
                      fontWeight: isActive ? 600 : 400,
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = `${currentTheme.secondaryColor}15`;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {module.type === 'personnel' ? (
                      <Users size={16} className="flex-shrink-0" />
                    ) : (
                      <FileText size={16} className="flex-shrink-0" />
                    )}
                    <span className="truncate">{module.title}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>
      )}

      <main className="relative">
        {activeModule ? (
          // 详情视图
          <div className="flex max-w-7xl mx-auto">
            {/* 左侧栏占位（桌面端） */}
            <div className="hidden md:block w-64 flex-shrink-0" />
            <div className="flex-1 p-4 md:p-8 min-w-0">
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
            </div>
          </div>
        ) : (
          // 总览视图：210×150 小方块网格 + 缩放控制
          <div className="max-w-7xl mx-auto px-4 py-6">
            {/* 缩放控制条 */}
            <div
              className="flex items-center justify-between mb-6 p-3 rounded-xl"
              style={{
                backgroundColor: currentTheme.cardBackgroundColor,
                border: `1px solid ${currentTheme.borderColor}`,
              }}
            >
              <div className="flex items-center gap-2" style={{ color: currentTheme.textColor }}>
                <FileText size={18} />
                <span className="font-medium">模块总览</span>
                <span className="text-sm opacity-60">（共 {modules.length} 个）</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setScale((s) => Math.max(0.7, s - 0.1))}
                  className="p-2 rounded-lg transition-all"
                  style={{
                    backgroundColor: `${currentTheme.secondaryColor}20`,
                    color: currentTheme.secondaryColor,
                  }}
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
                  className="p-2 rounded-lg transition-all"
                  style={{
                    backgroundColor: `${currentTheme.secondaryColor}20`,
                    color: currentTheme.secondaryColor,
                  }}
                  disabled={scale >= 1.5}
                  title="放大"
                >
                  <ZoomIn size={16} />
                </button>
              </div>
            </div>

            {/* 小方块网格 */}
            {modules.length === 0 ? (
              <div
                className="text-center py-16"
                style={{ color: `${currentTheme.textColor}60` }}
              >
                <p className="text-lg">暂无模块，请点击上方按钮添加大项</p>
              </div>
            ) : (
              <div
                className="grid gap-4"
                style={{
                  gridTemplateColumns: `repeat(auto-fill, minmax(${210 * scale}px, 1fr))`,
                }}
              >
                {modules.map((module) => {
                  const itemCount =
                    module.type === 'personnel'
                      ? (module.persons || []).length
                      : module.items.length;
                  return (
                    <button
                      key={module.id}
                      onClick={() => handleSelectModule(module.id)}
                      className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl text-left"
                      style={{
                        width: '100%',
                        height: `${150 * scale}px`,
                        background: `linear-gradient(135deg, ${currentTheme.primaryColor}, ${currentTheme.secondaryColor})`,
                        boxShadow: isDark
                          ? '0 4px 16px rgba(0,0,0,0.4)'
                          : '0 4px 12px rgba(0,0,0,0.1)',
                      }}
                    >
                      {/* 装饰光晕 */}
                      <div
                        className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-20 group-hover:opacity-40 transition-opacity"
                        style={{
                          background: 'radial-gradient(circle, white, transparent 70%)',
                        }}
                      />

                      <div className="relative h-full p-4 flex flex-col justify-between text-white">
                        <div className="flex items-start justify-between">
                          {module.type === 'personnel' ? (
                            <Users size={28} className="opacity-90" />
                          ) : (
                            <FileText size={28} className="opacity-90" />
                          )}
                          <span className="text-xs opacity-75 bg-white/20 px-2 py-0.5 rounded-full">
                            {module.type === 'personnel' ? '人员' : '内容'}
                          </span>
                        </div>
                        <div>
                          <h3
                            className="font-bold leading-tight mb-1 truncate"
                            style={{ fontSize: `${1.1 * scale}rem` }}
                          >
                            {module.title}
                          </h3>
                          <p className="text-xs opacity-80">
                            {itemCount} 个{module.type === 'personnel' ? '成员' : '条目'}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

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
