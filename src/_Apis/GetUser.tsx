export async function GetEmp(emp_code: string) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const api = apiUrl + 'get-user?emp_code=' + emp_code;
  const response = await fetch(api, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}
