import LayoutAdmin from "./LayoutAdmin";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import useCurruntAdmin from "@/lib/hooks/useCurrentAdmin";
import { Avatar, Chip, IconButton } from "@mui/material";
import { red } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import Swal from "sweetalert2";

export default function userwaitingconfirmed() {
  const { fetcherWithToken, currenUser } = useCurruntAdmin();
  const [users, setUsers] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  React.useEffect(() => {
    fetcherWithToken("http://192.168.1.199/api/v1/admin/show_users_waiting", {
      method: "GET",
    })
      .then((json) => {
        setUsers(json.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currenUser]);

  function getDataUser() {
    fetcherWithToken("http://192.168.1.199/api/v1/admin/show_users_waiting", {
      method: "GET",
    })
      .then((json) => {
        setUsers(json.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function al_delete(id, f_name, l_name) {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to not confirm ${f_name} ${l_name} !`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetcherWithToken(
          `http://192.168.1.199/api/v1/admin/deleteuserwarining/${id}`,
          {
            method: "DELETE",
          }
        )
          .then((json) => {
            //call function
            getDataUser();
          })
          .catch((err) => {
            console.log(err);
          });
        Swal.fire("Deleted!", `User has been deleted`);
      }
    });
  }
  function al_confirm(id) {
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 2000,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "success",
      title: "Confirm in successfully",
    }).then(() => {
      fetcherWithToken(
        `http://192.168.1.199/api/v1/admin/confirmeduser/${id}`,
        {
          method: "POST",
        }
      )
        .then((json) => {
          //call function
          getDataUser();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    console.log(users);
  }, [users]);

  const columns = [
    { id: "id", label: "#ID", maxWidth: 50 },
    { id: "profile", label: "Profile", align: "left", minWidth: 170 },
    {
      id: "email",
      label: "Email",
      minWidth: 170,
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    },
    { id: "name", label: "Name", minWidth: 100 },

    {
      id: "status",
      label: "status",
      minWidth: 170,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "action",
      label: "Action",
      minWidth: 170,
      align: "center",
      format: (value) => value.toFixed(2),
    },
  ];

  return (
    <LayoutAdmin>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, i) => {
                  return (
                    <TableRow
                      hover
                      // onClick={(e) => console.log("aaa")}
                      role="checkbox"
                      tabIndex={-1}
                      key={user.id}
                    >
                      <TableCell sx={{ minWidth: 170 }}> {page * rowsPerPage + i + 1}</TableCell>
                      <TableCell sx={{ minWidth: 170 }} align="center">
                        <Avatar
                          alt="Remy Sharp"
                          src={`${user.user_profile_img}`}
                          sx={{ bgcolor: red[500] }}
                          aria-label="recipe"
                        />
                      </TableCell>
                      <TableCell sx={{ minWidth: 170 }}>{user.email}</TableCell>
                      <TableCell
                        sx={{ minWidth: 100 }}
                        align="left"
                      >{`${user.f_name} ${user.l_name}`}</TableCell>
                      <TableCell sx={{ minWidth: 170 }} align="center">
                        {user?.status ? (
                          <Chip label="active" size="small" color="success" />
                        ) : (
                          <Chip label="warning" size="small" color="warning" />
                        )}
                      </TableCell>
                      <TableCell sx={{ minWidth: 170 }} align="center">
                        <IconButton
                          color="success"
                          onClick={(e) => {
                            al_confirm(`${user.id}`);
                          }}
                        >
                          <CheckIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={(e) => {
                            al_delete(user.id, user.f_name, user.l_name);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={users?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </LayoutAdmin>
  );
}
