import React, { useEffect, useRef, useState } from "react";
import axios from "axios.config";
import DefaultLayout from "@/components/layouts/Default";
import SessionLayout from "@/components/layouts/Session";
import { useRouter } from "next/router";
import {
  Grid,
  Paper,
  Typography,
  Chip,
  Avatar,
  CardHeader,
  Container,
} from "@mui/material";
import { useTheme } from "@mui/system";
import { useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import useCurrentUser from "@/lib/hooks/useCurrentUser";
import { red } from "@mui/material/colors";
import taskDate from "../module/taskdate";
import Sidebar from "./sidebar";

const MyPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
}));

const MyGrid = styled(Grid)(({ theme }) => ({
  height: "100%",
}));

const MyImg = styled("img")(({ theme }) => ({
  height: "100%",
  width: "100%",
}));

export default function Details() {
  const { currenUser } = useCurrentUser();
  const theme = useTheme();
  const isMediumUp = useMediaQuery(theme.breakpoints.up("md"));
  const router = useRouter();
  const { id } = router.query;
  const [blog, setBlog] = useState({});
  const [user, setUser] = useState();

  const getData = async () => {
    if (id) {
      const { data } = await axios.get(`/api/v1/blog/blogs/${id}`);
      setBlog(data);
    }
  };
  useEffect(() => {
    getData();
  }, [id]);

  useEffect(async () => {
    const { user_blogs } = blog;
    if (user_blogs) {
      const [index] = await user_blogs;
      setUser(index.user);
    }
  }, [blog, user]);

  // useEffect(() => {
  //   console.log(blog);
  // }, [blog]);

  return (
    <>
      {currenUser ? (
        <SessionLayout>
          <Grid container spacing={2} direction={isMediumUp ? "row" : "column"}>
            <Grid item sx={12} xs={8}>
              <MyPaper>
                <CardHeader
                  avatar={
                    <Avatar
                      alt="Remy Sharp"
                      src={user == null ? null : `${user.user_profile_img}`}
                      sx={{ bgcolor: red[500] }}
                      aria-label="recipe"
                    />
                  }
                  title={user?.f_name}
                  subheader={taskDate(blog.created_at)}
                />
                <hr />
                <Grid
                  container
                  spacing={2}
                  justifyContent={isMediumUp ? "flex-start" : "center"}
                >
                  <Grid item>
                    <Typography variant="h3" component="h1">
                      {blog.title}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={2}
                  justifyContent={isMediumUp ? "flex-start" : "center"}
                >
                  <Grid item>
                    <MyImg src={blog.photo} alt={blog.title} />
                  </Grid>

                  <Grid item>
                    <MyGrid container direction="column">
                      <Grid item>
                        <Typography variant="h4" component="h1">
                          {blog.title}
                        </Typography>
                        <Typography flexWrap={true} variant="body1">
                          {blog.content}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid
                          container
                          spacing={2}
                          sx={{ marginTop: 4 }}
                          justifyContent={isMediumUp ? "flex-end" : "flex-end"}
                        >
                          <Grid item>
                            <Chip
                              label={blog.category}
                              color="success"
                              variant="outlined"
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </MyGrid>
                  </Grid>
                </Grid>
              </MyPaper>
            </Grid>
            <Grid item sx={12} xs={4}>
              {blog && <Sidebar data={blog} />}
            </Grid>
          </Grid>
        </SessionLayout>
      ) : (
        <DefaultLayout>
          <Grid container spacing={2} direction={isMediumUp ? "row" : "column"}>
            <Grid item sx={12} xs={8}>
              <MyPaper>
                <CardHeader
                  avatar={
                    <Avatar
                      alt="Remy Sharp"
                      src={user == null ? null : `${user.user_profile_img}`}
                      sx={{ bgcolor: red[500] }}
                      aria-label="recipe"
                    />
                  }
                  title={user?.f_name}
                  subheader={taskDate(blog.created_at)}
                />
                <hr />
                <Grid
                  container
                  spacing={2}
                  justifyContent={isMediumUp ? "flex-start" : "center"}
                >
                  <Grid item>
                    <Typography variant="h3" component="h1">
                      {blog.title}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={2}
                  justifyContent={isMediumUp ? "flex-start" : "center"}
                >
                  <Grid item>
                    <MyImg src={blog.photo} alt={blog.title} />
                  </Grid>

                  <Grid item>
                    <MyGrid container direction="column">
                      <Grid item>
                        <Typography variant="h4" component="h1">
                          {blog.title}
                        </Typography>
                        <Typography flexWrap={true} variant="body1">
                          {blog.content}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid
                          container
                          spacing={2}
                          sx={{ marginTop: 4 }}
                          justifyContent={isMediumUp ? "flex-end" : "flex-end"}
                        >
                          <Grid item>
                            <Chip
                              label={blog.category}
                              color="success"
                              variant="outlined"
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </MyGrid>
                  </Grid>
                </Grid>
              </MyPaper>
            </Grid>
            <Grid item sx={12} xs={4}>
              {blog && <Sidebar data={blog} />}
            </Grid>
          </Grid>
        </DefaultLayout>
      )}
    </>
  );
}
