export async function UpdateLeaveStatus(idleaveinfo: string, leave_status: string) {
  const apiUrl = import.meta.env.VITE_API_URL;

  const response = await fetch(apiUrl + 'update-status-leave-info', {
    method: 'PUT',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idleaveinfo,
      leave_status,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // Reload the page after the status has been updated
  window.location.reload();

  let jsonResponse;
  try {
    jsonResponse = await response.json();
  } catch (error) {
    console.error('Error parsing JSON response:', error);
    throw new Error('Invalid JSON response');
  }

  return jsonResponse;
}
