import { USERS_API_URL } from '../config/env.js';

async function handleResponse(response) {
  if (response.status === 204) {
    return null;
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

export async function getUsers() {
  const response = await fetch(USERS_API_URL);
  return handleResponse(response);
}

export async function getUser(id) {
  const response = await fetch(`${USERS_API_URL}/${id}`);
  return handleResponse(response);
}

export async function createUser(user) {
  const response = await fetch(USERS_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  return handleResponse(response);
}

export async function updateUser(id, user) {
  const response = await fetch(`${USERS_API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  return handleResponse(response);
}

export async function deleteUser(id) {
  const response = await fetch(`${USERS_API_URL}/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
}
