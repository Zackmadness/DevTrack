import {
  useEffect,
  useState,
} from "react";

import { getProjects } from "./services/api";

import ProjectCard from "./components/ProjectCard";

function App() {
  const [projects, setProjects] =
    useState([]);

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 p-8 text-white">
      <h1 className="mb-6 text-5xl font-bold">
        DevTrack
      </h1>

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