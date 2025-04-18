export async function DeleteEmp(idemployees: string) {
  const apiUrl = import.meta.env.VITE_API_URL + 'delete-user';

  const response = await fetch(apiUrl, {
    method: 'DELETE',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ idemployees }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  window.location.reload();

  return await response.json();
}
