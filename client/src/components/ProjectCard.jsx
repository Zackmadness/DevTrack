export default function ProjectCard({
  project,
}) {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
      <h3 className="text-xl font-bold">
        {project.name}
      </h3>

      <p className="mt-2 text-slate-400">
        {project.description}
      </p>
    </div>
  );
}