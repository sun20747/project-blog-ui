import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/layouts/Default";
import SessionLayout from "@/components/layouts/Session";
import axios from "@/axios.config";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import BlogItem from "./blogItem";
import useCurrentUser from "@/lib/hooks/useCurrentUser";
import CategoryList from "./categorylist";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";

const MyTypography = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(2),
}));

export default function Index() {
  const category = useSelector((state) => state.session.category);
  const { currenUser } = useCurrentUser();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(4);

  const getDataAll = async () => {
    const { data } = await axios.get(
      `/api/v1/blog/blogs?limit=${count}&offset=0`
    );
    setLoading(true);
    setBlogs(data);
    setLoading(false);
  };

  const getData = async () => {
    const { data } = await axios.get(
      `/api/v1/blog/blogs?limit=${count}&offset=0&category=${category}`
    );
    setLoading(!loading);
    setBlogs(data);
    setLoading(!loading);
  };

  useEffect(() => {
    if (blogs.length < count && count - blogs.length <= 10) {
      category ? getData() : getDataAll();
    }
  }, [count, category]);

  useEffect(() => {
    onscroll = function (ev) {
      if (
        window.innerHeight + window.pageYOffset ==
        document.documentElement.scrollHeight
      ) {
        return setCount(count + 6);
      }
    };
    // console.log(count);
  }, [count]);

  // useEffect(() => {
  //   console.log(loading);
  // }, [loading]);

  return (
    <>
      {currenUser ? (
        <SessionLayout>
          <MyTypography variant="h4" component="h1">
            {category || "All"} Threads
          </MyTypography>

          <CategoryList></CategoryList>
          {blogs ? (
            <Grid container spacing={2}>
              {blogs.map((blog) => (
                <BlogItem {...blog} key={blog.id}></BlogItem>
              ))}
            </Grid>
          ) : (
            <div>null</div>
          )}
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress color="primary" />
            </Box>
          )}
        </SessionLayout>
      ) : (
        <DefaultLayout>
          <MyTypography variant="h4" component="h1">
            {category || "All"} Threads
          </MyTypography>
          <CategoryList></CategoryList>
          {blogs ? (
            <Grid container spacing={2}>
              {blogs.map((blog) => (
                <BlogItem {...blog} key={blog.id}></BlogItem>
              ))}
            </Grid>
          ) : (
            <div>null</div>
          )}
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress color="primary" />
            </Box>
          )}
        </DefaultLayout>
      )}
    </>
  );
}
