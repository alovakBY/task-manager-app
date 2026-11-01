import type { User } from '@/features/auth/model/types';
import type { ListDTO } from '@/features/lists/api/types';
import type { TaskDTO } from '@/features/tasks/api/types';

import { createMockData, type MockStore } from './mockData';
import { getTaskDeadlineStatus } from './utils/getTaskDeadlineStatus';
import { sortTasks } from './utils/sortTasks';

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

let store = readStorage<MockStore>(DB_STORAGE_KEY) ?? createMockData();

const commit = (updatedStore: MockStore) => {
   store = updatedStore;
   writeStorage(DB_STORAGE_KEY, store);
};

export const listsTable = {
   getLists: (search: string) => {
      return store.lists.filter((list) => list.name.includes(search.trim()));
   },
   getList: (listId: string) => {
      return store.lists.find((list) => list.id === listId);
   },
   addList: (name: string) => {
      const newList: Pick<ListDTO, 'name' | 'id'> = {
         id: crypto.randomUUID(),
         name,
      };

      const updatedStore = { ...store };

      updatedStore.lists.push(newList);

      commit(updatedStore);

      return newList;
   },
   deleteList: (listId: string) => {
      if (!listsTable.getList(listId)) {
         return false;
      }

      const updatedLists = store.lists.filter((list) => list.id !== listId);

      commit({ ...store, lists: updatedLists });

      return true;
   },
   renameList: (listId: string, newName: string) => {
      const currentList = listsTable.getList(listId);

      if (!currentList) {
         return false;
      }

      const updatedLists = store.lists.map((list) => {
         if (list.id === listId) {
            return { ...list, name: newName };
         } else {
            return list;
         }
      });

      commit({ ...store, lists: updatedLists });

      return currentList;
   },
};

export const tasksTable = {
   getTasksByListId: (listId: string): TaskDTO[] => {
      const now: Date = new Date();

      const tasks = store.tasks
         .filter((task) => task.listId === listId)
         .map((task) => ({
            ...task,
            deadlineStatus: getTaskDeadlineStatus(task, now),
         }));

      return sortTasks(tasks, now);
   },
};

export const authService = {
   get: () => readStorage<User>(SESSION_STORAGE_KEY),
   set: (user: User) => writeStorage(SESSION_STORAGE_KEY, user),
   clear: () => writeStorage(SESSION_STORAGE_KEY, null),
};
