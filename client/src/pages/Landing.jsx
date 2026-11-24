import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="border-b border-slate-700">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="text-3xl font-bold text-blue-400">
            DevTrack 🚀
          </h1>

          <div className="flex gap-3">
            <Link
              to="/login"
              className="rounded bg-blue-600 px-4 py-2 hover:bg-blue-700"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded bg-green-600 px-4 py-2 hover:bg-green-700"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <h2 className="mb-6 text-6xl font-bold">
            Track Your
            <span className="text-blue-400">
              {" "}Developer Journey
            </span>
          </h2>

          <p className="mx-auto mb-10 max-w-2xl text-xl text-slate-400">
            DevTrack helps developers manage projects,
            track progress, monitor learning goals,
            and showcase accomplishments.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              to="/register"
              className="rounded bg-blue-600 px-8 py-4 text-lg font-bold hover:bg-blue-700"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="rounded border border-slate-600 px-8 py-4 text-lg hover:bg-slate-800"
            >
              Login
            </Link>
          </div>
        </div>

        <div className="mt-24 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-slate-800 p-6">
            <h3 className="mb-3 text-2xl font-bold">
              📋 Manage Projects
            </h3>

            <p className="text-slate-400">
              Organize projects with statuses,
              descriptions, and progress tracking.
            </p>
          </div>

          <div className="rounded-xl bg-slate-800 p-6">
            <h3 className="mb-3 text-2xl font-bold">
              📊 Analytics
            </h3>

            <p className="text-slate-400">
              View completed, active,
              and on-hold projects at a glance.
            </p>
          </div>

          <div className="rounded-xl bg-slate-800 p-6">
            <h3 className="mb-3 text-2xl font-bold">
              🔒 Secure
            </h3>

            <p className="text-slate-400">
              JWT authentication keeps
              user data protected.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}