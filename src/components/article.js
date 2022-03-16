import React from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Article = ({ articleData }) => {
  const classes = useStyles();
  return (
    <>
      <Container>
        {articleData?.map((each, index) => {
          return (
            <Card style={{ marginTop: "20px" }} className={classes.root}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {each.author}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {each.description}
                </Typography>
                <Typography variant="body2" component="p">
                  {each.name}
                  <br />
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Container>
    </>
  );
};

export default Article;
