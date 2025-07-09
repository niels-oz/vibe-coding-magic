# Not-To-Do App Implementation Plan

## Overview
A simple "not-to-do" list application that helps users track things they want to avoid doing, with the ability to sort by importance of how badly they don't want to do these things. This will be displayed on the home page and use local storage for persistence.

## Core Features

### 1. Not-To-Do Item Management
- **Add new not-to-do items** with a text input
- **Edit existing items** inline
- **Delete items** with confirmation
- **Mark items as "avoided today"** (temporary status that resets daily)

### 2. Importance/Priority System
- **Priority levels**: 1-5 scale (1 = "meh, don't really want to do" to 5 = "absolutely must avoid at all costs")
- **Visual indicators**: Color-coded badges or icons for different priority levels
- **Sorting capability**: Sort by priority (highest first), creation date, or alphabetically

### 3. Visual Design
- **Clean, minimalist interface** using ShadCN UI components
- **Responsive design** that works on mobile and desktop
- **Dark/light theme** support (if ShadCN theme is configured)

## Technical Implementation

### 1. Data Structure
```typescript
interface NotToDoItem {
  id: string;
  text: string;
  priority: 1 | 2 | 3 | 4 | 5;
  createdAt: Date;
  avoidedToday: boolean;
  lastAvoidedDate?: Date;
}

interface NotToDoState {
  items: NotToDoItem[];
  sortBy: 'priority' | 'date' | 'alphabetical';
  sortDirection: 'asc' | 'desc';
}
```

### 2. Local Storage Implementation
- **Key**: `not-todo-items`
- **Auto-save**: Save to localStorage on every change
- **Data validation**: Ensure data integrity when loading from localStorage
- **Migration strategy**: Handle schema changes gracefully

### 3. Components Architecture

#### Main Components
1. ✅ **NotToDoApp** - Main container component
2. 🔄 **NotToDoHeader** - Title and sort controls (integrated into main app)
3. ✅ **NotToDoForm** - Add new item form
4. ✅ **NotToDoList** - List of all items
5. ✅ **NotToDoItem** - Individual item component
6. ✅ **PrioritySelector** - Priority level selector
7. ✅ **SortControls** - Sorting options

#### ShadCN UI Components to Use
- ✅ **Button** - For actions (add, delete, edit, avoid)
- ✅ **Input** - For text input when adding/editing items
- ✅ **Card** - For individual not-to-do items
- ✅ **Badge** - For priority indicators
- ✅ **Select** - For sorting options
- ✅ **Dialog** - For delete confirmations
- ✅ **Checkbox** - For "avoided today" status
- ✅ **Separator** - For visual separation
- ✅ **Label** - For form labels

### 4. State Management
- **React useState** for component state
- **Custom hooks** for localStorage operations and item management
- **useEffect** for auto-saving and daily reset logic

## Detailed Component Specifications

### NotToDoApp Component
- Main container with proper spacing and layout
- Manages global state for all items
- Handles localStorage operations
- Implements daily reset logic for "avoided today" status

### NotToDoForm Component
- Text input for new item description
- Priority selector (1-5 scale with labels)
- Add button with proper validation
- Form reset after successful addition
- Enter key support for quick addition

### NotToDoItem Component
- Card layout with item text prominently displayed
- Priority badge with color coding:
  - Priority 1: Gray/muted
  - Priority 2: Blue
  - Priority 3: Yellow
  - Priority 4: Orange
  - Priority 5: Red
- "Avoided Today" checkbox/button
- Edit mode toggle
- Delete button with confirmation
- Responsive layout for mobile

### SortControls Component
- Dropdown/Select for sort criteria
- Toggle for sort direction
- Clear visual indication of current sort

## Priority System Details

### Priority Levels
1. **Level 1** - "Meh" - Light gray badge
2. **Level 2** - "Rather not" - Blue badge
3. **Level 3** - "Don't want to" - Yellow badge  
4. **Level 4** - "Really don't want to" - Orange badge
5. **Level 5** - "Absolutely must avoid" - Red badge

### Priority Labels
- Include helpful labels in the priority selector
- Show priority meaning in tooltips or help text

## User Experience Features

### Visual Feedback
- **Success animations** when avoiding items
- **Hover effects** on interactive elements
- **Loading states** if needed
- **Empty state** with helpful message and call-to-action

### Accessibility
- **Keyboard navigation** support
- **Screen reader** friendly labels
- **High contrast** mode compatibility
- **Focus indicators** for all interactive elements

### Daily Reset Logic
- **Automatic reset** of "avoided today" status at midnight
- **Visual indicator** showing daily progress
- **Optional streak tracking** for consistently avoided items

## Implementation Phases

### Phase 1: Basic Functionality ✅
1. ✅ Set up basic component structure
2. ✅ Implement add/delete functionality
3. ✅ Basic localStorage integration
4. ✅ Simple priority system

### Phase 2: Enhanced Features
1. Inline editing capability
2. Sorting functionality
3. "Avoided today" feature
4. Improved styling and animations

### Phase 3: Polish and UX
1. Daily reset logic
2. Enhanced accessibility
3. Mobile optimization
4. Performance optimizations

## File Structure
```
src/
├── app/
│   └── page.tsx (integrate NotToDoApp)
├── components/
│   ├── ui/ (existing ShadCN components)
│   └── not-todo/
│       ├── NotToDoApp.tsx
│       ├── NotToDoForm.tsx
│       ├── NotToDoList.tsx
│       ├── NotToDoItem.tsx
│       ├── PrioritySelector.tsx
│       └── SortControls.tsx
├── hooks/
│   ├── useLocalStorage.ts
│   ├── useNotToDoItems.ts
│   └── useDailyReset.ts
└── types/
    └── not-todo.ts
```

## Testing Considerations
- **localStorage edge cases** (quota exceeded, disabled)
- **Data migration** scenarios
- **Cross-browser compatibility**
- **Mobile responsiveness**
- **Accessibility compliance**

## Code Quality ✅
- ✅ **TypeScript compilation** - No errors or warnings
- ✅ **ESLint compliance** - All linting rules satisfied
- ✅ **Type safety** - Proper typing throughout codebase
- ✅ **Production build** - Successfully builds with optimizations
- ✅ **Static generation** - All pages prerendered successfully

This implementation plan provides a solid foundation for building a delightful and functional not-to-do app that will help users stay mindful of things they want to avoid!
