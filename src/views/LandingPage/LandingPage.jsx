import React from "react";
// react plugin for creating charts
//import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// core components
import Grid from "@material-ui/core/Grid";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardIcon from "components/Card/CardIcon";
import CardBody from "components/Card/CardBody";
import LoginButton from "components/LoginButton";
import SignupButton from "components/SignupButton";

import styles from "assets/jss/material-dashboard-react/views/landingPageStyle";
const useStyles = makeStyles(styles);

export default function LandingPage() {
  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.landingPageContainer}>
        <Grid item xs={12} className={classes.headerContainer}>
          <h1>Budget Tracker App</h1>
        </Grid>
        <Grid item xs={12} className={classes.buttonContainer}>
          <LoginButton className={classes.button} />
          <SignupButton className={classes.button} />
        </Grid>
      </Grid>

      <Grid container className={classes.aboutPageContainer}>
        <Grid item xs={12} className={classes.aboutHeaderContainer}>
          <h3>About</h3>
        </Grid>
        <Grid container className={classes.aboutContainer}>
          <Grid item xs={12} md={12} lg={5}>
            <Card className={classes.aboutInfoContainer}>
              <CardHeader>
                <CardIcon color="warning">
                  <Icon>announcement</Icon>
                </CardIcon>
                <h6>Some information about the website</h6>
              </CardHeader>
              <CardBody>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Non,
                  aut molestiae facere fuga mollitia dolores asperiores minus
                  vero atque blanditiis dolorum nemo pariatur, amet illum sunt
                  deserunt corporis, ea iste!
                </p>
              </CardBody>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={5}
            className={classes.aboutImageContainer}
          >
            <img
              src={require("../../assets/img/cover.jpeg")}
              alt="placeholder-img"
              className={classes.aboutImage}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid container className={classes.featuresPageContainer}>
        <Grid item xs={12} className={classes.featuresHeaderContainer}>
          <h3>Features</h3>
        </Grid>
        <Grid container className={classes.featuresContainer}>
          <Grid item xs={12} md={12} lg={3} className={classes.incomeContainer}>
            <Card className={classes.incomeCard}>
              <CardHeader>
                <CardIcon color="primary">
                  <Icon>monetization_on</Icon>
                </CardIcon>
                <h6>Income Tracking</h6>
              </CardHeader>
              <CardBody>
                <Grid item xs={12} md={12} lg={12}>
                  <img
                    src={require("../../assets/img/sidebar-1.jpg")}
                    alt="placeholder-img"
                    className={classes.featuresIncomeImage}
                  />
                </Grid>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Non,
                  aut molestiae facere fuga mollitia dolores asperiores minus
                  vero atque blanditiis dolorum nemo pariatur, amet illum sunt
                  deserunt corporis, ea iste!
                </p>
              </CardBody>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={3}
            className={classes.expensesContainer}
          >
            <Card className={classes.expensesCard}>
              <CardHeader>
                <CardIcon color="info">
                  <Icon>credit_card</Icon>
                </CardIcon>
                <h6>Expense Tracking</h6>
              </CardHeader>
              <CardBody>
                <Grid item xs={12} md={12} lg={12}>
                  <img
                    src={require("../../assets/img/sidebar-2.jpg")}
                    alt="placeholder-img"
                    className={classes.featuresExpenseImage}
                  />
                </Grid>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Non,
                  aut molestiae facere fuga mollitia dolores asperiores minus
                  vero atque blanditiis dolorum nemo pariatur, amet illum sunt
                  deserunt corporis, ea iste!
                </p>
              </CardBody>
            </Card>
          </Grid>
          <Grid item xs={12} md={12} lg={3} className={classes.sharesContainer}>
            <Card className={classes.sharesCard}>
              <CardHeader>
                <CardIcon color="success">
                  <Icon>toc</Icon>
                </CardIcon>
                <h6>Share Tracking</h6>
              </CardHeader>
              <CardBody>
                <Grid item xs={12} md={12} lg={12}>
                  <img
                    src={require("../../assets/img/sidebar-3.jpg")}
                    alt="placeholder-img"
                    className={classes.featuresSharesImage}
                  />
                </Grid>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Non,
                  aut molestiae facere fuga mollitia dolores asperiores minus
                  vero atque blanditiis dolorum nemo pariatur, amet illum sunt
                  deserunt corporis, ea iste!
                </p>
              </CardBody>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
