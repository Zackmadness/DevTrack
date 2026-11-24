import { useState } from "react";

export default function ProjectForm({
  onAdd,
}) {
  const [name, setName] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [status, setStatus] =
    useState("In Progress");

  const handleSubmit = (e) => {
    e.preventDefault();

    onAdd({
      name,
      description,
      status,
    });

    setName("");
    setDescription("");
    setStatus("In Progress");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 rounded-lg bg-slate-800 p-4"
    >
      <input
        type="text"
        placeholder="Project Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        className="mb-3 w-full rounded p-2 text-white"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(
            e.target.value
          )
        }
        className="mb-3 w-full rounded p-2 text-white"
      />

      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
        className="mb-3 w-full rounded p-2 text-black"
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

      <button
        className="rounded bg-blue-600 px-4 py-2"
      >
        Add Project
      </button>
    </form>
  );
}

