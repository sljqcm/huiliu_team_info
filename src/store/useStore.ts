import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Module, SubItem, AppState } from '../types';
import { initialModules, themes, defaultTheme, defaultSettings } from '../data/initialData';

const genId = () => Math.random().toString(36).substring(2, 11);

function addSubItemToTree(
  items: SubItem[],
  parentId: string | null,
  newItem: SubItem
): SubItem[] {
  if (parentId === null) {
    return [...items, newItem];
  }
  return items.map((item) => {
    if (item.id === parentId) {
      return { ...item, children: [...(item.children || []), newItem], collapsed: false };
    }
    if (item.children) {
      return { ...item, children: addSubItemToTree(item.children, parentId, newItem) };
    }
    return item;
  });
}

function deleteSubItemFromTree(items: SubItem[], itemId: string): SubItem[] {
  return items
    .filter((item) => item.id !== itemId)
    .map((item) => {
      if (item.children) {
        return { ...item, children: deleteSubItemFromTree(item.children, itemId) };
      }
      return item;
    });
}

function updateSubItemInTree(
  items: SubItem[],
  itemId: string,
  updates: Partial<SubItem>
): SubItem[] {
  return items.map((item) => {
    if (item.id === itemId) {
      return { ...item, ...updates };
    }
    if (item.children) {
      return { ...item, children: updateSubItemInTree(item.children, itemId, updates) };
    }
    return item;
  });
}

function toggleSubItemInTree(items: SubItem[], itemId: string): SubItem[] {
  return items.map((item) => {
    if (item.id === itemId) {
      return { ...item, collapsed: !item.collapsed };
    }
    if (item.children) {
      return { ...item, children: toggleSubItemInTree(item.children, itemId) };
    }
    return item;
  });
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      modules: initialModules,
      currentTheme: defaultTheme,
      themes: themes,
      settings: defaultSettings,

      addModule: (module) =>
        set((state) => ({
          modules: [...state.modules, { ...module, id: genId() } as Module],
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

      addSubItem: (moduleId, parentItemId, item) =>
        set((state) => ({
          modules: state.modules.map((m) => {
            if (m.id !== moduleId) return m;
            const newItem: SubItem = { ...item, id: genId(), children: [] };
            return {
              ...m,
              items: addSubItemToTree(m.items, parentItemId, newItem),
            };
          }),
        })),

      deleteSubItem: (moduleId, itemId) =>
        set((state) => ({
          modules: state.modules.map((m) => {
            if (m.id !== moduleId) return m;
            return { ...m, items: deleteSubItemFromTree(m.items, itemId) };
          }),
        })),

      updateSubItem: (moduleId, itemId, updates) =>
        set((state) => ({
          modules: state.modules.map((m) => {
            if (m.id !== moduleId) return m;
            return { ...m, items: updateSubItemInTree(m.items, itemId, updates) };
          }),
        })),

      toggleSubItem: (moduleId, itemId) =>
        set((state) => ({
          modules: state.modules.map((m) => {
            if (m.id !== moduleId) return m;
            return { ...m, items: toggleSubItemInTree(m.items, itemId) };
          }),
        })),

      addPerson: (moduleId, person) =>
        set((state) => ({
          modules: state.modules.map((m) => {
            if (m.id !== moduleId) return m;
            return {
              ...m,
              persons: [...(m.persons || []), { ...person, id: genId() }],
            };
          }),
        })),

      deletePerson: (moduleId, personId) =>
        set((state) => ({
          modules: state.modules.map((m) => {
            if (m.id !== moduleId) return m;
            return {
              ...m,
              persons: (m.persons || []).filter((p) => p.id !== personId),
            };
          }),
        })),

      updatePerson: (moduleId, personId, updates) =>
        set((state) => ({
          modules: state.modules.map((m) => {
            if (m.id !== moduleId) return m;
            return {
              ...m,
              persons: (m.persons || []).map((p) =>
                p.id === personId ? { ...p, ...updates } : p
              ),
            };
          }),
        })),

      setTheme: (themeId) =>
        set((state) => ({
          currentTheme: state.themes.find((t) => t.id === themeId) || defaultTheme,
        })),

      updateSettings: (settings) =>
        set((state) => ({
          settings: { ...state.settings, ...settings },
        })),

      exportData: () => {
        const state = useStore.getState();
        const data = {
          modules: state.modules,
          currentThemeId: state.currentTheme.id,
          settings: state.settings,
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], {
          type: 'application/json',
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const date = new Date().toISOString().split('T')[0];
        a.download = `huiliu-team-data-${date}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      },

      importData: (data) =>
        set((state) => {
          const theme = state.themes.find((t) => t.id === data.currentThemeId) || defaultTheme;
          const newSettings = data.settings
            ? { ...state.settings, ...data.settings }
            : state.settings;
          return {
            modules: data.modules || state.modules,
            currentTheme: theme,
            settings: newSettings,
          };
        }),
    }),
    {
      name: 'huiliu-team-storage',
    }
  )
);
