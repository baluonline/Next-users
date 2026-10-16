"use client";

import { create } from "zustand";
import {
  createPostForUser,
  createUser,
  deleteUser,
  getPostsByUserId,
  getUsers,
  updateUser,
} from "./user";
import { devtools } from "zustand/middleware";

export interface Post {
  id?: number;
  title: string;
  content: string | null;
  published: boolean;
  authorId: number;
}
export interface User {
  id: number;
  name: string;
  email: string;
  City: string;
  updatedAt: Date;
  posts?: Post[];
}

interface UsersState {
  people: User[];
  posts: Post[];
  postsByUserId: Record<number, Post[]>;
  isLoading: boolean;
  error: string | null;
  imageUrls: string[];
  fetchUsers: () => Promise<void>;
  createUser: (name: string, email: string, City: string) => Promise<void>;
  updateUser: (
    id: number,
    name: string,
    email: string,
    City: string,
  ) => Promise<void>;
  deleteUser: (email: string) => Promise<void>;
  createPostForUser: (
    userId: number,
    title: string,
    content: string,
    published: boolean,
  ) => Promise<void>;
  fetchPostsByUserId: (userId: number) => Promise<void>;
}

const useUsersStore = create<UsersState>()(
  devtools((set) => ({
    people: [],
    posts: [],
    postsByUserId: {},
    isLoading: false,
    error: null,
    imageUrls:[ "https://randomimageurl.com/assets/images/local/20260103_0518_Bold%20Abstract%20Composition_simple_compose_01ke204yvyf6pbx3ksw2cjcgkw_compressed_q80.jpeg",
        "https://images.unsplash.com/photo-1789677802125-ca4e0f676e05?ixid=M3w4MjcwNjd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3OTE4MjM5OTh8&ixlib=rb-4.1.0&fit=max&q=80&auto=format",
        "https://images.unsplash.com/photo-1791149634999-4ea6eb1c4c5a?ixid=M3w4MjcwNjd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3OTE4MjM5OTh8&ixlib=rb-4.1.0&fit=max&q=80&auto=format",
    ],
    fetchUsers: async () => {
      set({ isLoading: true, error: null });

      try {
        set({ people: await getUsers() });
      } catch (error) {
        set({
          error:
            error instanceof Error ? error.message : "Failed to fetch users",
        });
      } finally {
        set({ isLoading: false });
      }
    },
    createUser: async (name: string, email: string, City: string) => {
      set({ isLoading: true, error: null });

      try {
        const newUser: User = await createUser(name, email, City);
        set((state) => ({ people: [...state.people, newUser] }));
      } catch (error) {
        set({
          error:
            error instanceof Error ? error.message : "Failed to create user",
        });
      } finally {
        set({ isLoading: false });
      }
    },
    updateUser: async (
      id: number,
      name: string,
      email: string,
      City: string,
    ) => {
      set({ isLoading: true, error: null });

      try {
        const updatedUser: User = await updateUser(id, name, email, City);
        set((state) => ({
          people: state.people.map((user) =>
            user.id === id ? updatedUser : user,
          ),
        }));
      } catch (error) {
        set({
          error:
            error instanceof Error ? error.message : "Failed to update user",
        });
      } finally {
        set({ isLoading: false });
      }
    },
    deleteUser: async (email: string) => {
      set({ isLoading: true, error: null });

      try {
        await deleteUser(email);
        set((state) => ({
          people: state.people.filter((user) => user.email !== email),
        }));
      } catch (error) {
        set({
          error:
            error instanceof Error ? error.message : "Failed to delete user",
        });
      } finally {
        set({ isLoading: false });
      }
    },
    createPostForUser: async (
      userId: number,
      title: string,
      content: string,
      published: boolean,
    ) => {
      set({ isLoading: true, error: null });
      try {
        const newPost = await createPostForUser(
          userId,
          title,
          content,
          published,
        );
        if (!newPost) {
          throw new Error("Failed to create post for user");
        }
        set((state) => ({ posts: [...state.posts, newPost] }));
      } catch (error) {
        set({
          error:
            error instanceof Error
              ? error.message
              : "Failed to create post for user",
        });
      } finally {
        set({ isLoading: false });
      }
    },

    fetchPostsByUserId: async (userId: number) => {
      set({ isLoading: true, error: null });
      try {
        const fetchedPosts = await getPostsByUserId(userId);
        set((state) => ({
          postsByUserId: {
            ...state.postsByUserId,
            [userId]: fetchedPosts,
          },
        }));
      } catch (error) {
        set({
          error:
            error instanceof Error
              ? error.message
              : "Failed to fetch posts for user",
        });
      } finally {
        set({ isLoading: false });
      }
    },
  })),
);

export default useUsersStore;
