const API_URL = "http://localhost:8080";

export async function getProjects() {
  const response = await fetch(
    `${API_URL}/projects`
  );

  return response.json();
}