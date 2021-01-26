import React from "react";
// react plugin for creating charts
//import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Edit from "@material-ui/icons/Edit";
// core components
import Grid from "@material-ui/core/Grid";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardIcon from "components/Card/CardIcon";
import CardBody from "components/Card/CardBody";
import CardFooter from "components/Card/CardFooter";
import StockMarket from "components/Widgets/StockMarket";
import Button from "components/CustomButtons/Button";
import TradingViewWidget from "components/Widgets/TradingViewWidget";

import styles from "assets/jss/material-dashboard-react/views/sharesPageStyle";
const useStyles = makeStyles(styles);

export default function SharesPage() {
  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.sharesContainer}>
        <Grid item xs={12} md={12} lg={12} xl={8}>
          <Grid container className={classes.watchlistButtonContainer}>
            <Grid item xs={12} md={12} lg={11} xl={11}>
              <Button id="watchlistButton">
                <Edit />
                Edit Watchlist
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} lg={11} xl={11}>
              <Card chart className={classes.shareTrackerCard}>
                <CardHeader
                  color="success"
                  className={classes.shareTrackerCardHeader}
                >
                  <TradingViewWidget />
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>Share Tracker</h4>
                  <p className={classes.cardCategory}>
                    <span className={classes.successText}>
                      <ArrowUpward className={classes.upArrowCardCategory} />
                    </span>
                    Track your shares
                  </p>
                </CardBody>
                <CardFooter chart>
                  <div className={classes.stats}>
                    <AccessTime /> updated 4 minutes ago
                  </div>
                </CardFooter>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} lg={11} xl={4}>
          <Grid container className={classes.shareMarketContainer}>
            <Card chart className={classes.shareMarketCard}>
              <CardHeader
                color="success"
                className={classes.shareMarketCardHeader}
              >
                <Grid container className={classes.widgetContainer}>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    lg={12}
                    xl={12}
                    id="stock-market-chart"
                  >
                    <StockMarket className={classes.widget} />
                  </Grid>
                </Grid>
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Share Market Overview</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                  </span>
                  increase in your shares.
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
