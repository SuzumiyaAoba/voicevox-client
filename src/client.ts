import createClient from 'openapi-fetch';
import type { paths } from './types';

export const client = createClient<paths>({
  baseUrl: 'http://localhost:50021',
});

export default client;
