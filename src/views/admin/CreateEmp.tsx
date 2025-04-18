// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { ReactNode } from 'react';
import {
  Button,
  FormControl,
  InputAdornment,
  OutlinedInput,
  Stack,
  MenuItem,
  Select,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import ParentCard from 'src/components/shared/ParentCard';
import {
  IconAddressBook,
  IconCardboards,
  IconLock,
  IconMail,
  IconPhone,
  IconUserCheck,
  IconUserEdit,
} from '@tabler/icons-react';

const CreateEmpUser = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [emp_code, setEmp_code] = React.useState('');
  const [emp_name, setEmp_name] = React.useState('');
  const [emp_password, setEmp_password] = React.useState('');
  const [emp_nickname, setEmp_nickname] = React.useState('');
  const [emp_address, setEmp_address] = React.useState('');
  const [emp_tel, setEmp_tel] = React.useState('');
  const [emp_role, setEmp_role] = React.useState('');
  const [emp_department, setEmp_department] = React.useState('');

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>,
  ) => {
    const { name, value } = event.target;
    switch (name) {
      case 'emp_code':
        setEmp_code(value as string);
        break;
      case 'emp_name':
        setEmp_name(value as string);
        break;
      case 'emp_password':
        setEmp_password(value as string);
        break;
      case 'emp_nickname':
        setEmp_nickname(value as string);
        break;
      case 'emp_address':
        setEmp_address(value as string);
        break;
      case 'emp_tel':
        setEmp_tel(value as string);
        break;
      case 'emp_department':
        setEmp_department(value as string);
        break;
      default:
        break;
    }
  };

  const handleSelectChange = (
    event: SelectChangeEvent<string>,
    // @ts-ignore
    child: ReactNode, // This parameter is not used in the function body, but added to match the expected type signature
  ) => {
    const { name, value } = event.target;
    if (name) {
      switch (name) {
        case 'emp_role':
          setEmp_role(value); // value is already a string, no need to cast
          break;
        default:
          break;
      }
    }
  };
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch(apiUrl + 'create-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emp_code,
        emp_name,
        emp_password,
        emp_nickname,
        emp_address,
        emp_tel,
        emp_role,
        emp_department,
      }),
    });

    if (!response.ok) {
      console.error('Server response was not ok');
      return;
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
      try {
        const data = await response.json();
        console.log(data);
        window.location.reload();
      } catch (error) {
        console.error('Failed to parse response as JSON', error);
      }
    } else {
      const rawResponse = await response.text();
      console.log('Raw response from server:', rawResponse);
      window.location.reload();
    }
  };

  return (
    <ParentCard title="เพิ่มข้อมูลพนักงานใหม่">
      <form onSubmit={handleSubmit}>
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
                <IconMail width={20} />
              </InputAdornment>
            }
            onChange={handleChange}
            value={emp_code}
            name="emp_code"
            id="emp_code"
            placeholder="รหัสพนักงาน"
            fullWidth
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
                <IconCardboards width={20} />
              </InputAdornment>
            }
            onChange={handleChange}
            value={emp_name}
            name="emp_name"
            id="emp_name"
            placeholder="ชื่อ-นามสกุล"
            fullWidth
          />
        </FormControl>
        {/* รหัสผ่าน */}
        <FormControl fullWidth>
          <CustomFormLabel htmlFor="emp_password">รหัสผ่าน</CustomFormLabel>
          <OutlinedInput
            startAdornment={
              <InputAdornment position="start">
                <IconLock width={20} />
              </InputAdornment>
            }
            onChange={handleChange}
            value={emp_password}
            name="emp_password"
            id="emp_password"
            placeholder="รหัสผ่าน"
            fullWidth
          />
        </FormControl>
        {/* ชื่อเล่น */}
        <FormControl fullWidth>
          <CustomFormLabel
            sx={{
              mt: 2,
            }}
            htmlFor="emp_nickname"
          >
            ชื่อเล่น
          </CustomFormLabel>
          <OutlinedInput
            startAdornment={
              <InputAdornment position="start">
                <IconCardboards width={20} />
              </InputAdornment>
            }
            onChange={handleChange}
            value={emp_nickname}
            name="emp_nickname"
            id="emp_nickname"
            placeholder="ชื่อเล่น"
            fullWidth
          />
        </FormControl>

        {/* ที่อยู่ */}
        <FormControl fullWidth>
          <CustomFormLabel
            sx={{
              mt: 2,
            }}
            htmlFor="emp_address"
          >
            ที่อยู่
          </CustomFormLabel>
          <OutlinedInput
            startAdornment={
              <InputAdornment position="start">
                <IconAddressBook width={20} />
              </InputAdornment>
            }
            onChange={handleChange}
            value={emp_address}
            name="emp_address"
            id="emp_address"
            placeholder="ที่อยู่"
            fullWidth
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
            onChange={handleChange}
            value={emp_tel}
            name="emp_tel"
            id="emp_tel"
            placeholder="หมายเลขโทรศัพท์"
            fullWidth
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
          <Select
            startAdornment={
              <InputAdornment position="start">
                <IconUserCheck width={20} />
              </InputAdornment>
            }
            onChange={handleSelectChange}
            value={emp_role}
            name="emp_role"
            id="emp_role"
            fullWidth
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
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
            onChange={handleChange}
            value={emp_department}
            name="emp_department"
            id="emp_department"
            placeholder="แผนก"
            fullWidth
          />
        </FormControl>
        <Stack direction="row" mt={2} spacing={2} sx={{ justifyContent: 'end' }}>
          <Button color="primary" variant="contained" type="submit">
            ตกลง
          </Button>
          <Button variant="contained" color="error" href="/admin/emp-lists">
            ยกเลิก
          </Button>
        </Stack>
      </form>
    </ParentCard>
  );
};

export default CreateEmpUser;
