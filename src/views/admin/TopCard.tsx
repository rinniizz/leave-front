// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { Box, CardContent, Grid, Typography } from '@mui/material';

import icon1 from '../../assets/images/svgs/icon-connect.svg';
import icon2 from '../../assets/images/svgs/icon-user-male.svg';
import icon3 from '../../assets/images/svgs/boat.svg';
import icon4 from '../../assets/images/svgs/plane.svg';
import icon5 from '../../assets/images/svgs/lodging.svg';
import icon6 from '../../assets/images/svgs/suitcase.svg';

import { GetLeaveInfo } from 'src/_Apis/GetLeaveInfo';
import { GetAllEmp } from 'src/_Apis/GetAllEmp';
import { useNavigate } from 'react-router-dom';

interface cardType {
  icon: string;
  title: string;
  digits: string;
  bgcolor: string;
}

const TopCards = () => {
  const [leaveInfo, setLeaveInfo] = React.useState(null);
  const [employeeCount, setEmployeeCount] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchLeaveInfo = async () => {
      try {
        const data = await GetLeaveInfo();
        const leaveCounts = data.reduce(
          (acc: Record<string, number>, curr: Record<string, number>) => {
            acc[curr.leave_cause] = (acc[curr.leave_cause] || 0) + 1;
            return acc;
          },
          {},
        );
        setLeaveInfo(leaveCounts);

        const empData = await GetAllEmp();
        setEmployeeCount(empData.length);
      } catch (error) {
        console.error('Failed to fetch leave info:', error);
      }
    };

    fetchLeaveInfo();
  }, []);

  const now = new Date();

  const topcards: cardType[] = [
    {
      icon: icon1,
      title: 'ข้อมูลล่าสุด',
      digits: now.toLocaleDateString('th-TH') + ' ' + now.toLocaleTimeString('th-TH'),
      bgcolor: 'info',
    },
    {
      icon: icon2,
      title: 'พนักงานทั้งหมด',
      digits: employeeCount ? employeeCount : '0',
      bgcolor: 'primary',
    },
    {
      icon: icon3,
      title: 'ลาพักร้อน',
      digits: leaveInfo ? leaveInfo['ลาพักร้อน'] || '0' : '0',
      bgcolor: 'warning',
    },
    {
      icon: icon4,
      title: 'ลากิจ',
      digits: leaveInfo ? leaveInfo['ลากิจ'] || '0' : '0',
      bgcolor: 'secondary',
    },
    {
      icon: icon5,
      title: 'ลาป่วย',
      digits: leaveInfo ? leaveInfo['ลาป่วย'] || '0' : '0',
      bgcolor: 'error',
    },
    {
      icon: icon6,
      title: 'ลาอื่น ๆ',
      digits: leaveInfo ? leaveInfo['ลาอื่น ๆ'] || '0' : '0',
      bgcolor: 'success',
    },
  ];

  return (
    <Grid container spacing={3} mt={3}>
      {topcards.map((topcard, i) => (
        <Grid item xs={12} sm={4} lg={4} key={i}>
          <Box
            bgcolor={topcard.bgcolor + '.light'}
            textAlign="center"
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              if (topcard.title === 'พนักงานทั้งหมด') {
                navigate('/admin/emp-lists');
              } else {
                navigate(`/leave-info/cause=${topcard.title}`);
              }
            }}
          >
            <CardContent>
              <img src={topcard.icon} alt={topcard.icon} width="60" />
              <Typography
                color={topcard.bgcolor + '.main'}
                mt={1}
                variant="subtitle1"
                fontWeight={700}
                fontSize={18}
              >
                {topcard.title}
              </Typography>
              <Typography color={topcard.bgcolor + '.main'} variant="h5" fontWeight={600}>
                {topcard.digits}
              </Typography>
            </CardContent>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default TopCards;
