import { useCallback, useEffect, useState } from 'react';
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from '../api/users';

const emptyForm = { name: '', email: '', phone: '' };

function formatDate(value) {
  if (!value) return '—';
  return new Date(value).toLocaleString();
}

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function startEdit(user) {
    setEditingId(user.id);
    setForm({
      name: user.name,
      email: user.email,
      phone: user.phone || '',
    });
    setError('');
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
    setError('');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
    };

    try {
      if (editingId) {
        await updateUser(editingId, payload);
      } else {
        await createUser(payload);
      }

      cancelEdit();
      await loadUsers();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(user) {
    const confirmed = window.confirm(
      `Permanently delete ${user.name}? This cannot be undone.`
    );
    if (!confirmed) return;

    setError('');
    try {
      await deleteUser(user.id);
      if (editingId === user.id) {
        cancelEdit();
      }
      await loadUsers();
    } catch (err) {
      setError(err.message);
    }
  }

  const inputClass =
    'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-blue-400 dark:focus:ring-blue-900';

  const btnSecondary =
    'rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800';

  return (
    <div className="mx-auto max-w-6xl">
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            {editingId ? 'Edit User' : 'Add User'}
          </h2>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                className={inputClass}
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className={inputClass}
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                value={form.phone}
                onChange={handleChange}
                className={inputClass}
                placeholder="9876543210"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                {submitting ? 'Saving...' : editingId ? 'Update User' : 'Create User'}
              </button>

              {editingId && (
                <button type="button" onClick={cancelEdit} className={btnSecondary}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Users</h2>
            <button type="button" onClick={loadUsers} className={`${btnSecondary} px-3 py-1.5 text-sm`}>
              Refresh
            </button>
          </div>

          {loading ? (
            <p className="text-slate-500 dark:text-slate-400">Loading users...</p>
          ) : users.length === 0 ? (
            <p className="text-slate-500 dark:text-slate-400">No users found. Add your first user.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-700">
                <thead className="bg-slate-50 text-slate-600 dark:bg-slate-800/50 dark:text-slate-400">
                  <tr>
                    <th className="px-3 py-2 font-medium">Name</th>
                    <th className="px-3 py-2 font-medium">Email</th>
                    <th className="px-3 py-2 font-medium">Phone</th>
                    <th className="px-3 py-2 font-medium">Created</th>
                    <th className="px-3 py-2 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {users.map((user) => (
                    <tr key={user.id} className="text-slate-800 dark:text-slate-200">
                      <td className="px-3 py-3 font-medium">{user.name}</td>
                      <td className="px-3 py-3">{user.email}</td>
                      <td className="px-3 py-3">{user.phone || '—'}</td>
                      <td className="px-3 py-3 whitespace-nowrap">{formatDate(user.created_at)}</td>
                      <td className="px-3 py-3">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => startEdit(user)}
                            className="rounded-md bg-slate-100 px-3 py-1.5 font-medium text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(user)}
                            className="rounded-md bg-red-50 px-3 py-1.5 font-medium text-red-700 transition hover:bg-red-100 dark:bg-red-950/50 dark:text-red-400 dark:hover:bg-red-950"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
