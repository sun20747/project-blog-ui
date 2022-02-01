import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import useCurrentUser from "@/lib/hooks/useCurrentUser";
import { setDarkMode } from "@/lib/store/session";
import { Avatar, Collapse } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import Popover from "@mui/material/Popover";
import PersonIcon from '@mui/icons-material/Person';

// switch code
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));
// switch code

const Spacer = styled("div")(({ theme }) => ({
  flexGrow: 1,
}));

export default function ButtonAppBar() {
  const [open, setOpen] = useState(true);
  const [drawer, setDrawer] = useState(false);
  const darkMode = useSelector((state) => state.session.darkMode);
  const dispatch = useDispatch();
  const { logout, currenUser } = useCurrentUser();

  // useEffect(() => {
  //   // blogs.map((blog)=>{
  //   console.log(currenUser);
  //   // });
  // }, [currenUser]);

  const handleClick = () => {
    setOpen(!open);
  };

  const toggleDarkMode = () => {
    dispatch(setDarkMode(!darkMode));
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick_1 = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose_1 = () => {
    setAnchorEl(null);
  };
  const open_1 = Boolean(anchorEl);
  const id = open_1 ? "simple-popover" : undefined;

  function al() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Sign out",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Success!", "Your log out successfully.", "success");
      }
    });
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" sx={{ paddingX: "15px", paddingY: "3px" }}>
          <Toolbar variant="dense">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => {
                setDrawer(true);
              }}
            >
              <MenuIcon />
            </IconButton>

            <Link passHref={true} href="/">
              <Button color="inherit" variant="text">
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                  204 No Content
                </Typography>
              </Button>
            </Link>

            {/* การเว้นช่องว่างส่วนกลาง */}
            <Spacer></Spacer>

            <FormControlLabel
              control={<MaterialUISwitch sx={{ m: 1 }} checked={darkMode} />}
              label="Dark"
              labelPlacement="end"
              onChange={toggleDarkMode}
            ></FormControlLabel>
            {/* -------------------------------------------------------------------- */}

            <div>
              <Button aria-describedby={id} onClick={handleClick_1}>
                <Avatar alt="Remy Sharp" src={currenUser == null ? null : `${currenUser?.photo}`} />
              </Button>
              <Popover
                id={id}
                open={open_1}
                anchorEl={anchorEl}
                onClose={handleClose_1}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <List>
                  <ListItem>
                    <ListItemText>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        {currenUser?.email}
                      </Typography>
                      <Typography
                        variant="button" display="block" gutterBottom
                      >
                        {currenUser?.f_name}
                        {currenUser?.l_name}
                      </Typography>
                      <hr />
                    </ListItemText>
                  </ListItem>

                  <ListItem disablePadding>
                    <Link passHref={true} href="/auth/profile">
                      <ListItemButton>
                        <ListItemIcon>
                          <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary="profile" />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                  
                  <ListItem disablePadding onClick={logout}>
                    <Link passHref={true} href="/login">
                      <ListItemButton>
                        <ListItemIcon>
                          <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="logout" />
                      </ListItemButton>
                    </Link>
                  </ListItem>

                </List>
              </Popover>
            </div>
          </Toolbar>
        </AppBar>
      </Box>

      <Drawer
        anchor="left"
        open={drawer}
        onClose={() => {
          setDrawer(false);
        }}
      >
        <Box
          sx={{
            width: "100%",
            minWidth: 200,
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
        >
          <nav aria-label="main mailbox folders">
            <List>
              <ListItem disablePadding>
                <Link passHref={true} href="/">
                  <ListItemButton>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Index" />
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link passHref={true} href="/about">
                  <ListItemButton>
                    <ListItemIcon>
                      <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary="About" />
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem disablePadding onClick={logout}>
                <Link passHref={true} href="/login">
                  <ListItemButton>
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="logout" />
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link passHref={true} href="/empty">
                  <ListItemButton>
                    <ListItemText primary="Empty" />
                  </ListItemButton>
                </Link>
              </ListItem>
            </List>
          </nav>
        </Box>
      </Drawer>
    </>
  );
}

{
  /* <ListItem disablePadding>
                <Link passHref={true} href="/login">
                  <Button color="inherit" onClick={logout}>
                    <ListItemButton>Logout</ListItemButton>
                  </Button>
                </Link>
              </ListItem> */
}
