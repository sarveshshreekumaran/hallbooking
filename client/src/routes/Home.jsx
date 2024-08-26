import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function Home({ outlet }) {
  const navigate = useNavigate();
  const [halls, setHalls] = useState([]);
  const [hallsLoading, setHallsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const port =
    process.env.REACT_APP_PRODUCTION_PORT || process.env.REACT_APP_DEV_PORT;
  const ALLHALLS_ENDPOINT = "/hall/all-halls";
  useEffect(() => {
    const getHalls = async () => {
      try {
        const response = await axios.get(ALLHALLS_ENDPOINT);
        const { data } = response;

        setHalls(data);
      } catch (error) {
        setErrorMsg(error.message);
        console.log(error);
      } finally {
        setHallsLoading(false);
      }
    };

    getHalls();
  }, [port]);

  return (
    <React.Fragment>
      <CssBaseline />
      {hallsLoading ? (
        <p>Loading </p>
      ) : (
        <Container maxWidth="true">
          <Box
            sx={{
              width: "100%",
              height: "100vh",
            }}
          >
            {errorMsg ? (
              <p>{errorMsg}</p>
            ) : (
              <Grid container spacing={4}>
                {halls.length &&
                  halls.map((hall, index) => {
                    return (
                      <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                        <Card variant="outlined">
                          <CardActionArea
                            onClick={() => navigate(`/hall/${hall._id}`)}
                          >
                            <CardMedia
                              component="img"
                              height="240"
                              image="https://picsum.photos/240"
                              alt="green iguana"
                              sx={{ objectFit: "fill" }}
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                              >
                                {hall.hallname}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {`This hall has capacity of ${hall.hallCapacity}
                            people. And you can serve food for ${hall.diningHallCapacity} people in the dining hall. `}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {`Air Conditioned: ${hall.conditioned}`}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                          <CardActions>
                            <Link to={`/hall/${hall._id}`}>
                              <Button size="small" color="primary">
                                Book Now
                              </Button>
                            </Link>
                          </CardActions>
                        </Card>
                      </Grid>
                    );
                  })}
              </Grid>
            )}
          </Box>
        </Container>
      )}
    </React.Fragment>
  );
}
