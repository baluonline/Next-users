"use client";
import { useState } from "react";
import { createUser } from "../actions/user";
import { User } from "../actions/user-store";

export default function CreateNewUserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [City, setCity] = useState("");
  const [newUser, setNewUser] = useState<User | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const createdUser = await createUser(name, email, City);
    setNewUser({ ...createdUser });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          className="border border-gray-300 rounded p-2"
          onChange={(e) => setName(e.target.value)}
          aria-describedby="nameHelp"
          aria-label="Name"
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded p-2"
          aria-describedby="emailHelp"
          aria-label="Email"
          required
        />
      </div>
      <div>
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          name="city"
          value={City}
          onChange={(e) => setCity(e.target.value)}
          className="border border-gray-300 rounded p-2"
          aria-describedby="cityHelp"
          aria-label="City"
          required
        />
      </div>
      <button className="bg-blue-500 text-white p-2 rounded" type="submit">
        Create User
      </button>
      {newUser && (
        <div>
          User created: {newUser.name} Successfully with ID: {newUser.id}
        </div>
      )}
    </form>
  );
}
