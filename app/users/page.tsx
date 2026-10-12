import { getUsers } from "../actions/user";
import LazyUsersList from "../ui/lazy-users-list";
import "./users.css";

export default async function UserPage({ searchParams }: PageProps<"/users">) {
  const params = await searchParams;
  const pageValue = params.page;
  const page = Array.isArray(pageValue) ? pageValue[0] : pageValue;
  const limitValue = params.limit;
  const limit = Array.isArray(limitValue) ? limitValue[0] : limitValue;
  const usersPromise = getUsers(page, limit);

  return (
    <div className="flex flex-col pl-7 flex-1 bg-zinc-50 font-sans dark:bg-black">
      <LazyUsersList usersPromise={usersPromise} />
    </div>
  );
}
