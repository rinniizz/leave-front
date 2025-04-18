export async function AuthLogin(emp_code: string, emp_password: string) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(apiUrl + 'login', {
    method: 'POST',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      emp_code,
      emp_password,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}
