import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Expenses } from "../../components/Expenses/Expenses"
import { ExpensesAnalysis } from "../../components/Expenses/ExpensesAnalysisChart";
import { ExpensesAnalysisPie } from "../../components/Expenses/ExpensesAnalysisPie";

import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
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
        <Button variant="contained" color="primary" className={classes.addExpenseButton}>
          <Icon >add_circle</Icon> New Expense
        </Button>
      </NavLink>
      </div>

      <Grid container className={classes.expensesContainer}>
        <Grid item xs={12} md={12} lg={8} xl={8}>
          <Grid className={classes.expensesAnalysisContainer}>
            <Grid item xs={12} md={12} lg={11} xl={11}>
              <Card chart className={classes.expensesAnalysisCard}>
                <CardHeader>
                  <h3 className={classes.cardTitle}>Expense Analysis</h3>
                </CardHeader>
                <CardBody>
                  {viewBarChart && <ExpensesAnalysis expenses={expenses} />}
                  {!viewBarChart && <ExpensesAnalysisPie expenses={expenses}/>}
                  <div className="toggle-button">
                    <Button variant="contained" color="primary" onClick={onClickToChangeChart} className={classes.sortButton}>Sort By</Button>
                  </div>
                </CardBody>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} lg={4} xl={4} >
          <Grid className={classes.expensesHistoryContainer}>
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <Card className={classes.expensesHistoryCard}>
                <CardHeader className={classes.expensesHistoryCardHeader}>
                  <h3 className={classes.cardTitle}>Expenses History</h3>
                </CardHeader>
                <CardBody className={classes.expensesHistoryCardBody}>
                  <Expenses expenses={expenses} setExpenses={setExpenses}/> 
                </CardBody>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid >
    </>
  );
}
