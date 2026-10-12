import CreateNewUserForm from "@/app/ui/create-new-user-form";

export default function page() {
  return (
    <div className="flex flex-col flex-1 flex-gap-4 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>Create User Page</h1>
      <CreateNewUserForm />
    </div>
  );
}
