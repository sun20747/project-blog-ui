import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useCurruntUser from "@/lib/hooks/useCurrentUser";
import { Badge, Grid } from "@mui/material";
import taskDate from "../module/taskdate";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 5px ${theme.palette.background.paper}`,
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
}));

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);
  const { currenUser, fetcherWithToken } = useCurruntUser();
  
//   const [Agent, setAgent] = useState({});
//   useEffect(() => {
//     const Agent_ = JSON.parse(localStorage.getItem("ally-supports-cache"));
//     setAgent(Agent_)

//   }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: "lg" }}>
      <CardMedia
        component="img"
        height="150"
        image="https://source.unsplash.com/random"
        alt="Paella dish"
      />
      <hr />

      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item></Grid>
        <Grid item>
          <div>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar
                alt="Remy Sharp"
                src={currenUser == null ? null : `${currenUser?.photo}`}
                sx={{ width: 120, height: 120 }}
              />
            </StyledBadge>
          </div>
        </Grid>
        <Grid item></Grid>
      </Grid>

      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item></Grid>
        <Grid item>
          <div>
            <Typography variant="h6">
              {currenUser?.f_name}
              {`  ${currenUser?.l_name}`}
            </Typography>
          </div>
        </Grid>
        <Grid item></Grid>
      </Grid>

      <Grid
        container
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item></Grid>
        <Grid item>
          <Typography variant="subtitle2">{currenUser?.email}</Typography>
        </Grid>
        <Grid item></Grid>
      </Grid>

      <CardContent></CardContent>
      <CardActions disableSpacing>
        {/* <IconButton aria-label="add to favorites"> */}
          <FavoriteIcon />
        {/* </IconButton> */}
        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <hr />
          <Typography paragraph>
            Profile Created At: {taskDate(currenUser?.created_at)}
          </Typography>

          <Typography paragraph>
            Profile Updated At: {taskDate(currenUser?.updated_at)}
          </Typography>

          
          
        </CardContent>
      </Collapse>
    </Card>
  );
}
