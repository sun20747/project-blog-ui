import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LayoutAdmin from "./LayoutAdmin";
import useCurruntAdmin from "@/lib/hooks/useCurrentAdmin";
import { Avatar, Chip, TablePagination } from "@mui/material";
import { red } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import date from "@/module/data";
import Swal from "sweetalert2";

function Row({ row, id, page, rowsPerPage, setBlogs }) {
  const { fetcherWithToken } = useCurruntAdmin();
  const [open, setOpen] = React.useState(false);
  // const [count, setCount] = React.useState(1);
  // const [sumCount, setSumCount] = React.useState(0);

  // React.useEffect(() => {
  //   console.log("C", page * rowsPerPage + (id + 1));
  //   console.log(setBlogs);
  // }, [setBlogs]);

  function getDataBlog() {
    fetcherWithToken("http://192.168.1.199/api/v1/blog/blogs", {
      method: "GET",
    })
      .then((json) => {
        // console.log(json);
        setBlogs(json);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function al_delete(id) {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetcherWithToken(
          `http://192.168.1.199/api/v1/admin/deleteblog/${id}`,
          {
            method: "DELETE",
          }
        )
          .then((json) => {
            //call function
            getDataBlog();
          })
          .catch((err) => {
            console.log(err);
          });
        Swal.fire("Deleted!", `User has been deleted`);
      }
    });
  }

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              bgcolor: "background.paper",
              borderRadius: 1,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </div>
            <div>{page * rowsPerPage + (id + 1)}</div>
          </Box>
        </TableCell>

        <TableCell component="th" scope="row">
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
            }}
          >
            <div>
              <Avatar
                alt="Remy Sharp"
                src={`${row.photo}`}
                sx={{ bgcolor: red[500] }}
                aria-label="recipe"
              />
            </div>
          </Box>
        </TableCell>
        <TableCell align="center">{row.title}</TableCell>
        <TableCell align="center">
          <Chip
            label={row.category}
            size="small"
            color="success"
            variant="outlined"
          />
        </TableCell>
        <TableCell align="center">{`${row.f_name} ${row.l_name}`}</TableCell>
        <TableCell align="center">
          <IconButton
            color="error"
            onClick={(e) => {
              al_delete(row.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Detail
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Create At</TableCell>
                    <TableCell>Update At</TableCell>
                    <TableCell>UserProfile</TableCell>
                    <TableCell align="center">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {date(row.created_at)}
                    </TableCell>
                    <TableCell>{date(row.updated_at)}</TableCell>
                    <TableCell>
                      <Avatar
                        alt="Remy Sharp"
                        src={`${row.user_profile_img}`}
                        sx={{ bgcolor: red[500] }}
                        aria-label="recipe"
                      />
                    </TableCell>
                    <TableCell align="center">
                      {row?.status ? (
                        <Chip label="active" size="small" color="success" />
                      ) : (
                        <Chip label="inactive" size="small" color="error" />
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
  const { fetcherWithToken, currenUser } = useCurruntAdmin();
  const [blogs, setBlogs] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  // const [count, setCount] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    fetcherWithToken("http://192.168.1.199/api/v1/blog/blogs", {
      method: "GET",
    })
      .then((json) => {
        setBlogs(json);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currenUser]);

  // React.useEffect(() => {
  //   console.log(blogs);
  // }, [blogs]);

  return (
    <LayoutAdmin>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell align="right">#ID</TableCell>
              <TableCell align="right">Photo</TableCell>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Auther</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => (
                <Row
                  key={row.id}
                  row={row}
                  id={i}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  setBlogs={setBlogs}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={blogs?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </LayoutAdmin>
  );
}
