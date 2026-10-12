"use client";

import dynamic from "next/dynamic";
import type { User } from "@/app/actions/user-store";

const UsersList = dynamic(() => import("./users-list"), {
  loading: () => (
    <div role="status" aria-live="polite">
      Loading users...
    </div>
  ),
});

export default function LazyUsersList({
  usersPromise,
}: {
  usersPromise: Promise<User[]>;
}) {
  return <UsersList usersPromise={usersPromise} />;
}
