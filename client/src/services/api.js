const API_URL = "http://localhost:8080";

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

export async function getProjects() {
  const response = await fetch(
    `${API_URL}/projects`,
    {
      headers: getAuthHeaders(),
    }
  );

  return response.json();
}

export async function addProject(project) {
  const response = await fetch(
    `${API_URL}/projects`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(project),
    }
  );

  return response.json();
}

export async function updateProject(
  id,
  project
) {
  const response = await fetch(
    `${API_URL}/projects/${id}`,
    {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(project),
    }
  );

  return response.json();
}

export async function deleteProject(id) {
  const response = await fetch(
    `${API_URL}/projects/${id}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );

  return response.json();
}