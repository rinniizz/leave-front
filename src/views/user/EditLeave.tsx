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
import LoaderComponent from 'src/layouts/loading/Loader';

interface LeaveInfo {
  emp_code: string;
  emp_name: string;
  emp_tel: string;
  emp_role: string;
  emp_department: string;
  leave_userid: string;
  leave_cause: string;
  leave_remark: string;
  leave_startdate: string;
  leave_enddate: string;
  leave_createdatetime: string;
  leave_appuser: string;
  leave_appdatetime: string;
  leave_status: string;
}

const EditLeave = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const idleaveinfo = localStorage.getItem('idleaveinfo') || '';
  const [leave_cause, setLeave_cause] = React.useState('');
  const [leave_remark, setleave_remark] = React.useState('');
  const [leave_startdate, setleave_startdate] = React.useState<Date | null>(null);
  const [leave_enddate, setleave_enddate] = React.useState<Date | null>(null);
  const [leave_status, setleave_status] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [leaveInfo, setLeaveInfo] = React.useState<LeaveInfo | null>(null);

  React.useEffect(() => {
    const fetchLeaveInfo = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}leave-info/${idleaveinfo}`, {
          method: 'GET',
          headers: {
            accept: '*/*',
          },
        });

        if (!response.ok) {
          console.error('Server response was not ok');
          return;
        }

        const data = await response.json();
        const { leave_cause, leave_remark, leave_startdate, leave_enddate, leave_status } = data[0]; // Assuming data[0] contains the leave info you want to display

        setLeaveInfo(data[0]); // Set the entire fetched object to leaveInfo state

        setLeave_cause(leave_cause);
        setleave_remark(leave_remark);
        setleave_startdate(leave_startdate ? new Date(leave_startdate) : null); // Convert string date to Date object
        setleave_enddate(leave_enddate ? new Date(leave_enddate) : null); // Convert string date to Date object
        setleave_status(leave_status);
      } catch (error) {
        console.error('Error fetching leave info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveInfo();
  }, []);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    switch (name) {
      case 'leave_cause':
        setLeave_cause(value);
        break;
      case 'leave_status':
        setleave_status(value);
        break;

      default:
        break;
    }
  };

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    switch (name) {
      case 'setleave_remark':
        setleave_remark(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!leaveInfo) {
      console.error('Leave information not loaded');
      return;
    }

    const updatedLeaveInfo = {
      leave_userid: leaveInfo.leave_userid,
      leave_cause: leave_cause,
      leave_remark,
      leave_startdate: leave_startdate ? format(leave_startdate, 'yyyy-MM-dd') : '',
      leave_enddate: leave_enddate ? format(leave_enddate, 'yyyy-MM-dd') : '',
      leave_status,
    };

    console.log('Leave Info:', updatedLeaveInfo);

    try {
      const response = await axios.put(
        apiUrl + `update-leave-info/${idleaveinfo}`,
        updatedLeaveInfo,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error('Error updating leave:', error);
    }
  };

  if (loading) {
    return <LoaderComponent />;
  }

  return (
    <ParentCard title="แก้ไขคำขอ">
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
            id="setleave_remark"
            name="setleave_remark"
            value={leave_remark}
            onChange={handleTextFieldChange}
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
          <Button color="primary" variant="contained" type="submit">
            ตกลง
          </Button>
          <Button variant="contained" color="error" href="/user/dashboard">
            ยกเลิก
          </Button>
        </Stack>
      </form>
    </ParentCard>
  );
};

export default EditLeave;
