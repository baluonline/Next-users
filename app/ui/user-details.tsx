"use client";

// import { useEffect, useState } from "react";
import { User } from "../actions/user-store";

export default function FetchUserById({ user }: { user: User | null }) {
  /*   const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); */

  /*  useEffect(() => {
    let isCurrent = true;

    const fetchUser = async () => {
      setIsLoading(true);
      setError(null);
      setUser(null);

      try {
        const response = await fetch(`/api/users/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            response.status === 404 ? "User not found" : "Failed to fetch user",
          );
        }

        const fetchedUser = (await response.json()) as {
          name: string;
          email: string;
        };
        if (isCurrent) {
          setUser(fetchedUser);
        }
      } catch (error) {
        console.error(error);
        if (isCurrent) {
          setError(
            error instanceof Error ? error.message : "Failed to fetch user",
          );
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    };

    fetchUser();

    return () => {
      isCurrent = false;
    };
  }, [id]); */

  /*   if (error) {
    throw new Error(error);
  } */

  return (
    <>
      {user && (
        <div>
          {user.name} - {user.email} - {user.City}
        </div>
      )}
    </>
  );
}
