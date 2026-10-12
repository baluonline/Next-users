// app/users/error.tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div role="alert">
      <p>Something went wrong loading users.</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
