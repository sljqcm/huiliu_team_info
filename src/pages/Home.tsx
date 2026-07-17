import { useState } from 'react';
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

  const handleAddModule = (title: string, type: 'standard' | 'personnel') => {
    addModule({
      title,
      type,
      items: [],
      persons: type === 'personnel' ? [] : undefined,
    });
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

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="relative">
          {/* 树状主干左侧连接线 */}
          <div
            className="absolute left-6 top-0 bottom-0 w-0.5 hidden md:block"
            style={{ backgroundColor: `${currentTheme.secondaryColor}40` }}
          />
          <div className="space-y-5">
            {modules.map((module, index) => (
              <div key={module.id} className="relative md:pl-16">
                {/* 树干节点圆点 */}
                <div
                  className="hidden md:flex absolute left-6 top-8 -translate-x-1/2 w-4 h-4 rounded-full border-4 z-10 items-center justify-center"
                  style={{
                    backgroundColor: currentTheme.cardBackgroundColor,
                    borderColor: currentTheme.secondaryColor,
                  }}
                />
                <ContentModule
                  module={module}
                  theme={currentTheme}
                  onAddSubItem={addSubItem}
                  onDeleteSubItem={deleteSubItem}
                  onUpdateSubItem={updateSubItem}
                  onAddPerson={addPerson}
                  onDeletePerson={deletePerson}
                  onUpdatePerson={updatePerson}
                  onDeleteModule={deleteModule}
                  onUpdateModule={updateModule}
                />
              </div>
            ))}
          </div>
        </div>

        {modules.length === 0 && (
          <div
            className="text-center py-16"
            style={{ color: `${currentTheme.textColor}60` }}
          >
            <p className="text-lg">暂无模块，请点击上方按钮添加大项</p>
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