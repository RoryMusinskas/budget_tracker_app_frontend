import React, { useState } from "react";
// react plugin for creating charts
//import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import shares from "../../assets/img/shares-computer.svg";
import wallet from "../../assets/img/expenses-wallet.svg";
import todo from "../../assets/img/todo-list.svg";
import website from "../../assets/img/website.svg";
import Hidden from "@material-ui/core/Hidden";
// core components
import Grid from "@material-ui/core/Grid";
import LoginButton from "components/LoginButton";
import SignupButton from "components/SignupButton";
import ArrowDropDownCircleIcon from "@material-ui/icons/ArrowDropDownCircle";
import Slide from "react-reveal/Slide";
import Zoom from "react-reveal/Zoom";
import Fade from "react-reveal/Fade";
import Link from "@material-ui/core/Link";

import styles from "assets/jss/material-dashboard-react/views/landingPageStyle";
const useStyles = makeStyles(styles);

export default function LandingPage() {
  const classes = useStyles();

  const [heading, setHeading] = useState(true);
  const [blurb, setBlurb] = useState(false);

  return (
    <>
      <Grid container className={classes.landingPageContainer}>
        <Grid item xs={12} className={classes.loginContainer}>
          <Link className={classes.buttons}>
            <LoginButton color="primary">Login</LoginButton>
          </Link>
          <Link className={classes.buttons}>
            <SignupButton color="primary">Sign Up</SignupButton>
          </Link>
        </Grid>
        <Grid item xs={12} className={classes.headerContainer}>
          <Fade
            bottom
            wait={2000}
            when={heading}
            onReveal={() => {
              setHeading(false);
              setBlurb(true);
            }}
          >
            <h1>Need help tracking your budget?</h1>
          </Fade>
          <Fade bottom when={blurb}>
            <h1>You're in the right place..</h1>
          </Fade>
        </Grid>
        <Hidden xsDown>
          <Grid item xs={10}>
            <img src={website} alt='website overview'style={{ width: "100%" }} />
          </Grid>
        </Hidden>
        <Grid item xs={12} className={classes.headerFooterContainer}>
          <Link href="#features">
            <ArrowDropDownCircleIcon className={classes.dropDownArrow} />
          </Link>
        </Grid>
      </Grid>

      <Grid container className={classes.featurePageContainer} id="features">
        <Grid container className={classes.featuresContainer}>
          <Grid item xs={12} className={classes.featureContainer}>
            <Grid item xs={12} lg={5}>
              <Slide left>
                <div>
                  <h3>Expenses Tracking</h3>
                  <p>
                    Are you bleeding money in areas you aren't aware of? Use our
                    range of graphs and charts to ensure you know where your
                    hard earned money is going.
                  </p>
                </div>
              </Slide>
            </Grid>
            <Grid item xs={12} lg={5}>
              <Slide right>
                <img src={wallet} alt='expenses tracking' className={classes.featureImage} />
              </Slide>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.featureContainer}>
            <Grid item xs={12} lg={5}>
              <Zoom>
                <img src={shares} alt='shares tracking' className={classes.featureImage} />
              </Zoom>
            </Grid>
            <Grid item xs={12} lg={5}>
              <Slide right>
                <h3>Shares Tracking</h3>
                <p>
                  Want to be able to get an overview of how your share portfolio
                  is going? This app has inbuilt widgets to help you track your
                  performance.
                </p>
              </Slide>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.featureContainer}>
            <Slide left>
              <Grid item xs={12} lg={5}>
                <h3>Financial Goals</h3>
                <p>
                  Need to change bank providers, but keep forgetting? Use the
                  drag and drop goals board to ensure you never forget again.
                </p>
              </Grid>
            </Slide>
            <Slide right>
              <Grid item xs={12} lg={5}>
                <img src={todo} alt='financial goals' className={classes.featureImage} />
              </Grid>
            </Slide>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
