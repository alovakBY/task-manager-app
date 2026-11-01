import { HttpResponse } from 'msw';

export const getNotFoundResponse = () =>
   HttpResponse.json({ message: 'Not found' }, { status: 404 });
