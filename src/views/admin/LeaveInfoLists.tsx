// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as React from 'react';
import './style.css';
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
  Chip,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { fetchPrintPdf } from 'src/_Apis/PrintPDF';
import PageContainer from 'src/components/container/PageContainer';

import ParentCard from 'src/components/shared/ParentCard';
import BlankCard from '../../components/shared/BlankCard';
import { DeleteLeave } from 'src/_Apis/DeleteLeave';
import EditLeave from './EditLeave';
import UpdateStatusForm from './UpdateStatusForm';
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

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
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
  idleaveinfo: string;
  leave_cause: string;
  leave_remark: string;
  leave_startdate: string;
  leave_enddate: string;
  leave_createdatetime: string;
  leave_appuser: string;
  leave_appdatetime: string;
  leave_status: string;
}

const LeaveInfoLists = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState<UserData[]>([]);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [searchQuery, setSearchQuery] = React.useState('');
  const [open, setOpen] = React.useState(false);
  // @ts-ignore
  const [status, setStatus] = React.useState('');
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectDelete, setSelectDelete] = React.useState('');
  const [openEditLeave, setOpenEditLeave] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const handleClickOpen = (status: string, idleaveinfo: string) => {
    localStorage.setItem('idleaveinfo', idleaveinfo);
    setStatus(status);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  React.useEffect(() => {
    setLoading(true);
    fetch(apiUrl + 'get-leave-info')
      .then((response) => response.json())
      .then((data) => {
        setRows(data.sort((a: UserData, b: UserData) => (a.emp_name < b.emp_name ? -1 : 1)));
        setLoading(false);
      })
      .catch((error) => console.error('Error:', error));
  }, [apiUrl]);

  // @ts-ignore
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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

  const filteredRows = rows.filter(
    (row) =>
      row.emp_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.emp_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.emp_nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.emp_department.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handelPrintPDF = () => {
    fetchPrintPdf();
  };

  const handleDeleteOpen = (LeaveId: string) => {
    setSelectDelete(LeaveId);
    setOpenDelete(true);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const handelDelete = async (emp_code: string, leave_id: string) => {
    console.log(emp_code);
    console.log(leave_id);
    await DeleteLeave(leave_id);
  };

  const handelEditLeave = (idleaveinfo: string, emp_code: string) => {
    localStorage.setItem('emp_code', emp_code);
    localStorage.setItem('idleaveinfo', idleaveinfo);
    setOpenEditLeave(true);
  };

  const handelEditLeaveClose = () => {
    setOpenEditLeave(false);
  };

  if (loading) {
    return <LoaderComponent />;
  }

  return (
    <PageContainer title="Employee Lists" description="this is dashboard page">
      <ParentCard title="คำขออนุมัติการลาพัก">
        <BlankCard>
          <Box display="flex" justifyContent="flex-end" m={2}>
            <Button variant="contained" color="primary" onClick={handelPrintPDF}>
              Print Excel
            </Button>
          </Box>
          <Box display="flex" justifyContent="flex-start" marginBottom={2} m={2}>
            <TextField
              label="Search"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
              fullWidth
              margin="normal"
            />
          </Box>
          <TableContainer>
            <Table aria-label="custom pagination table" sx={{ whiteSpace: 'nowrap' }}>
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
                    <Typography variant="h6">ชื่อเล่น</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">แผนก</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">วันที่ส่งใบลา</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">การลา</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">วันที่ลา</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">เหตุผล</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">สถานะ</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">ผู้อนุมัติ</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">จัดการ</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : filteredRows
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
                        {highlightSearchTerm(row.emp_nickname, searchQuery)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">{row.emp_department}</Typography>
                    </TableCell>
                    <TableCell>
                      {new Date(row.leave_createdatetime).toLocaleDateString('th-TH')}
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">{row.leave_cause}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {new Date(row.leave_startdate).toLocaleDateString('th-TH')}-{' '}
                        {new Date(row.leave_enddate).toLocaleDateString('th-TH')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">{row.leave_remark}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        color={
                          row.leave_status === 'อนุมัติ'
                            ? 'success'
                            : row.leave_status === 'ไม่อนุมัติ'
                            ? 'warning'
                            : row.leave_status === 'รออนุมัติ'
                            ? 'error'
                            : 'secondary'
                        }
                        sx={{
                          borderRadius: '5px',
                          fontSize: '15px',
                          padding: '10px',
                          paddingBlock: '5px',
                          transition: 'transform 0.3s ease-in-out', // Add transition effect
                          '&:hover': {
                            transform: 'scale(1.1)', // Scale up the Chip on hover
                          },
                        }}
                        size="medium"
                        label={row.leave_status}
                        onClick={() => handleClickOpen(row.leave_status, row.idleaveinfo)}
                      />
                    </TableCell>
                    <Dialog open={open} onClose={handleClose}>
                      <DialogTitle>ตรวจสอบคำขอ</DialogTitle>
                      <DialogContent>
                        <UpdateStatusForm />
                      </DialogContent>
                    </Dialog>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {highlightSearchTerm(row.leave_appuser, searchQuery)}
                      </Typography>
                    </TableCell>
                    <Dialog open={openEditLeave} onClose={handelEditLeaveClose}>
                      <DialogTitle>แก้ไขข้อมูลการลา</DialogTitle>
                      <DialogContent>
                        <Box mt={2} p={3}>
                          <EditLeave />
                        </Box>
                      </DialogContent>
                    </Dialog>
                    <Dialog open={openDelete} onClose={handleDeleteClose}>
                      <DialogTitle>ลบคำขอนี้</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          ต้องการลบคำขอนี้ {selectDelete} ใช่หรือไม่?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          variant="contained"
                          onClick={() => handelDelete(row.emp_code, row.idleaveinfo)}
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
                        onClick={() => handelEditLeave(row.idleaveinfo, row.idemployees)}
                        sx={{ marginRight: '10px' }}
                      >
                        แก้ไข
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteOpen(row.emp_code)}
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
                    count={filteredRows.length}
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

export default LeaveInfoLists;
