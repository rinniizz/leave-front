import React from 'react';
import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import LoaderComponent from 'src/layouts/loading/Loader';

const NewsList = () => {
  const [news, setNews] = React.useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = React.useState(true);

  interface NewsItem {
    idnews: number;
    news_topic: string;
    news_description: string;
    news_picture: string;
  }

  React.useEffect(() => {
    fetch(apiUrl + 'get-news')
      .then((response) => response.json())
      .then((data) => {
        setNews(data);
        setLoading(false); // Set loading to false once the data is fetched
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
        setLoading(false); // Ensure loading is set to false even if there's an error
      });
  }, []);

  if (loading) {
    return <LoaderComponent />;
  }

  const renderNewsItem = (newsItem: NewsItem) => {
    // Decode the Base64 image
    const imageSrc = `data:image/webp;base64,${newsItem.news_picture}`;

    return (
      <Grid item xs={12} sm={6} key={newsItem.idnews}>
        <Card sx={{ marginBottom: 2 }}>
          <CardMedia
            component="img"
            height="200"
            image={imageSrc}
            alt={newsItem.news_topic}
            sx={{ objectFit: 'contain' }}
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {newsItem.news_topic}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {newsItem.news_description}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {news.map(renderNewsItem)}
      </Grid>
    </Box>
  );
};

export default NewsList;
