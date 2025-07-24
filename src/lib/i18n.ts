export type Language = 'en' | 'cgn';

export interface Translations {
  // App title and main headings
  appTitle: string;
  appDescription: string;
  loading: string;
  loadingPersonalList: string;
  
  // User authentication
  welcomeBack: string;
  signOut: string;
  welcomeToApp: string;
  enterEmailToStart: string;
  email: string;
  getStarted: string;
  settingUp: string;
  
  // Form labels and inputs
  whatToAvoid: string;
  howBadlyAvoid: string;
  addToList: string;
  placeholder: string;
  
  // Priority levels
  priorityLabels: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
  };
  
  // Actions
  edit: string;
  save: string;
  cancel: string;
  delete: string;
  deleteConfirmTitle: string;
  deleteConfirmMessage: string;
  
  // Sorting
  sortBy: string;
  priority: string;
  dateAdded: string;
  alphabetical: string;
  noItems: string;
  noItemsYet: string;
  noItemsDescription: string;
  itemCount: {
    zero: string;
    one: string;
    other: string;
  };
  
  // Dates
  added: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appTitle: 'Not-To-Do List',
    appDescription: "Track things you want to avoid doing, sorted by how badly you don't want to do them",
    loading: 'Loading...',
    loadingPersonalList: 'Loading your personal not-to-do list...',
    
    welcomeBack: 'Welcome back',
    signOut: 'Sign Out',
    welcomeToApp: 'Welcome to Not-To-Do!',
    enterEmailToStart: 'Enter your email to get started with your personal not-to-do list',
    email: 'Email',
    getStarted: 'Get Started',
    settingUp: 'Setting up...',
    
    whatToAvoid: 'What do you want to avoid doing?',
    howBadlyAvoid: 'How badly do you want to avoid this?',
    addToList: 'Add to Not-To-Do List',
    placeholder: 'e.g., Scrolling social media for hours...',
    
    priorityLabels: {
      1: 'Meh',
      2: 'Rather not',
      3: "Don't want to",
      4: "Really don't want to",
      5: 'Absolutely must avoid',
    },
    
    edit: 'Edit',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    deleteConfirmTitle: 'Delete Not-To-Do Item',
    deleteConfirmMessage: 'Are you sure you want to delete this item? This action cannot be undone.',
    
    sortBy: 'Sort by:',
    priority: 'Priority',
    dateAdded: 'Date Added',
    alphabetical: 'Alphabetical',
    noItems: 'No items yet',
    noItemsYet: 'No items in your not-to-do list yet',
    noItemsDescription: 'Add something you want to avoid doing to get started!',
    itemCount: {
      zero: 'No items yet',
      one: '1 item',
      other: '{count} items',
    },
    
    added: 'Added',
  },
  
  cgn: {
    appTitle: 'Lasterzettel',
    appDescription: 'Halt fast wat de nit dun wills, sorteet noh wie üvvel et es',
    loading: 'Lädt...',
    loadingPersonalList: 'Ding persönliche Lasterzettel lädt...',
    
    welcomeBack: 'Willekumme zeröck',
    signOut: 'Un fott',
    welcomeToApp: 'Willekumme beim Lasterzettel!',
    enterEmailToStart: 'Jiv ding E-Mail en öm met dingem persönliche Lasterzettel ze beginne',
    email: 'E-Mail',
    getStarted: 'Loß jonn',
    settingUp: 'Maache klar...',
    
    whatToAvoid: 'Wat is ding Laster?',
    howBadlyAvoid: 'Wie üvvel isset?',
    addToList: 'Op de Lasterzettel',
    placeholder: 'z.B., Janz lang am Bildscherm kleve...',
    
    priorityLabels: {
      1: 'Och nö',
      2: 'Kannste mache – muss de aber nit',
      3: 'Kumm, loh et sin',
      4: 'Will ich nit dun',
      5: 'Janz üvvel',
    },
    
    edit: 'Ändere',
    save: 'Speichere',
    cancel: 'Ophüre',
    delete: 'Fottschmieße',
    deleteConfirmTitle: 'Laster fottschmieße',
    deleteConfirmMessage: 'Wells de dat werklich fottschmieße? Dat kütt nit zeröck.',
    
    sortBy: 'Sortiere noh:',
    priority: 'Wie üvvel',
    dateAdded: 'Wann dobeijedun',
    alphabetical: 'Nohm ABC',
    noItems: 'Noch nix do',
    noItemsYet: 'Et sin noch kei Sache op ding Lasterzettel',
    noItemsDescription: 'Sach an wat de nit dun wills!',
    itemCount: {
      zero: 'Noch nix do',
      one: '1 Saach',
      other: '{count} Sache',
    },
    
    added: 'Dobeijedun',
  },
};

export function getTranslation(language: Language): Translations {
  return translations[language];
}

export function formatItemCount(count: number, translations: Translations): string {
  if (count === 0) {
    return translations.itemCount.zero;
  } else if (count === 1) {
    return translations.itemCount.one;
  } else {
    return translations.itemCount.other.replace('{count}', count.toString());
  }
}