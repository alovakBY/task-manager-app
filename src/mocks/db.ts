import type { User } from '@/features/auth/model/types';

import { createMockData, type MockStore } from './mockData';

const DB_STORAGE_KEY = 'task-manager:mock-db';
const SESSION_STORAGE_KEY = 'task-manager:mock-session';

type StorageKeys = typeof DB_STORAGE_KEY | typeof SESSION_STORAGE_KEY;

const readStorage = <T>(key: StorageKeys): T | null => {
   try {
      const data = localStorage.getItem(key);

      if (data === null) {
         return null;
      }
      return JSON.parse(data);
   } catch {
      return null;
   }
};

const writeStorage = (key: StorageKeys, value: unknown | null) => {
   try {
      if (value === null) {
         localStorage.removeItem(key);
      } else {
         localStorage.setItem(key, JSON.stringify(value));
      }
   } catch {
      console.log('Error while writing');
   }
};

const store = readStorage<MockStore>(DB_STORAGE_KEY) ?? createMockData();

export const listsTable = {
   getLists: (search: string) => {
      return store.lists.filter((list) => list.name.includes(search.trim()));
   },
};

export const tasksTable = {
   getTasksByListId: (listId: string) => {
      return store.tasks.filter((task) => task.listId === listId);
   },
};

export const authService = {
   get: () => readStorage<User>(SESSION_STORAGE_KEY),
   set: (user: User) => writeStorage(SESSION_STORAGE_KEY, user),
   clear: () => writeStorage(SESSION_STORAGE_KEY, null),
};
