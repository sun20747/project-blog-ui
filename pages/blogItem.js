import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { CardActionArea, Grid } from "@mui/material";
import taskDate from "@/pages/module/taskdate"
import { useRouter} from 'next/router'


export default function blogItem({
  id,
  title,
  content,
  category,
  photo,
  created_at,
  f_name,
}) {
  const router = useRouter()
  const toDetails = () => {
    router.push(`details/${id}`, undefined, { shallow: true });
  }

  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Card sx={{ maxWidth: 500, maxHeight: 520 }}>
        <CardActionArea sx={{ maxHeight: 400 }} onClick={toDetails}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {f_name.substring(0, 1)}
              </Avatar>
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
          <CardContent sx={{height: 200}} >
            <Typography variant="body2" color="text.secondary">
              {content}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>

          </CardActions>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
