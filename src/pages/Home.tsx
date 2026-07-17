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

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((module) => (
            <ContentModule
              key={module.id}
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
          ))}
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