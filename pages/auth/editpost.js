import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import useCurrentUser from "@/lib/hooks/useCurrentUser";
import axios from "axios.config";
import serverimgurl from "@/server.config";

export default function AlertDialog({ dataPost }) {
  const { token } = useCurrentUser();
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState(dataPost?.blog?.title);
  const [category, setCategory] = useState(dataPost?.blog?.category);
  const [content, setContent] = useState(dataPost?.blog?.content);
  const [image, setImage] = React.useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const createPost = () => {
    setOpen(!open);
    setImage(null);
    setCreateObjectURL(null);
  };
  //   useEffect(() => {
  //     console.log(dataPost?.blog?.id);
  //   }, [dataPost]);

  const post = async () => {
    const data = JSON.stringify({
      blog: {
        title,
        content,
        category,
      },
    });

    console.log(data);

    const config = {
      method: "put",
      headers: {
        "auth-token": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(`/api/v1/blog/update/${dataPost?.blog?.id}`, config)
      .then(function (response) {
        // console.log(response);
        setOpen(!open);
        setImage(null);
        setCreateObjectURL(null);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const postWhichImage = (response) => {
    response
      .json()
      .then(async (res) => {
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
          method: "put",
          headers: {
            "auth-token": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          data: data,
        };

        await axios(`/api/v1/blog/update/${dataPost?.blog?.id}`, config)
          .then(function (response) {
            // console.log(response);
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
    }
  };

  const uploadToServer = async (event) => {
    const body = new FormData();
    body.append("file", image);
    // image ? postWhichImage(response) : post;
    const response = await fetch(`${serverimgurl}/upload/post`, {
      method: "POST",
      body,
    });
    postWhichImage(response);
    // post(response);
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  const handleClickOpen = () => {
    setOpen(!open);
  };

  //   const handleClose = () => {
  //     setOpen(false);
  //   };
  // console.log(category);

  return (
    <div>
      <MenuItem onClick={handleClickOpen}>Edit</MenuItem>
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
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                ></TextField>
              </Grid>
              <Grid item>
                {image ? (
                  <>
                    <img
                      alt="not fount"
                      width={"300px"}
                      src={URL.createObjectURL(image)}
                    />
                  </>
                ) : (
                  <>
                    <img
                      alt="not fount"
                      width={"300px"}
                      src={`${dataPost?.blog?.photo}`}
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
            onClick={image ? uploadToServer : post}
            autoFocus
          >
            Success
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
