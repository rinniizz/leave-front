import axios from 'axios';

export const postNews = async (newsTopic: string, newsDescription: string, image: File | null) => {
  const formData = new FormData();
  const apiUrl = import.meta.env.VITE_API_URL;
  const userId = localStorage.getItem('empId') || '';
  formData.append('news_topic', newsTopic);
  formData.append('news_description', newsDescription);
  if (image) {
    formData.append('picpath', image);
  }
  formData.append('news_createby', userId);
  formData.append('news_createdate', new Date().toISOString().split('T')[0]);

  try {
    const response = await axios.post(apiUrl + 'create-news', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating news:', error);
    throw error;
  }
};
