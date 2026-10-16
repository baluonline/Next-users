'use client';

import { useState } from 'react';
import useSWR from 'swr';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
}

interface UsersPage {
  users: User[];
  total: number;
}

const PAGE_SIZE = 10;

const fetchUsers = async (url: string): Promise<UsersPage> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to load users. Please try again.');
  }
  return response.json();
};

const usePaginatedUsers = (page: number) => {
  const skip = (page - 1) * PAGE_SIZE;
  const url =
    `https://dummyjson.com/users?limit=${PAGE_SIZE}&skip=${skip}` +
    `&select=firstName,lastName,email,age`;

  return useSWR<UsersPage, Error>(url, fetchUsers);
};

export default function PaginatedTable() {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = usePaginatedUsers(page);
  const pageCount = Math.max(1, Math.ceil((data?.total ?? 0) / PAGE_SIZE));

  return (
    <div>
      <h1>Users table</h1>
      <section>
        <table>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Age</th>
            </tr>
          </thead>
          <tbody>
            {data?.users.map((user) => (
              <tr key={user.id}>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.email}</td>
                <td>{user.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {isLoading && <p role="status">Loading users...</p>}
        {error && <p role="alert">{error.message}</p>}
        <nav aria-label="User pagination">
          <button
            type="button"
            onClick={() => setPage((currentPage) => currentPage - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>
            Page {page} of {pageCount}
          </span>
          <button
            type="button"
            onClick={() => setPage((currentPage) => currentPage + 1)}
            disabled={!data || page >= pageCount}
          >
            Next
          </button>
        </nav>
      </section>
    </div>
  );
}
