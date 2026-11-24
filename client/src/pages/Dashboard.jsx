import { useEffect, useState } from "react";
import {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
} from "../services/api";

import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm";

export default function Dashboard() {
  const [projects, setProjects] =
    useState([]);

  const completed =
    projects.filter(
      (p) =>
        p.status === "Completed"
    ).length;

  const active =
    projects.filter(
      (p) =>
        p.status ===
        "In Progress"
    ).length;

  const onHold =
    projects.filter(
      (p) =>
        p.status === "On Hold"
    ).length;

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      const data =
        await getProjects();

      setProjects(data || []);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAdd(
    project
  ) {
    await addProject(project);

    loadProjects();
  }

  async function handleUpdate(
    id,
    project
  ) {
    await updateProject(
      id,
      project
    );

    loadProjects();
  }

  async function handleDelete(id) {
    await deleteProject(id);

    loadProjects();
  }

  function handleLogout() {
    localStorage.removeItem(
      "token"
    );

    window.location.href =
      "/login";
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="border-b border-slate-700">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="text-4xl font-bold text-blue-400">
            DevTrack 🚀
          </h1>

          <button
            onClick={handleLogout}
            className="rounded bg-red-600 px-4 py-2 hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl p-6">

        {/* Analytics */}

        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-lg bg-slate-800 p-4">
            <h3 className="text-slate-400">
              Total Projects
            </h3>

            <p className="text-3xl font-bold">
              {projects.length}
            </p>
          </div>

          <div className="rounded-lg bg-green-900 p-4">
            <h3>
              Completed
            </h3>

            <p className="text-3xl font-bold">
              {completed}
            </p>
          </div>

          <div className="rounded-lg bg-blue-900 p-4">
            <h3>
              In Progress
            </h3>

            <p className="text-3xl font-bold">
              {active}
            </p>
          </div>

          <div className="rounded-lg bg-yellow-700 p-4">
            <h3>
              On Hold
            </h3>

            <p className="text-3xl font-bold">
              {onHold}
            </p>
          </div>
        </div>

        <ProjectForm
          onAdd={handleAdd}
        />

        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-bold">
            My Projects
          </h2>

          {projects.length === 0 ? (
            <p className="text-slate-400">
              No projects found.
            </p>
          ) : (
            <div className="grid gap-4">
              {projects.map(
                (project) => (
                  <ProjectCard
                    key={
                      project.id
                    }
                    project={
                      project
                    }
                    onDelete={
                      handleDelete
                    }
                    onUpdate={
                      handleUpdate
                    }
                  />
                )
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}