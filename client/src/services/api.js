const API_URL = "http://localhost:8080";

export async function getProjects() {
  const response = await fetch(
    `${API_URL}/projects`
  );

  return response.json();
}


export async function addProject(
  project
) {
  const response = await fetch(
    `${API_URL}/projects`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(project),
    }
  );

  return response.json();
}