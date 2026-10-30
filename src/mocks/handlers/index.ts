import { authHandlers } from './auth';
import { listsHandlers } from './lists';

export const handlers = [...authHandlers, ...listsHandlers];
