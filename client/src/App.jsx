import { useEffect, useState } from "react";

import {
  getProjects,
  addProject,
  deleteProject,
  updateProject,
} from "./services/api";

import ProjectCard from "./components/ProjectCard";
import ProjectForm from "./components/ProjectForm";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAdd(project) {
    try {
      await addProject(project);
      await loadProjects();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteProject(id);
      await loadProjects();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUpdate(id, project) {
    try {
      await updateProject(id, project);
      await loadProjects();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="border-b border-slate-700">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <h1 className="text-4xl font-bold text-blue-400">
            DevTrack 🚀
          </h1>

          <p className="mt-2 text-slate-400">
            Track your development projects and learning journey.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <ProjectForm onAdd={handleAdd} />

        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-bold">
            Projects
          </h2>

          {projects.length === 0 ? (
            <p className="text-slate-400">
              No projects yet. Add your first one!
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;