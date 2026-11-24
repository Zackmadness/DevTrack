import { useEffect, useState } from "react";

import {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
} from "./services/api";

import Login from "./pages/Login";
import ProjectCard from "./components/ProjectCard";
import ProjectForm from "./components/ProjectForm";

function App() {
  const [projects, setProjects] =
    useState([]);

  const token =
    localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      loadProjects();
    }
  }, [token]);

  async function loadProjects() {
    try {
      const data =
        await getProjects();

      setProjects(data || []);
    } catch (error) {
      console.error(
        "Failed to load projects",
        error
      );
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

    window.location.reload();
  }

  if (!token) {
    return <Login />;
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

export default App;