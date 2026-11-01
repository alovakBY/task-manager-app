import { authHandlers } from './auth';
import { listsHandlers } from './lists';
import { tasksHandlers } from './tasks';

export const handlers = [...authHandlers, ...listsHandlers, ...tasksHandlers];
