/* -------- Import React core ------------ */
import React, { useState } from "react";
/* -------- Import MaterialUI core ------------ */
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
/* -------- Import Custom Components ---------- */
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import CardFooter from "components/Card/CardFooter";
import StockMarket from "components/Widgets/StockMarket";
import TradingViewWidget from "components/Widgets/TradingViewWidget";
import WatchList from "components/Watchlist/WatchList";

import styles from "assets/jss/material-dashboard-react/views/sharesPageStyle";
const useStyles = makeStyles(styles);

export default function SharesPage() {
  const classes = useStyles();
  const [watchList, setWatchList] = useState([]);
  return (
    <>
      <Grid container className={classes.sharesContainer}>
        <Grid item xs={12} md={12} lg={12} xl={8}>
          <Grid container className={classes.watchlistButtonContainer}>
            <Grid item xs={12} md={12} lg={11} xl={11}>
              <WatchList watchList={watchList} setWatchList={setWatchList} />
            </Grid>
            <Grid item xs={12} sm={12} lg={11} xl={11}>
              <Card chart className={classes.shareTrackerCard}>
                <CardHeader
                  color="success"
                  className={classes.shareTrackerCardHeader}
                >
                  <TradingViewWidget watchList={watchList} />
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
