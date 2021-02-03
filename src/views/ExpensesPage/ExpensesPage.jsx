import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Expenses } from "../../components/Expenses/Expenses"
import { ExpensesAnalysis } from "../../components/Expenses/ExpensesAnalysisChart";
import { ExpensesAnalysisPie } from "../../components/Expenses/ExpensesAnalysisPie";

import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import GridItem from "components/Grid/GridItem";
import Grid from "@material-ui/core/Grid";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
// import CardIcon from "components/Card/CardIcon";
import CardBody from "components/Card/CardBody";
// import CardFooter from "components/Card/CardFooter";
import { makeStyles } from "@material-ui/core/styles";


import styles from "assets/jss/material-dashboard-react/views/expensesStyle";

const useStyles = makeStyles(styles);

export function ExpensesPage() {
  const classes = useStyles();
  const [expenses, setExpenses] = useState([]);
  const [ viewBarChart, setViewBarChart ] = useState(true);

  function onClickToChangeChart() {
    if(!viewBarChart) {
      setViewBarChart(true)
    } else {
      setViewBarChart(false)
    }
  }

  return (
    <>
      <div className={classes.newButton}>
      <NavLink to="/admin/expenses/new">
        <Button variant="contained" color="primary">
          <Icon >add_circle</Icon> New Expense
        </Button>
      </NavLink>
      </div>

      <Grid container className={classes.expensesContainer}>
        <GridItem xs={12} md={12} lg={12} xl={12}>
          <Grid className={classes.expensesAnalysisContainer}>
            <GridItem xs={12} md={12} lg={8} xl={8}>
              <Card className={classes.expensesAnalysisCard}>
                <CardHeader color="success" stats icon>
                  <h3 className={classes.cardTitle}>Expense Analysis</h3>
                </CardHeader>
                <CardBody>
                  {viewBarChart && <ExpensesAnalysis expenses={expenses} />}
                  {!viewBarChart && <ExpensesAnalysisPie expenses={expenses}/>}
                  <div className="toggle-button">
                    <Button variant="contained" color="primary" onClick={onClickToChangeChart}>Sort By</Button>
                  </div>
                </CardBody>
              </Card>
            </GridItem>
          </Grid>
          <Grid className={classes.expensesHistoryContainer}>
            <GridItem xs={5} md={5} lg={4} xl={4}>
              <Card className={classes.expensesHistoryCard}>
                <CardHeader color="success" stats icon>
                  <h3 className={classes.cardTitle}>Expenses History</h3>
                </CardHeader>
                <CardBody>
                  {/* Expenses component */}
                  <Expenses expenses={expenses} setExpenses={setExpenses}/> 
                </CardBody>
              </Card>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid >
    </>
  );
}
