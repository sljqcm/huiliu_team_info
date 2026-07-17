export interface SubItem {
  id: string;
  content: string;
  date?: string;
  children?: SubItem[];
  collapsed?: boolean;
}

export interface Person {
  id: string;
  name: string;
  position: string;
  contact: string;
}

export interface Module {
  id: string;
  title: string;
  items: SubItem[];
  persons?: Person[];
  type: 'standard' | 'personnel';
}

export interface Theme {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  cardBackgroundColor: string;
  textColor: string;
  borderColor: string;
  buttonHoverColor: string;
}

export interface Settings {
  scale: number;
  glassEffect: boolean;
  animation: boolean;
  cardMode: 'grid' | 'list';
}

export interface AppState {
  modules: Module[];
  currentTheme: Theme;
  themes: Theme[];
  settings: Settings;
  addModule: (module: Omit<Module, 'id'>) => void;
  deleteModule: (id: string) => void;
  updateModule: (id: string, updates: Partial<Module>) => void;
  addSubItem: (moduleId: string, parentItemId: string | null, item: Omit<SubItem, 'id' | 'children'>) => void;
  deleteSubItem: (moduleId: string, itemId: string) => void;
  updateSubItem: (moduleId: string, itemId: string, updates: Partial<SubItem>) => void;
  toggleSubItem: (moduleId: string, itemId: string) => void;
  addPerson: (moduleId: string, person: Omit<Person, 'id'>) => void;
  deletePerson: (moduleId: string, personId: string) => void;
  updatePerson: (moduleId: string, personId: string, updates: Partial<Person>) => void;
  setTheme: (themeId: string) => void;
  updateSettings: (settings: Partial<Settings>) => void;
  exportData: () => void;
  importData: (data: { modules: Module[]; currentThemeId: string; settings?: Partial<Settings> }) => void;
}
