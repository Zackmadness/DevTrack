import { useState } from "react";

export default function ProjectCard({
  project,
  onDelete,
  onUpdate,
}) {
  const [editing, setEditing] = useState(false);

  const [name, setName] = useState(project.name);

  const [description, setDescription] = useState(
    project.description
  );

  function handleSave() {
    onUpdate(project.id, {
      name,
      description,
    });

    setEditing(false);
  }

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
              setDescription(e.target.value)
            }
            className="mb-3 w-full rounded-md p-2 text-black"
            rows="3"
          />

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
          <h3 className="text-xl font-bold text-white">
            {project.name}
          </h3>

          <p className="mt-2 text-slate-300">
            {project.description}
          </p>

          <div className="mt-4 flex gap-2">
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