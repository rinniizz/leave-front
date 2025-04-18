export async function DeleteNews(idnews: string) {
  const apiUrl = `${import.meta.env.VITE_API_URL}delete-news/${idnews}`;

  const response = await fetch(apiUrl, {
    method: 'DELETE',
    headers: {
      Accept: '*/*',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  window.location.reload();
  return await response.json();
}
