// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { Box, Grid } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

import TopCards from './TopCard';
import LeaveInfoLists from './LeaveInfoLists';

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard page">
      <Box>
        <Grid container spacing={3}>
          {/* column */}
          <Grid item xs={12} lg={12}>
            <TopCards />
          </Grid>
        </Grid>
        <Grid container spacing={3} mt={3} justifyContent="center">
          <LeaveInfoLists />
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
