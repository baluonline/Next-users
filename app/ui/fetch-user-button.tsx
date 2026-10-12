"use client";

export default function FetchUsersButton() {
  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 3600 },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const users = await response.json();
      console.log("Users fetched:", users);
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={fetchUsers}>Fetch Users</button>;
}
