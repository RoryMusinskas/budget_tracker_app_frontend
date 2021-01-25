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

// COMMENTED OUT ( these are from the commented out components further on, but giving linting errors )
// import LocalOffer from "@material-ui/icons/LocalOffer";
// import Update from "@material-ui/icons/Update";
// import Warning from "@material-ui/icons/Warning";
// import Accessibility from "@material-ui/icons/Accessibility";
// import BugReport from "@material-ui/icons/BugReport";
// import Code from "@material-ui/icons/Code";
// import Cloud from "@material-ui/icons/Cloud";
// import Table from "components/Table/Table";
// import Tasks from "components/Tasks/Tasks";
// import CustomTabs from "components/CustomTabs/CustomTabs";
// import Danger from "components/Typography/Danger";
// import { bugs, website, server } from "variables/general";

import {
  expensesChart,
  // COMMENTED OUT ( these are from the commented out components further on, but giving linting errors )
  // emailsSubscriptionChart,
  // completedTasksChart,
} from "variables/charts";

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
                      <ArrowUpward className={classes.upArrowCardCategory} />{" "}
                      55%
                    </span>{" "}
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
                  </span>{" "}
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
      {/* </Grid> */}
      {/* COMMENTED OUT SO WE CAN REUSE THE COMPONENT IF NEEDED */}
      {/* <GridItem xs={12} sm={6} md={3}> */}
      {/*   <Card> */}
      {/*     <CardHeader color="danger" stats icon> */}
      {/*       <CardIcon color="danger"> */}
      {/*         <Icon>info_outline</Icon> */}
      {/*       </CardIcon> */}
      {/*       <p className={classes.cardCategory}>Fixed Issues</p> */}
      {/*       <h3 className={classes.cardTitle}>75</h3> */}
      {/*     </CardHeader> */}
      {/*     <CardFooter stats> */}
      {/*       <div className={classes.stats}> */}
      {/*         <LocalOffer /> */}
      {/*         Tracked from Github */}
      {/*       </div> */}
      {/*     </CardFooter> */}
      {/*   </Card> */}
      {/* </GridItem> */}
      {/* <GridItem xs={12} sm={6} md={3}> */}
      {/*   <Card> */}
      {/*     <CardHeader color="info" stats icon> */}
      {/*       <CardIcon color="info"> */}
      {/*         <Accessibility /> */}
      {/*       </CardIcon> */}
      {/*       <p className={classes.cardCategory}>Followers</p> */}
      {/*       <h3 className={classes.cardTitle}>+245</h3> */}
      {/*     </CardHeader> */}
      {/*     <CardFooter stats> */}
      {/*       <div className={classes.stats}> */}
      {/*         <Update /> */}
      {/*         Just Updated */}
      {/*       </div> */}
      {/*     </CardFooter> */}
      {/*   </Card> */}
      {/* </GridItem> */}
      {/* <GridContainer> */}
      {/*   <GridItem xs={12} sm={12} md={4}> */}
      {/*     <Card chart> */}
      {/*       <CardHeader color="warning"> */}
      {/*         <ChartistGraph */}
      {/*           className="ct-chart" */}
      {/*           data={emailsSubscriptionChart.data} */}
      {/*           type="Bar" */}
      {/*           options={emailsSubscriptionChart.options} */}
      {/*           responsiveOptions={emailsSubscriptionChart.responsiveOptions} */}
      {/*           listener={emailsSubscriptionChart.animation} */}
      {/*         /> */}
      {/*       </CardHeader> */}
      {/*       <CardBody> */}
      {/*         <h4 className={classes.cardTitle}>Email Subscriptions</h4> */}
      {/*         <p className={classes.cardCategory}>Last Campaign Performance</p> */}
      {/*       </CardBody> */}
      {/*       <CardFooter chart> */}
      {/*         <div className={classes.stats}> */}
      {/*           <AccessTime /> campaign sent 2 days ago */}
      {/*         </div> */}
      {/*       </CardFooter> */}
      {/*     </Card> */}
      {/*   </GridItem> */}
      {/*   <GridItem xs={12} sm={12} md={4}> */}
      {/*     <Card chart> */}
      {/*       <CardHeader color="danger"> */}
      {/*         <ChartistGraph */}
      {/*           className="ct-chart" */}
      {/*           data={completedTasksChart.data} */}
      {/*           type="Line" */}
      {/*           options={completedTasksChart.options} */}
      {/*           listener={completedTasksChart.animation} */}
      {/*         /> */}
      {/*       </CardHeader> */}
      {/*       <CardBody> */}
      {/*         <h4 className={classes.cardTitle}>Completed Tasks</h4> */}
      {/*         <p className={classes.cardCategory}>Last Campaign Performance</p> */}
      {/*       </CardBody> */}
      {/*       <CardFooter chart> */}
      {/*         <div className={classes.stats}> */}
      {/*           <AccessTime /> campaign sent 2 days ago */}
      {/*         </div> */}
      {/*       </CardFooter> */}
      {/*     </Card> */}
      {/*   </GridItem> */}
      {/* </GridContainer> */}
      {/* <GridContainer> */}
      {/*   <GridItem xs={12} sm={12} md={6}> */}
      {/*     <CustomTabs */}
      {/*       title="Tasks:" */}
      {/*       headerColor="primary" */}
      {/*       tabs={[ */}
      {/*         { */}
      {/*           tabName: "Bugs", */}
      {/*           tabIcon: BugReport, */}
      {/*           tabContent: ( */}
      {/*             <Tasks */}
      {/*               checkedIndexes={[0, 3]} */}
      {/*               tasksIndexes={[0, 1, 2, 3]} */}
      {/*               tasks={bugs} */}
      {/*             /> */}
      {/*           ), */}
      {/*         }, */}
      {/*         { */}
      {/*           tabName: "Website", */}
      {/*           tabIcon: Code, */}
      {/*           tabContent: ( */}
      {/*             <Tasks */}
      {/*               checkedIndexes={[0]} */}
      {/*               tasksIndexes={[0, 1]} */}
      {/*               tasks={website} */}
      {/*             /> */}
      {/*           ), */}
      {/*         }, */}
      {/*         { */}
      {/*           tabName: "Server", */}
      {/*           tabIcon: Cloud, */}
      {/*           tabContent: ( */}
      {/*             <Tasks */}
      {/*               checkedIndexes={[1]} */}
      {/*               tasksIndexes={[0, 1, 2]} */}
      {/*               tasks={server} */}
      {/*             /> */}
      {/*           ), */}
      {/*         }, */}
      {/*       ]} */}
      {/*     /> */}
      {/*   </GridItem> */}
      {/*   <GridItem xs={12} sm={12} md={6}> */}
      {/*     <Card> */}
      {/*       <CardHeader color="warning"> */}
      {/*         <h4 className={classes.cardTitleWhite}>Employees Stats</h4> */}
      {/*         <p className={classes.cardCategoryWhite}> */}
      {/*           New employees on 15th September, 2016 */}
      {/*         </p> */}
      {/*       </CardHeader> */}
      {/*       <CardBody> */}
      {/*         <Table */}
      {/*           tableHeaderColor="warning" */}
      {/*           tableHead={["ID", "Name", "Salary", "Country"]} */}
      {/*           tableData={[ */}
      {/*             ["1", "Dakota Rice", "$36,738", "Niger"], */}
      {/*             ["2", "Minerva Hooper", "$23,789", "Curaçao"], */}
      {/*             ["3", "Sage Rodriguez", "$56,142", "Netherlands"], */}
      {/*             ["4", "Philip Chaney", "$38,735", "Korea, South"], */}
      {/*           ]} */}
      {/*         /> */}
      {/*       </CardBody> */}
      {/*     </Card> */}
      {/*   </GridItem> */}
      {/* </GridContainer> */}
    </>
  );
}