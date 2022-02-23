import React, { useEffect, useState } from "react";
import bcrypt from "bcryptjs";
import axios from "axios.config";
import {
  Avatar,
  CardHeader,
  Paper,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import useCurrentUser from "@/lib/hooks/useCurrentUser";
import serverimgurl from "@/server.config";

export default function Newpost({ data }) {
  const [title, setTitle] = useState();
  const [category, setCategory] = useState();
  const [content, setContent] = useState();
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [open, setOpen] = React.useState(false);

  // console.log(category);

  const { token } = useCurrentUser();
  const createPost = () => {
    setTitle(null);
    setCategory("Code");
    setContent(null);
    setOpen(!open);
    setImage(null);
    setCreateObjectURL(null);
  };

  const darkMode = useSelector((state) => state.session.darkMode);
  const PostBox = styled(TextField)(() => ({
    "& fieldset": {
      borderRadius: "30px",
    },
    "&:hover": {
      borderRadius: "30px",
      backgroundColor: darkMode ? "MenuText" : "lightgray",
    },
  }));

  const post = (response) => {
    response
      .json()
      .then(async (res) => {
        // console.log(res.filename);
        // photo: `/post/${res.files.file.originalFilename}`,
        const data = JSON.stringify({
          blog: {
            title,
            content,
            category,
            photo: `${serverimgurl}/post/${res.filename}`,
          },
        });
        const config = {
          method: "post",
          headers: {
            "auth-token": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          data: data,
        };

        await axios("/api/v1/blog/blogs", config)
          .then(function (response) {
            // console.log(response.data);
            // location.reload();
            setOpen(!open);
            setImage(null);
            setCreateObjectURL(null);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      let i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
      // let splExe = i.name.split("."); // Array[2] name & exn
      // let splName = i.name.replace(/\.[^/.]+$/, "");
      // // console.log(splName);
      // // console.log(i.name.split("."));
      // // console.log(i.name.replace(/\.[^/.]+$/, ""));
      // const hashNameFile = bcrypt.hash(splName, 4);
      // hashNameFile
      //   .then((_hash) => {
      //     console.log(_hash);
      //     if (_hash.slice(-1) == ".") {
      //       const myNewFile = new File([i], `${_hash}${splExe.pop()}`, {
      //         type: i.type,
      //       });
      //
      //       setCreateObjectURL(URL.createObjectURL(myNewFile));
      //     } else {
      //       const myNewFile = new File([i], `${_hash}.${splExe.pop()}`, {
      //         type: i.type,
      //       });
      //       setImage(myNewFile);
      //       setCreateObjectURL(URL.createObjectURL(myNewFile));
      //     }
      //   })
      //   .catch((err) => {
      //     console.log("ERROR_HASH", err);
      //   });
    }
  };

  const uploadToServer = async (event) => {
    const body = new FormData();
    // console.log("file", image)
    body.append("file", image);
    const response = await fetch(`${serverimgurl}/upload/post`, {
      method: "POST",
      body,
    });
    // console.log(response);
    post(response);
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  // useEffect(() => {
  //   console.log(image);
  // }, [image]);

  return (
    <>
      <Paper elevation={2} sx={{ paddingY: 1, paddingX: 2, paddingBottom: 2 }}>
        <CardHeader
          avatar={
            <Avatar
              alt="Remy Sharp"
              src={
                data?.user_profile_img == undefined
                  ? null
                  : `${data?.user_profile_img}`
              }
              aria-label="recipe"
            />
          }
          title={data?.f_name}
        />
        <PostBox
          fullWidth
          label={`What's on your mind, ${data?.f_name}?`}
          id="fullWidth"
          onClick={createPost}
          disabled
        />
      </Paper>
      <Dialog
        open={open}
        onClose={createPost}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ textAlign: "center", minWidth: 200 }}
        >
          {"Create post"}
        </DialogTitle>
        <div>
          <hr />
        </div>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="center"
              spacing={2}
            >
              <Grid item>
                <Grid container spacing={1}>
                  <Grid item>
                    <TextField
                      variant="outlined"
                      placeholder="Title"
                      multiline
                      value={title}
                      inputProps={{maxLength :40}}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    ></TextField>
                  </Grid>
                  <Grid item>
                    <FormControl fullWidth sx={{ minWidth: 200 }}>
                      <InputLabel id="demo-simple-select-label">
                        {"Category" && category}
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // label={"Category" && category}
                        onChange={handleChange}
                        // value={category}
                      >
                        <MenuItem value={`Code`}>Code</MenuItem>
                        <MenuItem value={`Linux`}>Linux</MenuItem>
                        <MenuItem value={`Computer`}>Computer</MenuItem>
                        <MenuItem value={`Network`}>Network</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  variant="standard"
                  placeholder="Write a story you want to share."
                  multiline
                  rows={10}
                  rowsMax={10}
                  sx={{ minWidth: 300 }}
                  inputProps={{maxLength :400}}
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                ></TextField>
              </Grid>
              <Grid item>
                {image && (
                  <>
                    <img
                      alt="not fount"
                      width={"300px"}
                      src={URL.createObjectURL(image)}
                    />
                  </>
                )}
              </Grid>
              <Grid item>
                <Button variant="contained" component="label">
                  Upload Photo
                  <input type="file" hidden onChange={uploadToClient} />
                </Button>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={createPost}>Disagree</Button>
          <Button
            variant="contained"
            color="success"
            type="submit"
            onClick={uploadToServer}
            autoFocus
          >
            Success
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
