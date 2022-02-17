import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Badge, CardActionArea, Chip, Grid } from "@mui/material";
import taskDate from "@/module/taskdate";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

export default function blogItem({
  id,
  title,
  content,
  category,
  user_profile_img,
  created_at,
  f_name,
  photo,
  status,
}) {
  const StyledBadge_1 = styled(Badge)(({ theme }) =>
    status
      ? {
          "& .MuiBadge-badge": {
            backgroundColor: "#44b700",
            color: "#44b700",
            boxShadow: `0 0 0 3px ${theme.palette.background.paper}`,
            "&::after": {
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              animation: "ripple 1.2s infinite ease-in-out",
              border: "3px solid currentColor",
              content: '""',
            },
          },
          "@keyframes ripple": {
            "0%": {
              transform: "scale(.8)",
              opacity: 1,
            },
            "100%": {
              transform: "scale(2.4)",
              opacity: 0,
            },
          },
        }
      : {}
  );
  const router = useRouter();
  const toDetails = () => {
    router.push(`details/${id}`, undefined, { shallow: true });
  };

  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Card elevation={2} sx={{ maxWidth: 500, maxHeight: 520 }}>
        <CardActionArea onClick={toDetails}>
          <CardHeader
            avatar={
              <StyledBadge_1
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar
                  alt="Remy Sharp"
                  src={user_profile_img == null ? null : `${user_profile_img}`}
                  sx={{ bgcolor: red[500] }}
                  aria-label="recipe"
                />
              </StyledBadge_1>
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
