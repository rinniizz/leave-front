// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import {
  Button,
  FormControl,
  InputAdornment,
  Stack,
  TextField,
  SelectChangeEvent,
  Select,
  MenuItem,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { th } from 'date-fns/locale';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import ParentCard from 'src/components/shared/ParentCard';
import { IconCardboards } from '@tabler/icons-react';
import axios from 'axios';
import { format } from 'date-fns';

const NewLeave = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [leave_userid, setLeave_userid] = React.useState('');
  const [leave_cause, setLeave_cause] = React.useState('');
  const [leave_remark, setleave_remark] = React.useState('');
  const [leave_startdate, setleave_startdate] = React.useState<Date | null>(null);
  const [leave_enddate, setleave_enddate] = React.useState<Date | null>(null);
  const [leave_createdatetime, setleave_createdatetime] = React.useState('');
  const [leave_status, setleave_status] = React.useState('');

  React.useEffect(() => {
    setleave_createdatetime(format(new Date(), 'yyyy-MM-dd HH:mm:ss'));
    setLeave_userid(localStorage.getItem('empId') || '');
    setleave_status('รออนุมัติ');
  }, []);

  const handleChange = (
    event: SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const name = event.target.name;
    const value = 'value' in event.target ? event.target.value : '';

    switch (name) {
      case 'leave_cause':
        setLeave_cause(value);
        break;
      case 'leave_status':
        setleave_status(value);
        break;
      case 'leave_remark':
        setleave_remark(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const leaveInfo = {
      leave_userid,
      leave_cause: leave_cause,
      leave_remark,
      leave_startdate: leave_startdate ? format(leave_startdate, 'yyyy-MM-dd') : '',
      leave_enddate: leave_enddate ? format(leave_enddate, 'yyyy-MM-dd') : '',
      leave_createdatetime,
      leave_status,
    };

    console.log('Leave Info:', leaveInfo); // Log leave info to inspect dates

    try {
      const response = await axios.post(apiUrl + 'create-leave-info', leaveInfo, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error('Error creating leave:', error);
    }
  };

  return (
    <ParentCard title="เพิ่มคำขอใหม่">
      <form onSubmit={handleSubmit}>
        {/* การลา */}
        <FormControl fullWidth>
          <CustomFormLabel
            sx={{
              mt: 2,
            }}
            htmlFor="leave_cause"
          >
            การลา
          </CustomFormLabel>
          <Select
            startAdornment={
              <InputAdornment position="start">
                <IconCardboards width={20} />
              </InputAdornment>
            }
            onChange={handleChange}
            value={leave_cause}
            name="leave_cause"
            id="leave_cause"
            placeholder="การลา"
            fullWidth
          >
            <MenuItem value="ลาพักร้อน">ลาพักร้อน</MenuItem>
            <MenuItem value="ลากิจ">ลากิจ</MenuItem>
            <MenuItem value="ลาป่วย">ลาป่วย</MenuItem>
            <MenuItem value="ลาอื่น ๆ">ลาอื่น ๆ</MenuItem>
          </Select>
          <TextField
            sx={{ mt: 2 }}
            fullWidth
            id="leave_remark"
            name="leave_remark"
            value={leave_remark}
            onChange={handleChange}
            placeholder="เหตุผลในการลา"
          />
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={th}>
          <FormControl fullWidth>
            <CustomFormLabel
              sx={{
                mt: 2,
              }}
              htmlFor="leave_startdate"
            >
              วันที่เริ่มลา
            </CustomFormLabel>
            <DatePicker
              value={leave_startdate}
              onChange={(newValue) => setleave_startdate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </FormControl>
          <FormControl fullWidth>
            <CustomFormLabel
              sx={{
                mt: 2,
              }}
              htmlFor="leave_enddate"
            >
              ลาถึงวันที่
            </CustomFormLabel>
            <DatePicker
              value={leave_enddate}
              onChange={(newValue) => setleave_enddate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </FormControl>
        </LocalizationProvider>
        <Stack direction="row" mt={2} spacing={2} sx={{ justifyContent: 'end' }}>
          <Button variant="contained" color="error" href="/user/dashboard">
            ยกเลิก
          </Button>
          <Button color="primary" variant="contained" type="submit">
            ตกลง
          </Button>
        </Stack>
      </form>
    </ParentCard>
  );
};

export default NewLeave;
