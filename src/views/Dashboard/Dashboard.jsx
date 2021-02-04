import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import DateRange from "@material-ui/icons/DateRange";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
// core components
import Grid from "@material-ui/core/Grid";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardIcon from "components/Card/CardIcon";
import CardBody from "components/Card/CardBody";
import CardFooter from "components/Card/CardFooter";
import StockMarket from "components/Widgets/StockMarket";

import { expensesChart } from "variables/charts";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.dashboardContainer}>
        <Grid item xs={12} md={12} lg={12} xl={8}>
          <Grid container className={classes.goalIncomeContainer}>
            <Grid item xs={12} md={12} lg={5} xl={5}>
              <Card className={classes.goalsCard}>
                <CardHeader color="warning" stats icon>
                  <CardIcon color="warning">
                    <Icon>content_copy</Icon>
                  </CardIcon>
                  <p className={classes.cardCategory}>Goals</p>
                  <h3 className={classes.cardTitle}>Finance goals</h3>
                </CardHeader>
                <CardBody>
                  <ul className={classes.goalsList}>
                    <li>Goal 1</li>
                    <li>Goal 2</li>
                    <li>Goal 3</li>
                    <li>Goal 4</li>
                    <li>Goal 5</li>
                    <li>Goal 6</li>
                  </ul>
                </CardBody>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <DateRange />
                    For this year?
                  </div>
                </CardFooter>
              </Card>
            </Grid>
            <Grid item xs={12} md={12} lg={5} xl={5}>
              <Card className={classes.incomeCard}>
                <CardHeader color="success" stats icon>
                  <CardIcon color="success">
                    <Store />
                  </CardIcon>
                  <p className={classes.cardCategory}>Income</p>
                  <h3 className={classes.cardTitle}>$34,245</h3>
                </CardHeader>
                <CardBody>
                  <ul className={classes.goalsList}>
                    <li>Expense 1</li>
                    <li>Expense 2</li>
                    <li>Expense 3</li>
                    <li>Expense 4</li>
                    <li>Expense 5</li>
                    <li>Expense 6</li>
                  </ul>
                </CardBody>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <DateRange />
                    Last 24 Hours
                  </div>
                </CardFooter>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} lg={11} xl={11}>
              <Card chart className={classes.expensesCard}>
                <CardHeader
                  color="success"
                  className={classes.expensesCardHeader}
                >
                  <ChartistGraph
                    className={("ct-chart", classes.expensesChart)}
                    data={expensesChart.data}
                    type="Line"
                    options={expensesChart.options}
                    listener={expensesChart.animation}
                  />
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>Your Expenses</h4>
                  <p className={classes.cardCategory}>
                    <span className={classes.successText}>
                      <ArrowUpward className={classes.upArrowCardCategory} />
                      55%
                    </span>
                    increase in your expenses.
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
          <Grid container className={classes.sharesContainer}>
            <Card chart className={classes.sharesCard}>
              <CardHeader color="success" className={classes.sharesCardHeader}>
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
