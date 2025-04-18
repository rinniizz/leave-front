export async function fetchPrintPdf() {
  const apiUrl = import.meta.env.VITE_API_URL;

  try {
    const response = await fetch(apiUrl + 'get-leave-info-print', {
      headers: {
        accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
    });
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'leave-info.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else {
      console.error('Failed to fetch the PDF');
    }
  } catch (error) {
    console.error('Error fetching the PDF:', error);
  }
}
