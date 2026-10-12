import { login, signup } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const { error, message } = await searchParams;

  return (
    <form
      style={{ maxWidth: 320, margin: "4rem auto", display: "grid", gap: 12 }}
    >
      <h1>Sign in</h1>
      {error && <p style={{ color: "crimson" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}

      <input name="email" type="email" placeholder="Email" required />
      <input
        name="password"
        type="password"
        placeholder="Password"
        required
        minLength={6}
      />

      <button formAction={login}>Log in</button>
      <button formAction={signup}>Sign up</button>
    </form>
  );
}
