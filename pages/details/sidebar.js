import {
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { Box, useTheme } from "@mui/system";
import axios from "axios.config";
import React, { useEffect, useState } from "react";
import Blogmore from "./blogmore";

export default function sidebar({ data }) {
  const [user, setUser] = useState();
  const [blogs, setBlogs] = useState([]);
  const [count, setCount] = useState(4);
  const getData = async () => {
    const { data } = await axios.get(
      `/api/v1/blog/blogs?limit=${count}&offset=0`
    );
    setBlogs(data);
  };

  useEffect(() => {
    getData();
  }, [count]);

  useEffect(async () => {
    const { user_blogs } = data;
    if (user_blogs) {
      const [index] = await user_blogs;
      setUser(index.user);
    }
  }, [data]);

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  return (
    <div>
      <Card sx={{ display: "flex" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {user?.f_name} {user?.l_name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              status:{" "}
              {user?.status ? (
                <Chip label="active" size="small" color="success" />
              ) : (
                <Chip label="inactive" size="small" color="error" />
              )}
            </Typography>
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <IconButton aria-label="previous"></IconButton>
            <IconButton aria-label="play/pause"></IconButton>
            <IconButton aria-label="next"></IconButton>
          </Box>
        </Box>
        <CardMedia>
          <Avatar
            alt="Remy Sharp"
            src={
              user?.user_profile_img == null
                ? null
                : `${user?.user_profile_img}`
            }
            sx={{ bgcolor: red[500], width: 120, height: 120 }}
            aria-label="recipe"
          />
        </CardMedia>
      </Card>
      {blogs ? (
        <Grid container spacing={2} sx={{ marginTop: 1 }}>
          {blogs.map((blog) => (
            <Blogmore {...blog} key={blog.id}></Blogmore>
          ))}
        </Grid>
      ) : (
        <div>null</div>
      )}
    </div>
  );
}
