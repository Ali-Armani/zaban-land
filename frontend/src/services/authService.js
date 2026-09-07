import api, { setAccessToken } from './api';

export async function register(payload) {
  const { data } = await api.post('/auth/register', payload);
  return data;
}

export async function login(identifier, password) {
  const { data } = await api.post('/auth/login', { identifier, password });
  setAccessToken(data.accessToken);
  return data;
}

export async function logout() {
  await api.post('/auth/logout');
  setAccessToken(null);
}

export async function fetchMe() {
  const { data } = await api.get('/users/me');
  return data.user;
}
