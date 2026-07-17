import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Module, Theme, SubItem, Person, AppState } from '../types';
import { initialModules, themes, defaultTheme } from '../data/initialData';

const generateId = () => Math.random().toString(36).substr(2, 9);

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      modules: initialModules,
      currentTheme: defaultTheme,
      themes,

      addModule: (module) =>
        set((state) => ({
          modules: [...state.modules, { ...module, id: generateId() }],
        })),

      deleteModule: (id) =>
        set((state) => ({
          modules: state.modules.filter((m) => m.id !== id),
        })),

      updateModule: (id, updates) =>
        set((state) => ({
          modules: state.modules.map((m) =>
            m.id === id ? { ...m, ...updates } : m
          ),
        })),

      addSubItem: (moduleId, item) =>
        set((state) => ({
          modules: state.modules.map((m) =>
            m.id === moduleId
              ? { ...m, items: [...m.items, { ...item, id: generateId() }] }
              : m
          ),
        })),

      deleteSubItem: (moduleId, itemId) =>
        set((state) => ({
          modules: state.modules.map((m) =>
            m.id === moduleId
              ? { ...m, items: m.items.filter((i) => i.id !== itemId) }
              : m
          ),
        })),

      updateSubItem: (moduleId, itemId, updates) =>
        set((state) => ({
          modules: state.modules.map((m) =>
            m.id === moduleId
              ? {
                  ...m,
                  items: m.items.map((i) =>
                    i.id === itemId ? { ...i, ...updates } : i
                  ),
                }
              : m
          ),
        })),

      addPerson: (moduleId, person) =>
        set((state) => ({
          modules: state.modules.map((m) =>
            m.id === moduleId
              ? {
                  ...m,
                  persons: [...(m.persons || []), { ...person, id: generateId() }],
                }
              : m
          ),
        })),

      deletePerson: (moduleId, personId) =>
        set((state) => ({
          modules: state.modules.map((m) =>
            m.id === moduleId
              ? {
                  ...m,
                  persons: (m.persons || []).filter((p) => p.id !== personId),
                }
              : m
          ),
        })),

      updatePerson: (moduleId, personId, updates) =>
        set((state) => ({
          modules: state.modules.map((m) =>
            m.id === moduleId
              ? {
                  ...m,
                  persons: (m.persons || []).map((p) =>
                    p.id === personId ? { ...p, ...updates } : p
                  ),
                }
              : m
          ),
        })),

      setTheme: (themeId) =>
        set((state) => ({
          currentTheme: state.themes.find((t) => t.id === themeId) || defaultTheme,
        })),

      exportData: () => {
        const state = useStore.getState();
        const data = {
          version: 1,
          exportDate: new Date().toISOString(),
          modules: state.modules,
          currentThemeId: state.currentTheme.id,
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `灰硫班组信息_${new Date().toLocaleDateString('zh-CN').replace(/\//g, '-')}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      },

      importData: (data) =>
        set((state) => {
          const theme = state.themes.find((t) => t.id === data.currentThemeId) || defaultTheme;
          return {
            modules: data.modules || state.modules,
            currentTheme: theme,
          };
        }),
    }),
    {
      name: 'huiliu-team-storage',
    }
  )
);