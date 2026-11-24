import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        "http://localhost:8080/register",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        setError(
          data.error ||
            "Registration failed"
        );
        return;
      }

      setSuccess(
        "Account created successfully!"
      );

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to connect to server."
      );
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-md rounded-xl bg-slate-800 p-8 shadow-xl">
        <h1 className="mb-2 text-center text-4xl font-bold text-green-400">
          Create Account
        </h1>

        <p className="mb-8 text-center text-slate-400">
          Join DevTrack
        </p>

        {error && (
          <div className="mb-4 rounded bg-red-500/20 p-3 text-red-300">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded bg-green-500/20 p-3 text-green-300">
            {success}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Email
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              placeholder="you@example.com"
              className="w-full rounded-lg border border-slate-600 bg-slate-700 p-3 text-white outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Password
            </label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              placeholder="••••••••"
              className="w-full rounded-lg border border-slate-600 bg-slate-700 p-3 text-white outline-none focus:border-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-green-600 p-3 font-semibold text-white hover:bg-green-700"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-400 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
