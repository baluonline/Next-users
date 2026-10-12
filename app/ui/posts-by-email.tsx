"use client";

import { useState } from "react";
import type { Post, User } from "@/app/actions/user-store";
import { createPostForUser } from "../actions/user";
import { useRouter } from "next/navigation";

export default function PostsByUserEmail({ user }: { user: User | null }) {
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const updatePost = (changes: Partial<Post>) => {
    setPost((previousPost) => ({
      id: previousPost?.id,
      title: changes.title ?? previousPost?.title ?? "",
      content: changes.content ?? previousPost?.content ?? "",
      published: changes.published ?? previousPost?.published ?? false,
      authorId: previousPost?.authorId ?? user?.id ?? 0,
    }));
  };
  const submitForm = async (
    e: React.FormEvent<HTMLFormElement>,
    userId: number,
    post: Post | null,
  ) => {
    e.preventDefault();
    if (!user || !post) {
      console.error("User or post is null");
      return;
    }
    try {
      const createdPost = await createPostForUser(
        user.id,
        post.title,
        post.content ?? "",
        post.published ?? false,
      );
      setPost(createdPost);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to create post",
      );
      console.error("Failed to create post:", error);
    }
  };

  return (
    <div className="flex flex-col w-[40%] justify-center align-text-top bg-zinc-50 font-sans dark:bg-black">
      <p>{user?.name}&rsquo;s Posts</p>
      <form
        className="flex flex-col gap-4 "
        onSubmit={(e) => submitForm(e, user?.id as number, post)}
      >
        <label htmlFor="title" className="font">
          Title:
        </label>
        <input
          id="title"
          type="text"
          className="border border-gray-300 p-2"
          value={post?.title ?? ""}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const title = event.currentTarget.value;
            updatePost({ title });
          }}
        />

        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          className="border border-gray-300 p-2"
          value={post?.content ?? ""}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            const content = event.currentTarget.value;
            updatePost({ content });
          }}
        />

        <label
          htmlFor="published"
          className="relative inline-flex items-center cursor-pointer"
        >
          <input
            type="checkbox"
            id="published"
            checked={post?.published ?? false}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const published = event.currentTarget.checked;
              updatePost({ published });
            }}
            className="sr-only peer"
          />

          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>

          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Published: {post?.published ? "Yes" : "No"}
          </span>
        </label>
        <div className="flex gap-4 items-center mx-auto justify-content-between">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 my-10 px-2 rounded"
            onClick={() => router.push("/users")}
          >
            Submit Post
          </button>
        </div>
      </form>
      {post?.id && (
        <div>
          Post created: {post.title} Successfully with ID: {post.id}
        </div>
      )}
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}
