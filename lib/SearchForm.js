import { useState } from "react";
import {
  Typography,
  Grid,
  Grow,
  CardActionArea,
  Card,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import Link from "next/link";
import {
  makeStyles,
  ThemeProvider,
  createTheme,
} from "@material-ui/core/styles";
import Image from "next/image";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  media: {
    height: 300,
    width: "100%",
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  card: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "milk",
  },
}));

export default function CarForm() {
  const [hits, setHits] = useState([]);
  const classes = useStyles();
  const search = async (event) => {
    const q = event.target.value;

    if (q.length > 2) {
      const params = new URLSearchParams({ q });

      const res = await fetch("/api/search?" + params);

      const result = await res.json();
      console.log(result);
      setHits(result["cars"]);
    }
  };

  return (
    <div>
      <input
        onChange={search}
        type="text"
        placeholder="search cars..."
        className="form-control"
      />

      <Grid
        container
        direction="row"
        item
        xs={12}
        md={12}
        className="list-group"
      >
        {hits?.map((hit) => (
          <Grow in={hits.length > 0} timeout={5000} key={hit.entityId}>
            {/* <Link href={"/details"} passHref={true}> */}
            <Card variant="outlined" className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={hit.image}
                  title={hit.make}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {hit.model}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {hit.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            {/* </Link> */}
          </Grow>
        ))}
      </Grid>

      {/* <ul className="list-group">
        {hits.map((hit) => (
          <li
            className="list-group-item d-flex justify-content-between align-items-start"
            key={hit.entityId}
          >
            <img width="50px" src={hit.image} />

            <div className="ms-2 me-auto">
              <div className="fw-bold">
                {hit.make} {hit.model}
              </div>
              {hit.description}
            </div>
          </li>
        ))}
      </ul> */}
    </div>
  );
}
