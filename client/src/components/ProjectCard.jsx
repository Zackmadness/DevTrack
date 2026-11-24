import { useState } from "react";

export default function ProjectCard({
  project,
  onDelete,
  onUpdate,
}) {
  const [editing, setEditing] =
    useState(false);

  const [name, setName] = useState(
    project.name
  );

  const [description,
    setDescription] = useState(
    project.description
  );

  const [status, setStatus] =
    useState(
      project.status ||
        "In Progress"
    );

  function handleSave() {
    onUpdate(project.id, {
      name,
      description,
      status,
    });

    setEditing(false);
  }

  const badgeColor = () => {
    switch (status) {
      case "Completed":
        return "bg-green-600";

      case "On Hold":
        return "bg-yellow-600";

      default:
        return "bg-blue-600";
    }
  };

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800 p-4 shadow-lg">
      {editing ? (
        <>
          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="mb-3 w-full rounded-md p-2 text-black"
          />

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            className="mb-3 w-full rounded-md p-2 text-black"
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value
              )
            }
            className="mb-3 w-full rounded-md p-2 text-black"
          >
            <option value="In Progress">
              In Progress
            </option>

            <option value="Completed">
              Completed
            </option>

            <option value="On Hold">
              On Hold
            </option>
          </select>

          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="rounded bg-green-600 px-4 py-2 hover:bg-green-700"
            >
              Save
            </button>

            <button
              onClick={() =>
                setEditing(false)
              }
              className="rounded bg-gray-600 px-4 py-2 hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-xl font-bold">
              {project.name}
            </h3>

            <span
              className={`rounded-full px-3 py-1 text-sm font-semibold text-white ${badgeColor()}`}
            >
              {status}
            </span>
          </div>

          <p className="mb-4 text-slate-300">
            {project.description}
          </p>

          <div className="flex gap-2">
            <button
              onClick={() =>
                setEditing(true)
              }
              className="rounded bg-blue-600 px-4 py-2 hover:bg-blue-700"
            >
              Edit
            </button>

            <button
              onClick={() =>
                onDelete(project.id)
              }
              className="rounded bg-red-600 px-4 py-2 hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}