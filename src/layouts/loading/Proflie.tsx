import { useEffect, useState } from 'react';
import {
  CardContent,
  Typography,
  Grid,
  Divider,
  Avatar,
  Box,
  Stack,
  Skeleton,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import BlankCard from 'src/components/shared/BlankCard';
import LoaderComponent from './Loader';
import './style.css';

interface UserData {
  emp_name: string;
  emp_role: string;
  emp_code: string;
  emp_nickname: string;
  emp_address: string;
  emp_tel: string;
  emp_department: string;
  avatar: string;
}

interface UserApiResponse {
  emp_name: string;
  emp_role: string;
  emp_code: string;
  emp_nickname: string;
  emp_address: string;
  emp_tel: string;
  emp_department: string;
}

const Profile = () => {
  const theme = useTheme();
  const [isLoading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData[]>([]);
  const empId = localStorage.getItem('empId');
  const apiUrl = `${import.meta.env.VITE_API_URL}get-user?emp_code=${empId}`;

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Map the userdata array to match the UserData interface
        const mappedData = data.userdata.map((user: UserApiResponse) => ({
          emp_name: user.emp_name,
          emp_role: user.emp_role,
          emp_code: user.emp_code,
          emp_nickname: user.emp_nickname,
          emp_address: user.emp_address,
          emp_tel: user.emp_tel,
          emp_department: user.emp_department,
          avatar: 'path/to/default/avatar.png', // Placeholder or adjust based on your data structure
        }));
        setUserData(mappedData);
        setLoading(false);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, [apiUrl]);

  if (isLoading) {
    return <LoaderComponent />;
  }

  return (
    <Grid container spacing={3} justifyContent="center">
      {userData.map((card, index) => (
        <Grid item xs={12} sm={8} md={4} key={index} display="flex" justifyContent="center">
          <BlankCard>
            <CardContent>
              <Stack direction={'column'} gap={2} alignItems="center">
                {isLoading ? (
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    width="100%"
                    height={160}
                  ></Skeleton>
                ) : (
                  <Avatar
                    alt={card.emp_name}
                    src={card.avatar}
                    sx={{ width: '80px', height: '80px' }}
                  />
                )}
                <Box textAlign={'center'}>
                  <Typography className="name" variant="h5">
                    {card.emp_name}
                  </Typography>
                  <Typography className="role" variant="caption">
                    {card.emp_role}
                  </Typography>
                  <Typography className="detail" variant="body2">
                    รหัสพนักงาน: {card.emp_code}
                  </Typography>
                  <Typography className="detail" variant="body2">
                    ชื่อเล่น: {card.emp_nickname}
                  </Typography>
                  <Typography className="detail" variant="body2">
                    ที่อยู่: {card.emp_address}
                  </Typography>
                  <Typography className="detail" variant="body2">
                    เบอร์โทร: {card.emp_tel}
                  </Typography>
                  <Typography className="detail" variant="body2">
                    แผนก: {card.emp_department}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
            <Divider />
            <Box
              p={2}
              py={1}
              textAlign={'center'}
              sx={{
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.05)' : 'grey.100',
              }}
            ></Box>
          </BlankCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default Profile;
