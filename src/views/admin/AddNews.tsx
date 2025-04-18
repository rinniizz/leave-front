// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { Grid } from '@mui/material';

// components
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import ParentCard from 'src/components/shared/ParentCard';
import NewsForm from './NewsForm';
const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Admin',
  },
  {
    title: 'เพิ่มข่าวประชาสัมพันธ์',
  },
];

const AddNews = () => {
  return (
    <PageContainer title="Horizontal Form" description="this is Horizontal Form page">
      {/* breadcrumb */}
      <Breadcrumb title="เพิ่มข่าวประชาสัมพันธ์" items={BCrumb} />
      {/* end breadcrumb */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ParentCard title="รายละเอียด">
            <NewsForm />
          </ParentCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default AddNews;
