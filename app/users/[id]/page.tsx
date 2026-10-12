import { User } from "@/app/actions/user-store";
import PostsByUserEmail from "@/app/ui/posts-by-email";
// import FetchUserById from "@/app/ui/user-details";
import { prisma } from "@/lib/prisma";

interface UserPageProps {
  params: Promise<{ id: string }>;
}
const UserPage = async ({ params }: UserPageProps) => {
  const { id } = await params;
  const user: User | null = await prisma.user.findUnique({
    where: { id: Number(id) },
  });

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {/* <FetchUserById user={user} /> */}
      <PostsByUserEmail user={user} />
    </div>
  );
};

export default UserPage;
