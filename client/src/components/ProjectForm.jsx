import { useState } from "react";

export default function ProjectForm({
  onAdd,
}) {
  const [name, setName] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onAdd({
      name,
      description,
    });

    setName("");
    setDescription("");
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

      <button
        className="rounded bg-blue-600 px-4 py-2"
      >
        Add Project
      </button>
    </form>
  );
}