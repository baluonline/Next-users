"use client";

import { useEffect, useState } from "react";
import useUsersStore, { type Post, type User } from "../actions/user-store";
import Link from "next/link";
import Image from "next/image";

/* interface User {
  id: number;
  name: string;
  email: string;
} */

/* const fetcher = async (url: string) =>
  await fetch(url).then((r) => {
    if (!r.ok) throw new Error("Failed to fetch users");
    return r.json();
  }); */

const UsersList = ({ usersPromise }: { usersPromise: Promise<User[]> }) => {
  const isLoading = useUsersStore((state) => state.isLoading);
  const error = useUsersStore((state) => state.error);

  const postsByUserId = useUsersStore((state) => state.postsByUserId);
  const fetchPostsByUserId = useUsersStore((state) => state.fetchPostsByUserId);
  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    let isCurrent = true;

    const loadUsers = async () => {
      try {
        const people = await usersPromise;
        if (!isCurrent) return;
        setUsers(people);
        await Promise.all(people.map((user) => fetchPostsByUserId(user.id)));
      } catch {
        if (isCurrent) {
          setUsers([]);
        }
      }
    };

    void loadUsers();

    return () => {
      isCurrent = false;
    };
  }, [usersPromise, fetchPostsByUserId]);

  return (
    <div className="flex justify-center items-center flex-1 col-10 ">
      {isLoading && <div role="status">Loading users...</div>}
      {error && <div role="alert">Error loading users: {error}</div>}
      {!isLoading && !error && users?.length === 0 && <p>No users found.</p>}
      {users && users.length > 0 ? (
        <ul className="grid gap-4 grid-cols-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {users.map((user: User) => (
            <li key={user.id}>
              <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <Image
                  className="w-full"
                  src="https://picperf.io/placeholder/200/100.png"
                  width={40}
                  height={40}
                  alt="Sunset in the mountains"
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">
                    <Link className="link" href={`/users/${user.id}`}>
                      {user.id}. {user.name}
                    </Link>
                  </div>
                </div>

                <div className="px-6 pt-4 pb-2 flex flex-row gap-2 flex-wrap">
                  {postsByUserId[user.id]?.map((post: Post) => (
                    <div
                      key={post.title}
                      className="ml-4 font-black text-blue-950"
                    >
                      <strong>#</strong> {post.title}
                    </div>
                  ))}
                </div>
              </div>
              {/*
               */}
            </li>
          ))}
        </ul>
      ) : (
        !isLoading && <p>No users found.</p>
      )}
    </div>
  );
};

export default UsersList;
