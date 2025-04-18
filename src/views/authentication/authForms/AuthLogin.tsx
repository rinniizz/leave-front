// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import 'src/views/admin/style.css';
import { AuthLogin as AuthLoginAPI } from 'src/_Apis/Auth';
import { useNavigate } from 'react-router-dom';

import { loginType } from 'src/types/auth/auth';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [openDialog, setOpenDialog] = React.useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await AuthLoginAPI(username, password);
      console.log(response);
      localStorage.setItem('empId', response.emp_code);
      localStorage.setItem('empName', response.emp_name);
      localStorage.setItem('empRole', response.emp_role);

      if (response.emp_role === 'admin') {
        navigate('/admin/dashboard');
      } else if (response.emp_role === 'user') {
        navigate('/user/dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Authentication Fail.'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <span className="highlight-text">รหัสพนักงาน</span> หรือ
            <span className="highlight-text">รหัสผ่าน</span> ไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleCloseDialog}>
            ปิด
          </Button>
        </DialogActions>
      </Dialog>

      {/* <AuthSocialButtons title="Sign in with" /> */}
      <form onSubmit={handleLogin}>
        <Stack>
          <Box>
            <CustomFormLabel htmlFor="username">รหัสพนักงาน</CustomFormLabel>
            <CustomTextField
              id="username"
              variant="outlined"
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              fullWidth
            />
          </Box>
          <Box>
            <CustomFormLabel htmlFor="password">รหัสผ่าน</CustomFormLabel>
            <CustomTextField
              id="password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              fullWidth
            />
          </Box>
        </Stack>
        <Box mt={3}>
          <Button color="primary" variant="contained" size="large" fullWidth type="submit">
            Sign In
          </Button>
        </Box>
        {subtitle}
      </form>
    </>
  );
};

export default AuthLogin;
