import React, { useEffect } from "react";
import { red } from "@mui/material/colors";
import {
  Card,
  CardHeader,
  CardActionArea,
  Grid,
  IconButton,
  Typography,
  Avatar,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Menu,
  Box,
  MenuItem,
  Chip,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import taskDate from "@/module/taskdate";
import { useRouter } from "next/router";
import useCurruntUser from "@/lib/hooks/useCurrentUser";
import EditPost from "../../pages/auth/editpost";
import Image from "next/image";
import url from "@/fetch.config";

export default function Myblog(props) {
  const { currenUser, fetcherWithToken } = useCurruntUser();
  const { f_name = null, user_profile_img } = currenUser;
  const { id, photo, created_at,title, content,category, ...data } = props.blog;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deletePost = () => {
    fetcherWithToken(`${url}/api/v1/blog/destroy/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // window.location.reload();
    setAnchorEl(null);
  };
  // .sort((a,b)=> new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  const router = useRouter();
  const toDetails = () => {
    router.push(`/details/${id}`, null, { shallow: true });
  };

  // React.useEffect(() => {
  //   console.log(props);
  // }, [props]);

  return (
    <Grid item xs={12} sm={6} lg={6}>
      <Card elevation={2} sx={{ maxHeight: 520 }}>
        <CardHeader
          avatar={
            <Avatar
              alt="Remy Sharp"
              src={user_profile_img == null ? null : `${user_profile_img}`}
              sx={{ bgcolor: red[500] }}
              aria-label="recipe"
            />
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon onClick={handleClick} />
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <EditPost dataPost={props}></EditPost>
                <MenuItem onClick={deletePost}>Delete</MenuItem>
              </Menu>
            </IconButton>
          }
          title={f_name}
          subheader={taskDate(created_at)}
        />
        <CardActionArea sx={{ maxHeight: 300 }} onClick={toDetails}>
          <CardMedia
            component="img"
            height="194"
            image={photo}
            alt="Paella dish"
          />
          <CardContent sx={{ height: 200 }}>

          <div style={{ width: 300, whiteSpace: 'nowrap' }}>
          <Box
          component="div"
          sx={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          }}
          >

          <Typography variant="h6" color="text.secondary">
          {title}
          </Typography>
          </Box>


          <Box
          component="div"
          sx={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          }}
          >
          <Typography variant="body2" color="text.secondary">
            {content}
          </Typography>
            ...
          </Box>
          </div>

          </CardContent>
          <CardActions disableSpacing>
            <Chip
              label={category}
              size="small"
              color="success"
              variant="outlined"
            />
          </CardActions>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
