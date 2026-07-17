import { useState } from 'react';
import { Users, FileText, Menu, X } from 'lucide-react';
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
  const [activeModuleId, setActiveModuleId] = useState<string | null>(
    modules[0]?.id || null
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleAddModule = (title: string, type: 'standard' | 'personnel') => {
    const newModule = {
      title,
      type,
      items: [],
      persons: type === 'personnel' ? [] : undefined,
    };
    addModule(newModule);
  };

  const activeModule = modules.find((m) => m.id === activeModuleId) || modules[0];

  const handleSelectModule = (id: string) => {
    setActiveModuleId(id);
    setSidebarOpen(false);
  };

  const handleDeleteModule = (id: string) => {
    deleteModule(id);
    if (activeModuleId === id) {
      const remaining = modules.filter((m) => m.id !== id);
      setActiveModuleId(remaining[0]?.id || null);
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: currentTheme.backgroundColor }}
    >
      <Header
        theme={currentTheme}
        onAddModule={() => setShowAddModuleModal(true)}
        onOpenSkinSelector={() => setShowSkinSelector(true)}
        onExport={exportData}
        onImport={importData}
      />

      <div className="flex max-w-7xl mx-auto">
        {/* 移动端遮罩 */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* 左侧目录栏 */}
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

            {modules.length === 0 && (
              <p
                className="text-center py-8 text-sm"
                style={{ color: `${currentTheme.textColor}60` }}
              >
                暂无模块
              </p>
            )}
          </div>
        </aside>

        {/* 右侧工作区 */}
        <main className="flex-1 p-4 md:p-8 min-w-0">
          {/* 移动端目录切换按钮 */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden mb-4 flex items-center gap-2 px-4 py-2 rounded-lg"
            style={{
              backgroundColor: currentTheme.cardBackgroundColor,
              color: currentTheme.textColor,
              border: `1px solid ${currentTheme.borderColor}`,
            }}
          >
            <Menu size={18} />
            打开目录
          </button>

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
          ) : (
            <div
              className="text-center py-16"
              style={{ color: `${currentTheme.textColor}60` }}
            >
              <p className="text-lg">暂无模块，请点击上方按钮添加大项</p>
            </div>
          )}
        </main>
      </div>

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
