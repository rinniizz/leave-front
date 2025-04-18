// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Typography,
  TableHead,
  Box,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  TableFooter,
  IconButton,
  TableContainer,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import ParentCard from 'src/components/shared/ParentCard';
import BlankCard from '../../components/shared/BlankCard';
import EditEmpForm from './EditEmp';
import { DeleteEmp } from 'src/_Apis/DeleteUser';
import CreateEmpUser from './CreateEmp';
import './style.css';
import LoaderComponent from 'src/layouts/loading/Loader';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: any) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: any) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: any) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: any) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

interface UserData {
  idemployees: string;
  emp_code: string;
  emp_name: string;
  emp_password: string;
  emp_nickname: string;
  emp_address: string;
  emp_tel: string;
  emp_role: string;
  emp_department: string;
}

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '/',
    title: 'Admin',
  },
  {
    title: 'รายชื่อพนักงาน',
  },
];

const EmployeeLists = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState<UserData[]>([]);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectDelete, setSelectDelete] = React.useState('');
  const [selectIndex, setSelectIndex] = React.useState('');
  const [openCreate, setOpenCreate] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  React.useEffect(() => {
    setLoading(true);
    fetch(apiUrl + 'fetch-all-user')
      .then((response) => response.json())
      .then((data) => {
        setRows(data.sort((a: UserData, b: UserData) => (a.emp_name < b.emp_name ? -1 : 1)));
        setLoading(false);
      })
      .catch((error) => console.error('Error:', error));
  }, [apiUrl]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    if (event !== null) {
      setPage(newPage);
    }
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickOpen = (empCode: string) => {
    localStorage.setItem('emp_code', empCode);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteOpen = (empId: string, indexId: string) => {
    setSelectDelete(empId);
    setSelectIndex(indexId);
    setOpenDelete(true);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const handelDelete = async (empId: string) => {
    await DeleteEmp(empId);
    window.location.reload();
  };

  const handelCreateEmp = () => {
    setOpenCreate(true);
  };

  const handelCreateEmpClose = () => {
    setOpenCreate(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const highlightSearchTerm = (text: string | null | undefined, searchTerm: string) => {
    if (!text) return '';

    if (!searchTerm) return text;

    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} className="highlight">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  if (loading) {
    return <LoaderComponent />;
  }

  return (
    <PageContainer title="Employee Lists" description="this is dashboard page">
      {/* breadcrumb */}
      <Breadcrumb title="รายชื่อพนักงาน" items={BCrumb} />
      {/* end breadcrumb */}
      <ParentCard title="พนักงาน">
        <BlankCard>
          <Dialog open={openCreate} onClose={handelCreateEmpClose}>
            <DialogContent>
              <Box mt={2} p={3}>
                <CreateEmpUser />
              </Box>
            </DialogContent>
          </Dialog>
          <Box display="flex" justifyContent="flex-start" marginBottom={2} m={2}>
            <Button variant="contained" color="primary" onClick={handelCreateEmp}>
              เพิ่ม
            </Button>
            <TextField
              label="ค้นหา"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{ marginLeft: 2 }}
            />
          </Box>
          <TableContainer>
            <Table
              aria-label="custom pagination table"
              sx={{
                whiteSpace: 'nowrap',
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6">ลำดับ</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">รหัสพนักงาน</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">ชื่อ-นามสกุล</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">รหัสผ่าน</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">ชื่อเล่น</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">ตำแหน่ง</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">แผนก</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">หมายเลขโทรศัพท์</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">ที่อยู่</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">จัดการ</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? rows
                      .filter(
                        (row) =>
                          row.emp_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          row.emp_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          row.emp_nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          row.emp_role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          row.emp_department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          row.emp_tel.toLowerCase().includes(searchQuery.toLowerCase()),
                      )
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : rows
                ).map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography variant="subtitle2">{index + 1}</Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Typography variant="subtitle2" fontWeight="600">
                          {highlightSearchTerm(row.emp_code, searchQuery)}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6" fontWeight="400">
                        {highlightSearchTerm(row.emp_name, searchQuery)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6" fontWeight="400">
                        {highlightSearchTerm(row.emp_password, searchQuery)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {highlightSearchTerm(row.emp_nickname, searchQuery)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {highlightSearchTerm(row.emp_role, searchQuery)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {highlightSearchTerm(row.emp_department, searchQuery)}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle2">
                        {highlightSearchTerm(row.emp_tel, searchQuery)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {highlightSearchTerm(row.emp_address, searchQuery)}
                      </Typography>
                    </TableCell>
                    <Dialog open={open} onClose={handleClose}>
                      <DialogTitle>แก้ไขข้อมูลพนักงาน</DialogTitle>
                      <DialogContent>
                        <Box mt={2} p={3}>
                          <EditEmpForm />
                        </Box>
                      </DialogContent>
                    </Dialog>
                    <Dialog open={openDelete} onClose={handleDeleteClose}>
                      <DialogTitle>ลบรายชื่อพนักงาน</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          ต้องการลบพนักงานนี้ รหัส: {selectDelete} ใช่หรือไม่?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          variant="contained"
                          onClick={() => handelDelete(selectIndex)}
                          color="primary"
                        >
                          ตกลง
                        </Button>
                        <Button variant="contained" onClick={handleDeleteClose} color="error">
                          ยกเลิก
                        </Button>
                      </DialogActions>
                    </Dialog>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleClickOpen(row.emp_code)}
                        sx={{ marginRight: '10px' }}
                      >
                        แก้ไข
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteOpen(row.emp_code, row.idemployees)}
                      >
                        ลบ
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={6}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </BlankCard>
      </ParentCard>
    </PageContainer>
  );
};

export default EmployeeLists;
