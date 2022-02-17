import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Typography, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import useCurruntUser from "@/lib/hooks/useCurrentUser";

function al() {
  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: "success",
    title: "Edit is successfully",
  });
}

export default function ResponsiveDialog() {
  const { fetcherWithToken } = useCurruntUser();
  const user = useSelector((state) => state.session.user);
  const [open, setOpen] = React.useState(false);
  const [f_name, setF_name] = useState();
  const [l_name, setL_name] = useState();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const body = JSON.stringify({
      user: {
        f_name,
        l_name,
      },
    });
    fetcherWithToken("http://127.0.0.1:3000/api/v1/user/update", {
      method: "PUT",
      body,
    })
      .then((res) => {
        setOpen(false);
        al();
        setTimeout(() => {
          // location.reload()
        }, 3000);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    setF_name(user?.f_name), setL_name(user?.l_name);
  }, [user]);

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <EditIcon />
        <Typography>Edit name</Typography>
      </IconButton>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Edit name account ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="h5">
              First name:
              <TextField
                size="small"
                onChange={(e) => setF_name(e.target.value)}
                // placeholder={user?.f_name}
                value={f_name}
              ></TextField>
            </Typography>
            <br />
            <Typography variant="h5">
              Last name:
              <TextField
                size="small"
                onChange={(e) => {
                  setL_name(e.target.value);
                }}
                value={l_name}
                // placeholder={user?.l_name}
              ></TextField>
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Disagree
          </Button>
          <Button onClick={handleSubmit} autoFocus>
            Success
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
