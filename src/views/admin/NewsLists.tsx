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
} from '@mui/material';

import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

import PageContainer from 'src/components/container/PageContainer';

import ParentCard from 'src/components/shared/ParentCard';
import BlankCard from '../../components/shared/BlankCard';
import './style.css';
import { DeleteNews } from 'src/_Apis/DeletelNews';

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

interface NewsData {
  idnews: string;
  news_topic: string;
  news_description: string;
  news_picpath: string;
  news_createby: string;
  news_createdate: string;
  news_picture: string;
}

const NewsList = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState<NewsData[]>([]);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectDelete, setSelectDelete] = React.useState('' as string);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  React.useEffect(() => {
    fetch(apiUrl + 'get-news')
      .then((response) => response.json())
      .then((data) => setRows(data))
      .catch((error) => console.error('Error fetching news:', error));
  }, []);

  const handleChangePage = (newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteOpen = (newId: string) => {
    setSelectDelete(newId);
    setOpenDelete(true);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const handelDelete = async (newId: string) => {
    await DeleteNews(newId);
    window.location.reload();
  };

  return (
    <PageContainer title="ข่าวประชาสัมพันธ์" description="this is ข่าวประชาสัมพันธ์ page">
      <ParentCard title="ข่าวประชาสัมพันธ์">
        <BlankCard>
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
                    <Typography variant="h6">หัวข้อ</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">รายละเอียด</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">รูปภาพ</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">สร้างโดย</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">วันที่สร้าง</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">จัดการ</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : rows
                ).map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography variant="subtitle2">{index + 1}</Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Typography variant="subtitle2" fontWeight="600">
                          {row.news_topic}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6" fontWeight="400">
                        {row.news_description}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6" fontWeight="400">
                        <img
                          src={`data:image/webp;base64,${row.news_picture}`}
                          alt={row.news_topic}
                          className="img-news"
                        />
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">{row.news_createby}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">{row.news_createby}</Typography>
                    </TableCell>
                    <Dialog open={openDelete} onClose={handleDeleteClose}>
                      <DialogTitle>ลบข่าวประชาสัมพันธ์</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          ต้องการลบข่าวประชาสัมพันธ์นี้ รหัส: {selectDelete} ใช่หรือไม่?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          variant="contained"
                          onClick={() => handelDelete(row.idnews)}
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
                        color="error"
                        onClick={() => handleDeleteOpen(row.idnews)}
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

export default NewsList;
