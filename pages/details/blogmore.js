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
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import taskDate from "../module/taskdate";

export default function blogmore({
  id,
  category,
  content,
  title,
  photo,
  created_at,
  user_profile_img,
  f_name,
}) {
  const router = useRouter();
  const toDetails = () => {
    router.push(`${id}`, undefined, { shallow: true });
  };

  return (
    <Grid item xs={12} sm={12} lg={12}>
      <Card elevation={2} sx={{ maxHeight: 520 }}>
        <CardActionArea onClick={toDetails}>
          <CardHeader
            avatar={
              <Avatar
                alt="Remy Sharp"
                src={user_profile_img == null ? null : `${user_profile_img}`}
                sx={{ bgcolor: red[500] }}
                aria-label="recipe"
              />
            }
            title={f_name}
            subheader={taskDate(created_at)}
          />
          <CardMedia
            component="img"
            height="194"
            image={photo}
            alt="Paella dish"
          />
          <CardContent sx={{ height: 130 }}>
            <Typography variant="h6" color="text.secondary">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {content}
            </Typography>
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
