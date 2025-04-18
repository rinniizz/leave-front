// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import {
  Button,
  FormControl,
  InputAdornment,
  OutlinedInput,
  Stack,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import ParentCard from 'src/components/shared/ParentCard';
import { IconFaceId, IconId, IconPhone, IconUserCheck, IconUserEdit } from '@tabler/icons-react';
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

const UpdateStatusForm = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [leaveInfo, setLeaveInfo] = React.useState<LeaveInfo | null>(null);
  const idleaveinfo = localStorage.getItem('idleaveinfo') || '';
  const [status, setStatus] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus((event.target as HTMLInputElement).value);
  };

  React.useEffect(() => {
    setLoading(true);
    const fetchLeaveInfo = async () => {
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
      const {
        emp_code,
        emp_name,
        emp_tel,
        emp_role,
        emp_department,
        leave_userid,
        leave_cause,
        leave_remark,
        leave_startdate,
        leave_enddate,
        leave_createdatetime,
        leave_appuser,
        leave_appdatetime,
        leave_status,
      } = data[0];

      setLeaveInfo({
        emp_code,
        emp_name,
        emp_tel,
        emp_role,
        emp_department,
        leave_userid,
        leave_cause,
        leave_remark,
        leave_startdate,
        leave_enddate,
        leave_createdatetime,
        leave_appuser,
        leave_appdatetime,
        leave_status,
      });
    };

    fetchLeaveInfo();
    setLoading(false);
  }, []);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch(`${apiUrl}update-status-leave-info`, {
      method: 'PUT',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idleaveinfo: idleaveinfo,
        leave_status: status,
      }),
    });

    if (!response.ok) {
      console.error('Server response was not ok');
      return;
    }

    localStorage.removeItem('idleaveinfo');
    window.location.reload();
  };

  if (loading) {
    return <LoaderComponent />;
  }

  return (
    <ParentCard title="">
      <form onSubmit={handleFormSubmit}>
        <FormControl component="fieldset">
          <CustomFormLabel
            sx={{
              mt: 0,
            }}
            htmlFor="status"
          >
            การอนุมัติคำขอ
          </CustomFormLabel>{' '}
          <RadioGroup aria-label="status" name="status" value={status} onChange={handleChange} row>
            <FormControlLabel value="อนุมัติ" control={<Radio />} label="อนุมัติ" />
            <FormControlLabel value="ไม่อนุมัติ" control={<Radio />} label="ไม่อนุมัติ" />
          </RadioGroup>
        </FormControl>
        <Stack direction="row" mt={2} spacing={2} sx={{ justifyContent: 'end' }}>
          <Button color="primary" variant="contained" type="submit">
            ตกลง
          </Button>
          <Button variant="contained" color="error" href="/admin/dashboard">
            ยกเลิก
          </Button>
        </Stack>
        {/* รหัสพนักงาน */}
        <FormControl fullWidth>
          <CustomFormLabel
            sx={{
              mt: 0,
            }}
            htmlFor="emp_code"
          >
            รหัสพนักงาน
          </CustomFormLabel>
          <OutlinedInput
            startAdornment={
              <InputAdornment position="start">
                <IconId width={20} />
              </InputAdornment>
            }
            value={leaveInfo?.emp_code}
            name="emp_code"
            id="emp_code"
            placeholder="รหัสพนักงาน"
            fullWidth
            disabled
          />
        </FormControl>
        {/* ชื่อ-นามกุล */}
        <FormControl fullWidth>
          <CustomFormLabel
            sx={{
              mt: 2,
            }}
            htmlFor="emp_name"
          >
            ขื่อ-นามสกุล
          </CustomFormLabel>
          <OutlinedInput
            startAdornment={
              <InputAdornment position="start">
                <IconFaceId width={20} />
              </InputAdornment>
            }
            value={leaveInfo?.emp_name}
            name="emp_name"
            id="emp_name"
            placeholder="ชื่อ-นามสกุล"
            fullWidth
            disabled
          />
        </FormControl>

        {/* เบอร์โทร */}
        <FormControl fullWidth>
          <CustomFormLabel
            sx={{
              mt: 2,
            }}
            htmlFor="emp_tel"
          >
            หมายเลขโทรศัพท์
          </CustomFormLabel>
          <OutlinedInput
            startAdornment={
              <InputAdornment position="start">
                <IconPhone width={20} />
              </InputAdornment>
            }
            value={leaveInfo?.emp_tel}
            name="emp_tel"
            id="emp_tel"
            placeholder="หมายเลขโทรศัพท์"
            fullWidth
            disabled
          />
        </FormControl>

        {/* ตำแหน่ง */}
        <FormControl fullWidth>
          <CustomFormLabel
            sx={{
              mt: 2,
            }}
            htmlFor="emp_role"
          >
            ตำแหน่ง
          </CustomFormLabel>
          <OutlinedInput
            startAdornment={
              <InputAdornment position="start">
                <IconUserCheck width={20} />
              </InputAdornment>
            }
            value={leaveInfo?.emp_role}
            name="emp_role"
            id="emp_role"
            placeholder="ตำแหน่ง"
            fullWidth
            disabled
          />
        </FormControl>

        {/* แผนก */}
        <FormControl fullWidth>
          <CustomFormLabel
            sx={{
              mt: 2,
            }}
            htmlFor="emp_department"
          >
            แผนก
          </CustomFormLabel>
          <OutlinedInput
            startAdornment={
              <InputAdornment position="start">
                <IconUserEdit width={20} />
              </InputAdornment>
            }
            value={leaveInfo?.emp_department}
            name="emp_department"
            id="emp_department"
            placeholder="แผนก"
            fullWidth
            disabled
          />
        </FormControl>
      </form>
    </ParentCard>
  );
};

export default UpdateStatusForm;
