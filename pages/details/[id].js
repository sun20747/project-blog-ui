import React, { useEffect, useState } from "react";
import axios from "axios.config";
import DefaultLayout from "@/components/layouts/Default";
import SessionLayout from "@/components/layouts/Session";
import { useRouter } from "next/router";
import { Grid, Paper, Typography, CardMedia } from "@mui/material";
import { useTheme } from "@mui/system";
import { useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import useCurrentUser from "@/lib/hooks/useCurrentUser";

const MyPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
}));

const MyGrid = styled(Grid)(({ theme }) => ({
  height: "100%",
}));

const MyImg = styled("img")(({ theme }) => ({
  height: "100%",
}));

export default function Details() {
  const { currenUser } = useCurrentUser();
  const theme = useTheme();
  const isMediumUp = useMediaQuery(theme.breakpoints.up("md"));
  const router = useRouter();
  const { id } = router.query;
  const [blog, setBlog] = useState({});

  const getData = async () => {
    if (id) {
      const { data } = await axios.get(`/api/v1/blog/blogs/${id}`);
      setBlog(data);
    }
  };
  useEffect(() => {
    getData();
  }, [id]);

  return (
    <>
      {currenUser ? (
        <SessionLayout>
          <MyPaper>
            <Grid
              container
              spacing={2}
              justifyContent={isMediumUp ? "flex-start" : "center"}
            >
              <Grid item>
                <MyImg
                  src={blog.photo}
                  alt={blog.title}
                  height={300}
                  width={500}
                />
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
                </MyGrid>
              </Grid>
            </Grid>
          </MyPaper>
        </SessionLayout>
      ) : (
        <DefaultLayout>
          <MyPaper>
            <Grid
              container
              spacing={2}
              justifyContent={isMediumUp ? "flex-start" : "center"}
            >
              <Grid item>
                <MyImg
                  src={blog.photo}
                  alt={blog.title}
                  height={300}
                  width={500}
                />
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
                </MyGrid>
              </Grid>
            </Grid>
          </MyPaper>
        </DefaultLayout>
      )}
    </>
  );
}
