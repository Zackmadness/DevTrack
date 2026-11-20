import {
  useEffect,
  useState,
} from "react";

import {
  addProject,
  getProjects,
} from "./services/api";

import ProjectCard from "./components/ProjectCard";
import ProjectForm from "./components/ProjectForm";

function App() {
  const [projects, setProjects] =
    useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    const data =
      await getProjects();

    setProjects(data);
  }

  async function handleAdd(
    project
  ) {
    await addProject(project);

    loadProjects();
  }

  return (
    <div className="min-h-screen bg-slate-900 p-8 text-white">
      <h1 className="mb-6 text-5xl font-bold">
        DevTrack
      </h1>

      <ProjectForm
        onAdd={handleAdd}
      />

      <div className="grid gap-4">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}
      </div>
    </div>
  );
}

export default App;