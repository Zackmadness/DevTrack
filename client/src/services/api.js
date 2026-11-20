export async function getServerMessage() {
  const response = await fetch(
    "http://localhost:8080"
  );

  return response.json();
}